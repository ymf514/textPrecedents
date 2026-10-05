(function () {
  const ANN = window.ANNOTATIONS || {};
  const textCol = document.getElementById('text-col');
  const noteCol = document.getElementById('note-col');
  const MOBILE = window.matchMedia('(max-width: 800px)');

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------------- 三种批注的渲染（以后新增内容直接调用这三个） ---------------- */
  function renderNote(a) {
    return `<p>${esc(a.text)}</p>`;
  }

  // newTab: true → 直接在新标签页打开（用于不允许被嵌入的网站）
  const nt = (a) => (a.newTab ? ' data-newtab="1"' : '');

  function renderQuote(a) {
    const src = a.link
      ? `<button class="quote-source" data-link="${esc(a.link)}"${nt(a)}>${esc(a.source)}${a.newTab ? ' ↗' : ''}</button>`
      : `<span class="quote-source">${esc(a.source)}</span>`;
    const q = /^[“"]/.test(a.text) ? esc(a.text) : `“${esc(a.text)}”`;
    return `<p class="quote-text">${q}</p>${src}`;
  }

  function renderMedia(a) {
    return `<button class="media-thumb" data-link="${esc(a.link || '')}"${nt(a)}>
              <img src="${esc(a.image)}" alt="${esc(a.caption || '')}">
            </button>
            <p>${esc(a.caption || '')}</p>`;
  }

  const RENDERERS = { note: renderNote, quote: renderQuote, media: renderMedia };

  function buildAnnotation(id) {
    const a = ANN[id];
    if (!a) { console.warn('Missing annotation:', id); return null; }
    const el = document.createElement('div');
    el.className = `anno anno-${a.type}`;
    el.dataset.id = id;
    el.innerHTML = (RENDERERS[a.type] || renderNote)(a);
    return el;
  }

  /* ---------------- 解析正文 ---------------- */
  function inline(str) {
    // {{sentence|id}}  ->  underlined span
    return esc(str)
      .replace(/\{\{([\s\S]+?)\|([\w-]+)\}\}/g,
        (_, txt, id) => `<span class="mark" data-id="${id}">${txt}</span>`)
      .replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');
  }

  function renderEssay() {
    const title = window.ESSAY_TITLE || '';
    document.getElementById('hero-title').innerHTML = esc(title).replace(/\n/g, '<br>');
    document.title = title.replace(/\n/g, ' ') || document.title;

    document.getElementById('hero-line').innerHTML = esc(window.HERO_LINE || '').replace(/\n/g, '<br>');

    // 用 div 而不是 p：不计入便利贴的段落定位
    let html = window.ESSAY_SUBTITLE
      ? `<div class="essay-subtitle">${esc(window.ESSAY_SUBTITLE)}</div>` : '';
    if (window.ESSAY_QUESTION) html += `<div class="essay-question">${inline(window.ESSAY_QUESTION)}</div>`;
    window.ESSAY.trim().split(/\n\s*\n/).forEach((block) => {
      block = block.trim();
      html += block.startsWith('## ')
        ? `<h2>${inline(block.slice(3))}</h2>`
        : `<p>${inline(block)}</p>`;
    });
    if (window.CLOSING_NOTE) html += `<div class="closing-note">${inline(window.CLOSING_NOTE)}</div>`;
    textCol.innerHTML = html;

    const ex = document.getElementById('excerpts');
    if (window.EXCERPTS && window.EXCERPTS.length) {
      ex.innerHTML = `<h3>${esc(window.EXCERPTS_TITLE || '')}</h3><ol>` +
        window.EXCERPTS.map((e) => `<li>${inline(e)}</li>`).join('') + '</ol>';
    }
  }

  /* ---------------- 摆放批注 ---------------- */
  function placeAnnotations() {
    document.querySelectorAll('.anno').forEach((n) => n.remove());
    const marks = [...textCol.querySelectorAll('.mark')];

    if (MOBILE.matches) {
      // 手机：批注放在所属段落之后
      marks.forEach((m) => {
        const el = buildAnnotation(m.dataset.id);
        if (!el) return;
        const block = m.closest('p, h2');
        let after = block;
        while (after.nextElementSibling && after.nextElementSibling.classList.contains('anno')) {
          after = after.nextElementSibling;
        }
        after.after(el);
      });
      return;
    }

    // 桌面：先放入，再按划线句子位置排布
    marks.forEach((m) => {
      const el = buildAnnotation(m.dataset.id);
      if (!el) return;
      el._mark = m;
      noteCol.appendChild(el);
      el.querySelectorAll('img').forEach((img) => img.addEventListener('load', layout));
    });
    layout();
  }

  // 与划线句子顶端对齐，重叠时向下推
  function layout() {
    if (MOBILE.matches) return;
    const colTop = noteCol.getBoundingClientRect().top + window.scrollY;
    let cursor = 0;
    const GAP = 24;
    noteCol.querySelectorAll('.anno').forEach((el) => {
      const want = el._mark.getBoundingClientRect().top + window.scrollY - colTop;
      const top = Math.max(want, cursor);
      el.style.top = top + 'px';
      cursor = top + el.offsetHeight + GAP;
    });
    noteCol.style.minHeight = cursor + 'px';
  }

  /* ---------------- 交互 ---------------- */
  function setActive(id, on) {
    document.querySelectorAll(`[data-id="${CSS.escape(id)}"]`)
      .forEach((el) => el.classList.toggle('active', on));
    noteCol.classList.toggle('has-active', on);
  }

  document.addEventListener('mouseover', (e) => {
    const t = e.target.closest('.mark, .anno');
    if (t) setActive(t.dataset.id, true);
  });
  document.addEventListener('mouseout', (e) => {
    const t = e.target.closest('.mark, .anno');
    if (t && !t.contains(e.relatedTarget)) setActive(t.dataset.id, false);
  });

  const modal = document.getElementById('modal');
  const frame = document.getElementById('modal-frame');
  const openLink = document.getElementById('modal-open');

  const modalImg = document.getElementById('modal-img');
  const IS_IMAGE = /\.(jpe?g|png|gif|webp|avif|svg)(\?|#|$)/i;

  function openModal(url) {
    const isImg = IS_IMAGE.test(url);
    frame.hidden = isImg;
    modalImg.hidden = !isImg;
    if (isImg) modalImg.src = url; else frame.src = url;
    openLink.href = url;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.hidden = true;
    frame.src = 'about:blank';
    modalImg.removeAttribute('src');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-link]');
    if (btn && btn.dataset.link) {
      if (btn.dataset.newtab) window.open(btn.dataset.link, '_blank', 'noopener');
      else openModal(btn.dataset.link);
      return;
    }
    if (e.target === modal || e.target.closest('#modal-close')) closeModal();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  /* ---------------- 启动 ---------------- */
  renderEssay();
  placeAnnotations();
  let t;
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(placeAnnotations, 150); });
  window.addEventListener('load', layout);
  window.relayoutAnnotations = layout;
  document.fonts && document.fonts.ready.then(layout);
})();
