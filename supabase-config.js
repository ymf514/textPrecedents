/* Supabase 设置
   anonKey：Supabase 后台 → Project Settings → API Keys → 复制 "anon public"（或 "publishable"）key 粘贴到下面。
   这个 key 本来就是公开放在网页里用的，安全由数据库的 RLS 规则保证（见 supabase-setup.sql）。
   anonKey 留空时，便利贴只保存在当前浏览器里（localStorage）。 */
window.SUPABASE_CONFIG = {
  url: 'https://wpohawooonfuhpjmkbbq.supabase.co',
  anonKey: '',
};
