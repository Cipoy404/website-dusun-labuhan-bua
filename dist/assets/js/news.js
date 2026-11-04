(function () {
  const root = document.querySelector('[data-news-grid]');
  if (!root) return;
  const data = window.NEWS_DATA || [];
  const input = document.querySelector('[data-news-search]'),
    filter = document.querySelector('[data-news-filter]');
  const esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]
    );
  function render() {
    const q = (input?.value || '').toLowerCase(),
      cat = filter?.value || 'all';
    const items = data.filter(
      (x) =>
        (cat === 'all' || x.category === cat) && `${x.title} ${x.summary}`.toLowerCase().includes(q)
    );
    root.innerHTML = items.length
      ? items
          .map(
            (x) =>
              `<article class="news-card reveal visible"><img src="${esc(x.image)}" alt="Ilustrasi untuk ${esc(x.title)}" loading="lazy"><div class="news-body"><div class="news-meta"><span class="tag">${esc(x.category)}</span><span>${esc(x.date)}</span></div><h3>${esc(x.title)}</h3><p>${esc(x.summary)}</p><a class="text-link" href="berita.html">Baca informasi <i data-lucide="arrow-up-right"></i></a></div></article>`
          )
          .join('')
      : '<div class="content-card">Tidak ada berita yang cocok.</div>';
    window.lucide?.createIcons();
  }
  input?.addEventListener('input', render);
  filter?.addEventListener('change', render);
  render();
})();
