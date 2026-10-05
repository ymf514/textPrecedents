/* 读者便利贴：选中正文 → 右上角出现 + → 点击贴一张便利贴
   每人每页最多 20 张，只有本人能看到（Supabase 匿名账号 + RLS；未配置时存在本地浏览器） */
(function () {
  const MAX = 20;
  const PAGE = 'essay';
  const NOTE_W = 210;
  const essay = document.getElementById('essay');
  const textCol = document.getElementById('text-col');

  /* ---------------- 存储 ---------------- */
  const LocalStore = {
    KEY: 'sticky-notes-v1:' + PAGE,
    mode: 'local',
    async init() {},
    read() {
      try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch (e) { return []; }
    },
    write(list) {
      try { localStorage.setItem(this.KEY, JSON.stringify(list)); } catch (e) { /* 隐私模式等 */ }
    },
    async list() { return this.read(); },
    async create(n) {
      const note = { ...n, id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())) };
      this.write([...this.read(), note]);
      return note;
    },
    async update(id, patch) {
      this.write(this.read().map((n) => (n.id === id ? { ...n, ...patch } : n)));
    },
    async remove(id) { this.write(this.read().filter((n) => n.id !== id)); },
  };

  const SupaStore = {
    mode: 'cloud',
    db: null,
    async init() {
      const cfg = window.SUPABASE_CONFIG || {};
      if (!cfg.url || !cfg.anonKey || !window.supabase) throw new Error('Supabase not configured');
      this.db = window.supabase.createClient(cfg.url, cfg.anonKey);
      const { data } = await this.db.auth.getSession();
      if (!data.session) {
        const { error } = await this.db.auth.signInAnonymously();
        if (error) throw error;
      }
    },
    async list() {
      const { data, error } = await this.db.from('sticky_notes')
        .select('id, anchor, dx, dy, text, quote, collapsed')
        .eq('page', PAGE).order('created_at');
      if (error) throw error;
      return data;
    },
    async create(n) {
      const { data, error } = await this.db.from('sticky_notes')
        .insert({ ...n, page: PAGE }).select('id, anchor, dx, dy, text, quote, collapsed').single();
      if (error) throw error;
      return data;
    },
    async update(id, patch) {
      const { error } = await this.db.from('sticky_notes').update(patch).eq('id', id);
      if (error) throw error;
    },
    async remove(id) {
      const { error } = await this.db.from('sticky_notes').delete().eq('id', id);
      if (error) throw error;
    },
  };

  let store = LocalStore;
  const notes = new Map(); // id -> { data, el }

  /* ---------------- 页面层 ---------------- */
  const layer = document.createElement('div');
  layer.className = 'sticky-layer';
  essay.appendChild(layer);

  const plus = document.createElement('button');
  plus.className = 'sticky-plus';
  plus.type = 'button';
  plus.title = 'Add a sticky note';
  plus.textContent = '+';
  plus.hidden = true;
  essay.appendChild(plus);

  const toast = document.createElement('div');
  toast.className = 'sticky-toast';
  document.body.appendChild(toast);
  let toastTimer;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  /* ---------------- 坐标：以“第几段 + 偏移”保存，正文重排后仍跟着段落走 ---------------- */
  const blocks = () => [...textCol.querySelectorAll('p, h2')];

  function toXY(n) {
    const b = blocks()[n.anchor] || blocks()[0];
    return { left: n.dx * essay.clientWidth, top: (b ? b.offsetTop : 0) + n.dy };
  }

  function fromXY(left, top) {
    const list = blocks();
    // 第一个底边在便利贴顶部之下的段落（即便利贴所在或紧随其后的段落）
    let i = list.findIndex((b) => b.offsetTop + b.offsetHeight >= top);
    if (i < 0) i = list.length - 1;
    return { anchor: i, dx: left / essay.clientWidth, dy: top - (list[i] ? list[i].offsetTop : 0) };
  }

  function place(entry) {
    const { left, top } = toXY(entry.data);
    const maxL = Math.max(0, essay.clientWidth - NOTE_W);
    entry.el.style.left = Math.min(Math.max(0, left), maxL) + 'px';
    entry.el.style.top = Math.max(0, top) + 'px';
  }
  const placeAll = () => notes.forEach(place);

  /* ---------------- 便利贴 DOM ---------------- */
  function autosize(ta) {
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  }

  function save(entry, patch) {
    Object.assign(entry.data, patch);
    store.update(entry.data.id, patch).catch(() => say('Could not save this note.'));
  }

  let zTop = 1;
  function select(el) {
    layer.querySelectorAll('.sticky.selected').forEach((s) => s !== el && s.classList.remove('selected'));
    if (el) { el.classList.add('selected'); el.style.zIndex = ++zTop; } // 置顶
  }

  function render(data) {
    const el = document.createElement('div');
    el.className = 'sticky' + (data.collapsed ? ' collapsed' : '');
    el.innerHTML = `
      <div class="sticky-bar">
        <button type="button" class="sticky-del" title="Delete note" aria-label="Delete note">×</button>
        <button type="button" class="sticky-min" title="Fold note" aria-label="Fold note">−</button>
      </div>
      <textarea class="sticky-text" maxlength="1000" placeholder="write here…"></textarea>
      <button type="button" class="sticky-badge" title="Open note" aria-label="Open note"></button>`;
    const ta = el.querySelector('textarea');
    ta.value = data.text || '';
    if (data.quote) el.title = '“' + data.quote + '”';

    const entry = { data, el };
    notes.set(data.id, entry);
    layer.appendChild(el);
    place(entry);
    requestAnimationFrame(() => autosize(ta));

    let t;
    ta.addEventListener('input', () => {
      autosize(ta);
      clearTimeout(t);
      t = setTimeout(() => save(entry, { text: ta.value }), 600);
    });
    ta.addEventListener('blur', () => { clearTimeout(t); if (ta.value !== entry.data.text) save(entry, { text: ta.value }); });

    el.querySelector('.sticky-min').addEventListener('click', () => {
      el.classList.add('collapsed'); save(entry, { collapsed: true });
    });
    el.querySelector('.sticky-badge').addEventListener('click', () => {
      el.classList.remove('collapsed'); select(el); autosize(ta); save(entry, { collapsed: false });
    });
    el.querySelector('.sticky-del').addEventListener('click', () => {
      if (ta.value.trim() && !confirm('Delete this note?')) return;
      el.remove(); notes.delete(data.id);
      store.remove(data.id).catch(() => say('Could not delete this note.'));
    });

    enableDrag(entry);
    return entry;
  }

  /* ---------------- 拖动 ---------------- */
  function enableDrag(entry) {
    const el = entry.el;
    el.addEventListener('pointerdown', (e) => {
      select(el);
      if (el.classList.contains('collapsed')) return;
      if (e.target.closest('textarea, button')) return;
      e.preventDefault();
      const startX = e.clientX, startY = e.clientY;
      const startL = el.offsetLeft, startT = el.offsetTop;
      let moved = false;
      el.setPointerCapture(e.pointerId);
      el.classList.add('dragging');

      const move = (ev) => {
        moved = true;
        const maxL = essay.clientWidth - el.offsetWidth;
        el.style.left = Math.min(Math.max(0, startL + ev.clientX - startX), maxL) + 'px';
        el.style.top = Math.max(0, startT + ev.clientY - startY) + 'px';
      };
      const up = () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up);
        el.removeEventListener('pointercancel', up);
        el.classList.remove('dragging');
        if (moved) save(entry, fromXY(el.offsetLeft, el.offsetTop));
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
    });
  }

  document.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('.sticky')) select(null);
  });

  /* ---------------- 选中句子 → “+” ---------------- */
  let pending = null; // { x, y, quote }

  function updatePlus() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) { plus.hidden = true; pending = null; return; }
    const range = sel.getRangeAt(0);
    if (!textCol.contains(range.commonAncestorContainer)) { plus.hidden = true; pending = null; return; }
    const quote = sel.toString().trim();
    if (!quote) { plus.hidden = true; return; }
    const r = range.getBoundingClientRect();
    const box = essay.getBoundingClientRect();
    const x = r.right - box.left;
    const y = r.top - box.top;
    pending = { x, y, quote: quote.slice(0, 1000) };
    plus.style.left = x + 'px';
    plus.style.top = y + 'px';
    plus.hidden = false;
  }

  let selTimer;
  document.addEventListener('selectionchange', () => {
    clearTimeout(selTimer);
    selTimer = setTimeout(updatePlus, 120);
  });

  plus.addEventListener('pointerdown', (e) => e.preventDefault()); // 保持选区
  plus.addEventListener('click', async () => {
    if (!pending) return;
    if (notes.size >= MAX) { say(`You can keep up to ${MAX} notes on this page.`); return; }
    const { x, y, quote } = pending;
    const left = Math.min(x + 14, essay.clientWidth - NOTE_W);
    const top = Math.max(0, y - 8);
    plus.hidden = true;
    window.getSelection().removeAllRanges();
    try {
      const data = await store.create({ ...fromXY(left, top), text: '', quote, collapsed: false });
      const entry = render(data);
      select(entry.el);
      entry.el.querySelector('textarea').focus();
    } catch (err) {
      say(/limit/i.test(err.message || '') ? `You can keep up to ${MAX} notes on this page.` : 'Could not add a note.');
    }
  });

  /* ---------------- 启动 ---------------- */
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(placeAll, 200); });
  window.addEventListener('load', placeAll);
  document.fonts && document.fonts.ready.then(placeAll);

  (async () => {
    try {
      await SupaStore.init();
      store = SupaStore;
    } catch (e) {
      if ((window.SUPABASE_CONFIG || {}).anonKey) {
        console.warn('Sticky notes: falling back to this browser only.', e);
        say('Notes are being saved in this browser only.');
      }
      store = LocalStore;
    }
    try {
      (await store.list()).forEach(render);
    } catch (e) {
      console.warn(e);
      say('Could not load your notes.');
    }
  })();
})();
