/* Shared interactions for the index and every static content page. */
(function () {
  const body = document.body;
  const menu = document.getElementById('mobile-menu');
  const menuButton = document.getElementById('menu-btn');
  const themeButton = document.getElementById('theme-btn');
  const toast = document.getElementById('toast');
  let toastTimer;
  const byId = (id) => document.getElementById(id);
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }
  if (menu && menuButton) {
    menuButton.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      menuButton.textContent = isOpen ? '×' : '☰';
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menu.classList.remove('open'); menuButton.textContent = '☰';
    }));
  }
  const storedTheme = localStorage.getItem('bvc-theme');
  if (storedTheme === 'dark') { body.classList.add('dark'); if (themeButton) themeButton.textContent = '☀'; }
  if (themeButton) themeButton.addEventListener('click', () => {
    body.classList.toggle('dark');
    const dark = body.classList.contains('dark');
    themeButton.textContent = dark ? '☀' : '☾';
    localStorage.setItem('bvc-theme', dark ? 'dark' : 'light');
  });
  const searchInput = byId('site-search');
  const searchButton = byId('search-btn');
  function runSearch() {
    const value = searchInput ? searchInput.value.trim() : '';
    showToast(value ? `Đã ghi nhận tìm kiếm: “${value}”.` : 'Hãy nhập cây trồng, sâu bệnh hoặc hoạt chất cần tìm.');
  }
  if (searchInput && searchButton) {
    searchButton.addEventListener('click', runSearch);
    searchInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') runSearch(); });
    document.querySelectorAll('.suggestion').forEach((button) => button.addEventListener('click', () => { searchInput.value = button.dataset.value; searchInput.focus(); }));
  }
  const lookupForm = byId('lookup-form');
  if (lookupForm) {
    const fields = { product: 'Thương phẩm', active: 'Hoạt chất', crop: 'Cây trồng', pest: 'Dịch hại', company: 'Công ty đăng ký' };
    const result = byId('lookup-result');
    lookupForm.addEventListener('submit', (event) => { event.preventDefault(); const params = new URLSearchParams(); Object.keys(fields).forEach((id) => { const value = byId(id).value.trim(); if (value) params.set(id, value); }); window.location.href = `tra-cuu.html${params.size ? `?${params.toString()}` : ''}`; });
    byId('clear-btn').addEventListener('click', () => { Object.keys(fields).forEach((id) => { byId(id).value = ''; }); result.textContent = '◉ Ô không nhập được hiểu là chọn tất cả. Dùng dấu "," là hoặc (sâu xanh, rầy nghĩa là có sâu xanh hoặc có rầy), dấu ";" là và (sâu xanh; rầy nghĩa là có sâu xanh và có rầy).'; });
  }
  document.querySelectorAll('[data-video]').forEach((video) => video.addEventListener('click', (event) => { event.preventDefault(); showToast(`Video minh họa: ${video.dataset.video}`); }));
  document.querySelectorAll('[data-soon]').forEach((link) => link.addEventListener('click', (event) => {
    if (link.getAttribute('href') !== '#') return;
    event.preventDefault();
    showToast(link.dataset.soon);
  }));
  const primaryRoutes = {
    'Trang chủ': 'index.html',
    'Cây trồng': 'cay-trong.html',
    'Cây sầu riêng': 'cay-sau-rieng.html',
    'Cây cà phê': 'cay-ca-phe.html',
    'Dịch hại': 'dich-hai.html',
    'Tra cứu': 'tra-cuu.html',
    'Tra cứu nông dược': 'tra-cuu.html',
    'Video': 'video.html',
    'Video canh tác': 'video.html'
  };
  document.querySelectorAll('a').forEach((link) => {
    const label = link.textContent.replace(/[›→]/g, '').trim();
    if (primaryRoutes[label]) link.setAttribute('href', primaryRoutes[label]);
    if (link.target === '_blank') link.rel = 'noopener noreferrer';
    if (link.href.includes('youtube.com/@PhuChauMinh2026')) link.href = 'https://www.youtube.com/@banmoinha';
  });
  const filterButtons = document.querySelectorAll('[data-filter]');
  if (filterButtons.length) filterButtons.forEach((button) => button.addEventListener('click', () => { const filter = button.dataset.filter; filterButtons.forEach((item) => item.classList.toggle('active', item === button)); document.querySelectorAll('#rice-grid [data-category]').forEach((card) => { card.hidden = filter !== 'all' && card.dataset.category !== filter; }); }));
  const articleData = { 'de-nhanh': { title: 'Chăm sóc lúa giai đoạn đẻ nhánh', category: 'Kỹ thuật canh tác', stage: 'Giai đoạn đẻ nhánh', lead: 'Giai đoạn đẻ nhánh quyết định số dảnh hữu hiệu. Quản lý nước hợp lý, bón thúc sớm và theo dõi sâu bệnh giúp lúa sinh trưởng khỏe.', image: 'images/hero.jpg' }, 'quan-ly-nuoc': { title: 'Quản lý nước ruộng lúa', category: 'Kỹ thuật canh tác', stage: 'Quản lý nước', lead: 'Điều tiết mực nước theo giai đoạn giúp bộ rễ phát triển tốt, hạn chế cỏ dại và sử dụng dinh dưỡng hiệu quả.', image: 'images/video.jpg' }, 'bon-thuc': { title: 'Bón thúc đúng thời điểm', category: 'Dinh dưỡng', stage: 'Giai đoạn sinh trưởng', lead: 'Bón thúc cân đối theo tình trạng ruộng giúp lúa đẻ nhánh khỏe, lá đứng và hạn chế nguy cơ đổ ngã.', image: 'images/hero.jpg' }, 'sau-cuon-la': { title: 'Nhận biết sâu cuốn lá', category: 'Sâu hại', stage: 'Theo dõi đồng ruộng', lead: 'Nhận biết sớm vết cuốn lá và mật độ sâu giúp lựa chọn biện pháp quản lý phù hợp, an toàn cho ruộng lúa.', image: 'images/pest.jpg' }, 'dao-on': { title: 'Phòng bệnh đạo ôn', category: 'Bệnh hại', stage: 'Theo dõi lá lúa', lead: 'Quan sát vết bệnh sớm, điều chỉnh dinh dưỡng và giữ ruộng thông thoáng là nền tảng quản lý bệnh đạo ôn.', image: 'images/pest.jpg' }, 'ray-nau': { title: 'Quản lý rầy nâu', category: 'Sâu hại', stage: 'Theo dõi dịch hại', lead: 'Theo dõi mật số rầy nâu thường xuyên để bảo vệ ruộng lúa và ngăn ngừa nguy cơ lan truyền bệnh.', image: 'images/pest.jpg' }, 'lam-co': { title: 'Làm cỏ sục bùn hiệu quả', category: 'Cỏ dại', stage: 'Chăm sóc ruộng', lead: 'Sục bùn kết hợp làm cỏ giúp ruộng thông thoáng, giảm cạnh tranh dinh dưỡng và hỗ trợ bộ rễ phát triển.', image: 'images/video.jpg' }, 'lam-dong': { title: 'Dinh dưỡng cho lúa làm đòng', category: 'Dinh dưỡng', stage: 'Giai đoạn làm đòng', lead: 'Cân đối dinh dưỡng trong giai đoạn làm đòng giúp đòng khỏe, trổ tập trung và tăng chất lượng hạt.', image: 'images/hero.jpg' }, 'sau-thu-hoach': { title: 'Chuẩn bị ruộng sau thu hoạch', category: 'Kỹ thuật canh tác', stage: 'Sau thu hoạch', lead: 'Vệ sinh đồng ruộng và xử lý rơm rạ hợp lý là bước chuẩn bị quan trọng cho vụ mùa tiếp theo.', image: 'images/video.jpg' } };
  Object.assign(articleData, {
    'ky-thuat-lua': { title: 'Làm đất và chuẩn bị ruộng gieo sạ', category: 'Kỹ thuật canh tác', stage: 'Đầu vụ', lead: 'Chuẩn bị đất, nước và mặt ruộng đồng đều giúp cây lúa bén rễ nhanh và thuận lợi cho các bước chăm sóc tiếp theo.', image: 'images/video.jpg' },
    'sau-hai-lua': { title: 'Theo dõi sâu hại trên ruộng lúa', category: 'Sâu hại', stage: 'Thăm đồng định kỳ', lead: 'Thăm đồng theo tuyến giúp phát hiện sớm biến động sâu hại và chủ động lựa chọn biện pháp quản lý phù hợp.', image: 'images/pest.jpg' },
    'benh-hai-lua': { title: 'Quản lý bệnh hại theo giai đoạn', category: 'Bệnh hại', stage: 'Theo dõi lá lúa', lead: 'Theo dõi triệu chứng bệnh ở từng giai đoạn giúp điều chỉnh chăm sóc và hạn chế nguy cơ lây lan trong ruộng.', image: 'images/pest.jpg' },
    'dinh-duong-lua': { title: 'Cân đối dinh dưỡng cho lúa', category: 'Dinh dưỡng', stage: 'Chăm sóc dinh dưỡng', lead: 'Cân đối các yếu tố dinh dưỡng giúp lúa sinh trưởng ổn định, thân cứng và giảm nguy cơ sâu bệnh.', image: 'images/hero.jpg' },
    'co-dai-lua': { title: 'Quản lý cỏ dại theo giai đoạn', category: 'Cỏ dại', stage: 'Chăm sóc ruộng', lead: 'Quản lý cỏ dại sớm giúp giảm cạnh tranh dinh dưỡng và giữ ruộng thông thoáng cho cây lúa.', image: 'images/video.jpg' },
    'co-dai-sinh-hoc': { title: 'Giữ ruộng thông thoáng và sạch cỏ', category: 'Cỏ dại', stage: 'Chăm sóc ruộng', lead: 'Kết hợp các biện pháp chăm sóc phù hợp giúp ruộng lúa hạn chế cỏ dại và phát triển đồng đều.', image: 'images/video.jpg' }
  });
  const articleKey = new URLSearchParams(window.location.search).get('bai');
  if (articleKey && articleData[articleKey] && byId('article-title')) { const item = articleData[articleKey]; byId('article-title').textContent = item.title; byId('article-lead').textContent = item.lead; byId('article-category').textContent = item.category; byId('article-category-chip').textContent = item.category; byId('article-stage').textContent = item.stage; byId('related-category').textContent = item.category; byId('article-image').src = item.image; byId('article-image').alt = item.title; document.title = `${item.title} | Bảo Vệ Cây Trồng`; }
  const articleBodies = {
    'de-nhanh': '<h2>Ba việc cần ưu tiên</h2><ol class="steps"><li><b>Giữ mực nước phù hợp</b>Giữ mực nước ổn định để lúa đẻ nhánh khỏe, không để ruộng khô nứt hoặc ngập sâu kéo dài.</li><li><b>Bón thúc đúng thời điểm</b>Bón thúc khi lúa bắt đầu nhánh rộ, kết hợp theo dõi màu lá và điều kiện đất để điều chỉnh lượng dinh dưỡng.</li><li><b>Theo dõi sâu cuốn lá và rầy nâu</b>Kiểm tra đồng ruộng thường xuyên để phát hiện sớm dấu hiệu sâu hại và giữ ruộng thông thoáng.</li></ol><p>Chăm sóc tốt giai đoạn đẻ nhánh là nền tảng để lúa tăng số dảnh hữu hiệu, đồng đều và chuẩn bị cho giai đoạn làm đòng.</p>',
    'quan-ly-nuoc': '<h2>Điều tiết nước theo từng thời điểm</h2><ol class="steps"><li><b>Giữ nước nông khi lúa sinh trưởng</b>Mực nước nông giúp rễ nhận đủ oxy và hạn chế cây phát triển yếu.</li><li><b>Tháo nước trước khi bón thúc</b>Tháo cạn hợp lý giúp dinh dưỡng tiếp cận vùng rễ hiệu quả hơn.</li><li><b>Quan sát mặt ruộng sau mưa</b>Chủ động khơi rãnh thoát nước để ruộng không bị ngập sâu kéo dài.</li></ol><p>Quản lý nước cần dựa trên thời tiết, loại đất và giai đoạn sinh trưởng thực tế của ruộng lúa.</p>',
    'bon-thuc': '<h2>Bón thúc theo nhu cầu của lúa</h2><ol class="steps"><li><b>Quan sát màu lá và sức sinh trưởng</b>Cây lúa khỏe có lá đứng, màu xanh vừa phải và đẻ nhánh đồng đều.</li><li><b>Chia lượng bón hợp lý</b>Không nên dồn toàn bộ dinh dưỡng vào một lần; cần chia theo giai đoạn của cây.</li><li><b>Kết hợp chăm sóc ruộng</b>Điều tiết nước và làm cỏ giúp cây sử dụng dinh dưỡng hiệu quả hơn.</li></ol><p>Bón thúc cần được điều chỉnh theo giống lúa, đất canh tác và điều kiện thời tiết tại ruộng.</p>',
    'sau-cuon-la': '<h2>Dấu hiệu cần theo dõi</h2><ol class="steps"><li><b>Quan sát lá cuốn dọc</b>Lá non bị cuốn, bên trong có sâu non hoặc phân sâu là dấu hiệu thường gặp.</li><li><b>Kiểm tra mật độ tại nhiều vị trí</b>Không chỉ nhìn một điểm; cần đi theo đường chéo ruộng để đánh giá đầy đủ hơn.</li><li><b>Ưu tiên biện pháp quản lý tổng hợp</b>Giữ ruộng thông thoáng và theo dõi giai đoạn mẫn cảm trước khi quyết định biện pháp xử lý.</li></ol><p>Phát hiện sớm giúp hạn chế tổn thương bộ lá và giảm áp lực sâu hại trong các giai đoạn sau.</p>',
    'dao-on': '<h2>Nhận diện và phòng ngừa sớm</h2><ol class="steps"><li><b>Quan sát vết bệnh trên lá</b>Vết bệnh điển hình thường có tâm nhạt màu và viền nâu; cần theo dõi cả những lá mới xuất hiện triệu chứng.</li><li><b>Không bón thừa đạm</b>Dinh dưỡng mất cân đối làm cây lúa mềm yếu và tăng nguy cơ bệnh phát triển.</li><li><b>Giữ ruộng thông thoáng</b>Điều tiết nước và thăm ruộng đều đặn giúp phát hiện biến động sớm hơn.</li></ol><p>Quản lý bệnh đạo ôn cần kết hợp giống, dinh dưỡng, nước và điều kiện thời tiết thực tế.</p>',
    'ray-nau': '<h2>Theo dõi rầy nâu chủ động</h2><ol class="steps"><li><b>Kiểm tra gốc lúa</b>Rầy thường tập trung phần gốc, vì vậy cần vạch bụi lúa để quan sát rõ.</li><li><b>Đánh giá theo mật số và tuổi rầy</b>Ghi nhận mật độ tại nhiều điểm để tránh đánh giá vội vàng.</li><li><b>Giữ đồng ruộng cân bằng</b>Tránh làm lúa quá rậm hoặc bón thừa đạm, đồng thời theo dõi diễn biến xung quanh.</li></ol><p>Theo dõi liên tục giúp người trồng chủ động hơn trước các đợt rầy phát sinh.</p>',
    'lam-co': '<h2>Làm cỏ kết hợp sục bùn</h2><ol class="steps"><li><b>Chọn thời điểm ruộng có mực nước phù hợp</b>Nước quá sâu hoặc quá cạn đều làm thao tác kém hiệu quả.</li><li><b>Di chuyển nhẹ giữa các hàng lúa</b>Hạn chế làm tổn thương rễ và gốc lúa non.</li><li><b>Kết hợp quan sát tình trạng đất</b>Sục bùn nhẹ giúp phá váng, tăng trao đổi khí và hỗ trợ rễ phát triển.</li></ol><p>Giữ ruộng sạch cỏ giúp cây lúa giảm cạnh tranh dinh dưỡng trong giai đoạn sinh trưởng mạnh.</p>',
    'lam-dong': '<h2>Nuôi đòng khỏe và đồng đều</h2><ol class="steps"><li><b>Theo dõi sức sinh trưởng của ruộng</b>Quan sát lá, thân và độ đồng đều giữa các khóm lúa.</li><li><b>Cân đối dinh dưỡng</b>Ưu tiên dưỡng chất cần thiết cho quá trình làm đòng, không bón lệch một yếu tố.</li><li><b>Giữ nước và ruộng thông thoáng</b>Điều tiết nước phù hợp giúp cây hấp thu dinh dưỡng ổn định hơn.</li></ol><p>Giai đoạn làm đòng cần được theo dõi kỹ vì ảnh hưởng trực tiếp đến số hạt và chất lượng bông lúa.</p>',
    'sau-thu-hoach': '<h2>Chuẩn bị nền ruộng cho vụ mới</h2><ol class="steps"><li><b>Vệ sinh đồng ruộng</b>Thu gom, xử lý tàn dư phù hợp để hạn chế nguồn sâu bệnh lưu tồn.</li><li><b>Quản lý rơm rạ hợp lý</b>Không đốt tùy tiện; cần lựa chọn giải pháp phù hợp điều kiện canh tác.</li><li><b>Kiểm tra hệ thống nước</b>Khơi thông rãnh và chủ động kế hoạch nước cho vụ tiếp theo.</li></ol><p>Chuẩn bị ruộng cẩn thận sau thu hoạch tạo điều kiện tốt cho một vụ mùa mới chủ động hơn.</p>'
  };
  const relatedByCategory = {
    'Kỹ thuật canh tác': [['quan-ly-nuoc', 'Quản lý nước ruộng lúa'], ['ky-thuat-lua', 'Làm đất và chuẩn bị ruộng gieo sạ'], ['sau-thu-hoach', 'Chuẩn bị ruộng sau thu hoạch']],
    'Sâu hại': [['sau-cuon-la', 'Nhận biết sâu cuốn lá'], ['ray-nau', 'Quản lý rầy nâu'], ['sau-hai-lua', 'Theo dõi sâu hại trên ruộng lúa']],
    'Bệnh hại': [['dao-on', 'Phòng bệnh đạo ôn'], ['benh-hai-lua', 'Quản lý bệnh hại theo giai đoạn'], ['sau-hai-lua', 'Phân biệt triệu chứng trên lá lúa']],
    'Dinh dưỡng': [['bon-thuc', 'Bón thúc đúng thời điểm'], ['lam-dong', 'Dinh dưỡng cho lúa làm đòng'], ['dinh-duong-lua', 'Cân đối dinh dưỡng cho lúa']],
    'Cỏ dại': [['lam-co', 'Làm cỏ sục bùn hiệu quả'], ['co-dai-lua', 'Quản lý cỏ dại theo giai đoạn'], ['co-dai-sinh-hoc', 'Giữ ruộng thông thoáng và sạch cỏ']]
  };
  if (articleKey && articleData[articleKey] && byId('article-body')) {
    const item = articleData[articleKey];
    byId('article-body').innerHTML = articleBodies[articleKey] || articleBodies['de-nhanh'];
    const relatedCards = document.querySelector('.related-panel .article-grid');
    const relatedItems = (relatedByCategory[item.category] || relatedByCategory['Kỹ thuật canh tác']).filter(([key]) => key !== articleKey);
    if (relatedCards) relatedCards.innerHTML = relatedItems.map(([key, title]) => `<a class="article-card" href="bai-viet-lua.html?bai=${key}"><img src="${articleData[key].image}" alt="${title}"><div class="article-card-copy"><small>${item.category}</small><h3>${title}</h3></div></a>`).join('');
  }
  const backTop = byId('back-top');
  if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}());




/* Nút toàn màn hình dùng chung cho mọi trang */
(function(){const b=document.getElementById('page-fullscreen');if(!b)return;b.addEventListener('click',()=>{const e=document.documentElement;if(document.fullscreenElement){(document.exitFullscreen||document.webkitExitFullscreen).call(document)}else{(e.requestFullscreen||e.webkitRequestFullscreen).call(e)}});document.addEventListener('fullscreenchange',()=>{const on=!!document.fullscreenElement;b.textContent=on?'×':'⛶';b.setAttribute('aria-label',on?'Thoát toàn màn hình':'Toàn màn hình');b.setAttribute('title',on?'Thoát toàn màn hình':'Toàn màn hình')})})();

