(function () {
  const ids = ['title', 'slug', 'type', 'stage', 'hosts', 'image', 'lead', 'note', 'body'];
  const fields = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));
  const output = document.getElementById('output-code');
  const preview = document.getElementById('preview-pane');
  const status = document.getElementById('status');
  let slugEdited = false;

  function slugify(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  function hosts() { return fields.hosts.value.split(',').map((item) => item.trim()).filter(Boolean); }
  function quoted(value) { return JSON.stringify(value); }
  function createCode() {
    const values = {
      title: fields.title.value,
      type: fields.type.value,
      stage: fields.stage.value,
      hosts: hosts(),
      lead: fields.lead.value,
      image: fields.image.value,
      note: fields.note.value,
      body: fields.body.value
    };
    return `    ${quoted(fields.slug.value)}: { title:${quoted(values.title)}, type:${quoted(values.type)}, stage:${quoted(values.stage)}, hosts:${JSON.stringify(values.hosts)}, lead:${quoted(values.lead)}, image:${quoted(values.image)}, note:${quoted(values.note)}, body:${quoted(values.body)} },`;
  }
  function render() {
    output.value = createCode();
    document.getElementById('body-count').textContent = `${fields.body.value.length.toLocaleString('vi-VN')} ký tự`;
    preview.innerHTML = fields.body.value || '<div class="preview-empty">Nội dung xem trước sẽ xuất hiện tại đây.</div>';
  }
  fields.title.addEventListener('input', () => { if (!slugEdited) fields.slug.value = slugify(fields.title.value); render(); });
  fields.slug.addEventListener('input', () => { slugEdited = Boolean(fields.slug.value); fields.slug.value = slugify(fields.slug.value); render(); });
  ids.filter((id) => !['title', 'slug'].includes(id)).forEach((id) => fields[id].addEventListener('input', render));
  fields.type.addEventListener('change', render);
  document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => {
    const showCode = button.dataset.view === 'code';
    document.getElementById('preview-pane').hidden = showCode;
    document.getElementById('code-pane').hidden = !showCode;
    document.querySelectorAll('[data-view]').forEach((item) => item.classList.toggle('active', item === button));
  }));
  document.getElementById('copy-code').addEventListener('click', async () => {
    if (!fields.title.value.trim() || !fields.slug.value.trim() || !hosts().length) { status.textContent = 'Vui lòng nhập tên, slug và ít nhất một cây bị ảnh hưởng.'; document.getElementById('pest-entry-form').reportValidity(); return; }
    try { await navigator.clipboard.writeText(output.value); status.textContent = 'Đã sao chép mã. Hãy dán vào đối tượng data trong dich-hai.js.'; }
    catch (_) { output.select(); document.execCommand('copy'); status.textContent = 'Đã sao chép mã.'; }
  });
  document.getElementById('reset-form').addEventListener('click', () => {
    document.getElementById('pest-entry-form').reset(); fields.image.value = 'images/pest.jpg'; slugEdited = false; status.textContent = 'Đã đặt lại biểu mẫu.'; render(); fields.title.focus();
  });
  fields.body.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    event.preventDefault(); const start = fields.body.selectionStart; fields.body.setRangeText('  ', start, fields.body.selectionEnd, 'end'); render();
  });
  render();
}());
