# Lịch sử làm việc — Website Bảo Vệ Cây Trồng

## 24/08/2026

### Lần 1 — Làm sáng giao diện và thu gọn bố cục

- Chỉnh trực tiếp `index.html`.
- Làm sáng bảng màu tổng thể: nền trắng xanh nhẹ, xanh lá sáng hơn, màu nhấn lime rõ hơn và khu vực hero nổi bật hơn.
- Giảm khoảng cách giữa các section, danh sách cây trồng, bài viết, video, biểu mẫu tra cứu và footer.
- Bổ sung các quy tắc responsive để giao diện gọn hơn trên màn hình nhỏ.

### Lần 2 — Thu gọn khoảng cách rõ rệt hơn

- Kiểm tra `style.css`, `mobile-fix.css` và `compact-mobile.css` để xác định các quy tắc có thể ghi đè khoảng cách.
- Tiếp tục chỉnh trực tiếp trong `index.html` bằng một khối CSS ưu tiên cao hơn.
- Thu gọn khoảng cách menu điều hướng: bỏ khoảng cách giữa các mục và giảm padding mỗi mục.
- Giảm rõ rệt padding của section, khoảng cách giữa các khối nội dung, chiều cao tối thiểu của các dòng danh sách và khoảng cách footer.
- Trên mobile, giảm thêm khoảng cách section, danh sách cây trồng, khối dịch hại, tra cứu, video và footer.

### Tệp đã thay đổi

- `index.html`
- `LICH-SU-LAM-VIEC.md`

### Ghi chú

Nếu trình duyệt vẫn hiển thị giao diện cũ, hãy tải lại mạnh bằng `Ctrl + F5` để xoá CSS cũ trong bộ nhớ đệm trình duyệt.

## 24/08/2026 — Lần 3: Kéo sát mục 01 và mục 02

Theo phản hồi từ ảnh giao diện, đã chỉnh trực tiếp trong `index.html` để giảm khoảng trắng dọc giữa mục **01 — Cẩm nang theo cây trồng** và mục **02 — Dịch hại cần lưu ý**. Mục 01 nay có `padding-bottom: 14px`, mục 02 có `padding-top: 14px`; trên màn hình nhỏ lần lượt là `10px` và `10px`, sử dụng `!important` để tránh các tệp CSS khác ghi đè. 

Đã kiểm tra lại khối CSS sau khi lưu. Nếu trình duyệt chưa cập nhật, tải lại bằng `Ctrl + F5`.

