-- 在 Supabase 后台 → SQL Editor 里整段粘贴运行一次即可。
-- 另外需要在 Authentication → Sign In / Providers 里打开 "Allow anonymous sign-ins"。

create table if not exists public.sticky_notes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  page       text not null default 'essay',
  anchor     int  not null default 0,          -- 贴在第几段附近
  dx         real not null default 0,          -- 横向位置（占页面宽度的比例）
  dy         real not null default 0,          -- 距该段顶部的像素
  text       text not null default '' check (char_length(text) <= 1000),
  quote      text check (char_length(quote) <= 1000),   -- 读者选中的那句话
  collapsed  boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.sticky_notes enable row level security;

-- 每个人只能看到 / 修改 / 删除自己的便利贴
drop policy if exists "own notes: select" on public.sticky_notes;
drop policy if exists "own notes: insert" on public.sticky_notes;
drop policy if exists "own notes: update" on public.sticky_notes;
drop policy if exists "own notes: delete" on public.sticky_notes;
create policy "own notes: select" on public.sticky_notes for select to authenticated using (user_id = auth.uid());
create policy "own notes: insert" on public.sticky_notes for insert to authenticated with check (user_id = auth.uid());
create policy "own notes: update" on public.sticky_notes for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own notes: delete" on public.sticky_notes for delete to authenticated using (user_id = auth.uid());

-- 每人每页最多 20 张
create or replace function public.sticky_notes_limit() returns trigger
language plpgsql as $$
begin
  if (select count(*) from public.sticky_notes
      where user_id = new.user_id and page = new.page) >= 20 then
    raise exception 'sticky note limit reached';
  end if;
  return new;
end $$;

drop trigger if exists sticky_notes_limit on public.sticky_notes;
create trigger sticky_notes_limit before insert on public.sticky_notes
  for each row execute function public.sticky_notes_limit();

-- 自动更新时间
create or replace function public.sticky_notes_touch() returns trigger
language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists sticky_notes_touch on public.sticky_notes;
create trigger sticky_notes_touch before update on public.sticky_notes
  for each row execute function public.sticky_notes_touch();
