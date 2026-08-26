(() => {
  const grid = document.getElementById('pest-grid');
  if (!grid) return;
  const data = window.PEST_DATA || {};
  const items = Object.entries(data).map(([slug, item]) => ({ slug, ...item })).filter(item => (item.status || 'published') === 'published');
  const countLink = document.querySelector('.all-link');
  const emptyText = '<div class="empty-pest-message">Hiện chưa có nội dung dịch hại.</div>';
  const esc = value => String(value ?? '').replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
  const typeKey = type => {
    const value = String(type || '').toLowerCase();
    if (value.includes('bệnh')) return 'benh';
    if (value.includes('cỏ')) return 'co';
    return 'sau';
  };
  const hostKey = host => {
    const value = String(host || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (value.includes('sau rieng')) return 'sau-rieng';
    if (value.includes('ca phe')) return 'ca-phe';
    if (value.includes('bap')) return 'bap';
    if (value.includes('lua')) return 'lua';
    if (value.includes('ho tieu')) return 'ho-tieu';
    if (value.includes('mui')) return 'cay-co-mui';
    return value.replace(/[^a-z0-9]+/g, '-');
  };
  const image = item => item.image || 'images/pest.jpg';
  const render = () => {
    const activeType = document.querySelector('[data-pest-type-filter].active')?.dataset.pestTypeFilter || 'all';
    const activeHost = document.querySelector('[data-pest-host-filter].active')?.dataset.pestHostFilter || 'all';
    const shown = items.filter(item => {
      const hosts = (item.hosts || []).map(hostKey);
      return (activeType === 'all' || typeKey(item.type) === activeType) && (activeHost === 'all' || hosts.includes(activeHost));
    });
    if (countLink) countLink.textContent = `${shown.length} đối tượng →`;
    grid.innerHTML = shown.length ? shown.map(item => {
      const hosts = item.hosts || [];
      const hostText = hosts.length > 2 ? `${hosts.slice(0,2).join(' · ')} · +${hosts.length - 2} cây` : hosts.join(' · ');
      return `<a class="pest-card" href="bai-viet-dich-hai.html?dichhai=${encodeURIComponent(item.slug)}" data-pest-type="${typeKey(item.type)}" data-pest-hosts="${hosts.map(hostKey).join(',')}"><img src="${esc(image(item))}" alt="${esc(item.title)}"><div class="pest-card-copy"><small>${esc(item.type || 'Khác')}</small><h3>${esc(item.title || item.slug)}</h3><p class="host-line">${hostText ? `Hại: ${esc(hostText)}` : 'Xem chi tiết bài viết'}</p></div></a>`;
    }).join('') : emptyText;
  };
  document.querySelectorAll('[data-pest-type-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-pest-type-filter]').forEach(x => x.classList.toggle('active', x === button));
    render();
  }));
  document.querySelectorAll('[data-pest-host-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-pest-host-filter]').forEach(x => x.classList.toggle('active', x === button));
    render();
  }));
  render();
})();
