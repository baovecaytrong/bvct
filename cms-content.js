(function () {
  'use strict';

  const DATA_URL = 'data/site-content.json';
  const escapeHtml = (value) => String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const safeAsset = (value, fallback) => {
    const path = String(value || '').trim();
    return /^(?:https:\/\/|\.\/|\.\.\/|[a-zA-Z0-9_./-]+$)/.test(path) ? path : fallback;
  };

  const articleUrl = (post) => `noi-dung.html?bai=${encodeURIComponent(post.id)}`;
  const published = (items) => (Array.isArray(items) ? items : []).filter((item) => item && item.published !== false && item.id);

  function renderFeature(element, post, kind) {
    if (!element || !post) return;
    element.href = articleUrl(post);
    const image = element.querySelector('img');
    const label = element.querySelector('.feature-copy span');
    const title = element.querySelector('.feature-copy h3');
    const summary = element.querySelector('.feature-copy p');
    if (image) {
      image.src = safeAsset(post.image, kind === 'crop' ? 'images/hero.jpg' : 'images/pest.jpg');
      image.alt = post.title || '';
    }
    if (label) label.textContent = post.label || post.category || (kind === 'crop' ? 'Cây trồng' : 'Dịch hại');
    if (title) title.textContent = post.title || '';
    if (summary) summary.textContent = post.summary || '';
  }

  function renderIndex(data) {
    const crops = published(data.crop_posts);
    const pests = published(data.pest_posts);
    const cropFeature = crops.find((item) => item.featured) || crops[0];
    const pestFeature = pests.find((item) => item.featured) || pests[0];

    renderFeature(document.getElementById('cms-crop-feature'), cropFeature, 'crop');
    renderFeature(document.getElementById('cms-pest-feature'), pestFeature, 'pest');

    const cropList = document.getElementById('cms-crop-list');
    if (cropList && crops.length) {
      cropList.innerHTML = crops.filter((item) => item !== cropFeature).slice(0, 4).map((post) =>
        `<a href="${articleUrl(post)}"><div><b>${escapeHtml(post.title)}</b><p>${escapeHtml(post.summary)}</p></div><em>→</em></a>`
      ).join('');
    }

    const pestList = document.getElementById('cms-pest-list');
    if (pestList && pests.length) {
      pestList.innerHTML = pests.filter((item) => item !== pestFeature).slice(0, 3).map((post) =>
        `<a href="${articleUrl(post)}"><img class="pest-list-image" src="${escapeHtml(safeAsset(post.image, 'images/pest.jpg'))}" alt="${escapeHtml(post.title)}"><div><h3>${escapeHtml(post.title)}</h3><p>${escapeHtml(post.summary)}</p></div><em>→</em></a>`
      ).join('');
    }
  }

  function renderDetail(data) {
    const root = document.getElementById('cms-article');
    if (!root) return;
    const id = new URLSearchParams(window.location.search).get('bai');
    const allPosts = published(data.crop_posts).concat(published(data.pest_posts));
    const post = allPosts.find((item) => item.id === id);
    const loading = document.getElementById('cms-loading');
    const notFound = document.getElementById('cms-not-found');
    if (!post) {
      if (loading) loading.hidden = true;
      if (notFound) notFound.hidden = false;
      return;
    }

    document.title = `${post.title} | Bảo Vệ Cây Trồng`;
    document.getElementById('cms-category').textContent = post.category || post.label || 'Bài viết';
    document.getElementById('cms-title').textContent = post.title || '';
    document.getElementById('cms-summary').textContent = post.summary || '';
    const image = document.getElementById('cms-image');
    image.src = safeAsset(post.image, 'images/hero.jpg');
    image.alt = post.title || '';
    const content = document.getElementById('cms-body');
    const paragraphs = String(post.content || '').split(/\n{2,}/).map((part) => part.trim()).filter(Boolean);
    content.innerHTML = paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`).join('');
    if (loading) loading.hidden = true;
    root.hidden = false;
  }

  async function init() {
    try {
      const response = await fetch(DATA_URL, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      renderIndex(data);
      renderDetail(data);
    } catch (error) {
      console.warn('Không thể tải dữ liệu CMS; đang giữ nội dung dự phòng.', error);
      const loading = document.getElementById('cms-loading');
      const notFound = document.getElementById('cms-not-found');
      if (loading) loading.hidden = true;
      if (notFound) {
        notFound.hidden = false;
        notFound.querySelector('p').textContent = 'Chưa thể tải dữ liệu bài viết. Vui lòng thử lại sau.';
      }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
