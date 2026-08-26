$path = 'C:\Users\vovan\Desktop\BVCT-SURFACE\nhap-dich-hai-moi.html'
$s = Get-Content -LiteralPath $path -Raw -Encoding UTF8
$s = $s.Replace('<title>Quản lý nội dung dịch hại | Bảo Vệ Cây Trồng</title>', '<title>Quản trị bài viết dịch hại | Bản gọn</title>')
$s = $s.Replace('<h1>Quản lý bài viết</h1>', '<h1>Quản lý bài viết <small class="version-tag">BẢN GỌN</small></h1>')
$s = $s.Replace('Thêm, chỉnh sửa, lưu nháp và xuất dữ liệu an toàn cho website.', 'Soạn bài, lưu nháp và xuất bản an toàn trong một giao diện gọn.')
$css = '.version-tag{display:inline-block;margin-left:8px;padding:4px 8px;border-radius:99px;background:#e8f4e9;color:#17663f;font:600 11px Arial,sans-serif;vertical-align:middle}.layout{grid-template-columns:370px minmax(0,1fr);gap:18px}.panel{padding:16px}.panel h2{font-size:18px}.panel:first-child .panel-head{position:sticky;top:0;z-index:3;background:#fff;padding-bottom:10px}.item{padding:10px}.item-actions button{padding:5px 8px}.actions{gap:7px}.actions .primary{min-width:92px}.output{padding:12px;border:1px solid var(--line);border-radius:10px;background:#f6faf7}.output>.actions{border-top:0;margin-top:8px;padding-top:4px}.output textarea{min-height:120px}.editor{max-height:520px}.toolbar{position:sticky;top:0;z-index:5}.image-tools{font-size:13px}.image-tools .btn{padding:6px 9px}@media(max-width:1000px){.layout{grid-template-columns:1fr}}'
$s = $s.Replace('</style></head>', $css + '</style></head>')
$s = $s.Replace('Lưu thay đổi</button>', 'Lưu</button>')
$s = $s.Replace('Xóa bài</button>', 'Xóa</button>')
$s = $s.Replace('Tải dich-hai.js</button>', 'Xuất bài đăng</button>')
s = $s
[IO.File]::WriteAllText($path, $s, [Text.UTF8Encoding]::new($false))
Write-Output 'NEW_ADMIN_CREATED'
