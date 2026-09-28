# Skyform — form xanh da trời

Website HTML/CSS/JavaScript thuần. Không cần npm hoặc bước build. Có trang form, trang Thank you riêng, kiểm tra dữ liệu, trạng thái gửi, con trỏ nhấp nháy, confetti xanh, giao diện điện thoại và hỗ trợ giảm chuyển động.

## Xem thử

Mở `index.html` bằng trình duyệt. Nhập tên, email, lời nhắn rồi bấm Submit message. Khi chưa cấu hình nơi nhận, đây là DEMO: không gửi hoặc lưu thông tin đã nhập.

## Publish trên GitHub Pages

1. Tạo repository GitHub, ví dụ `skyform` (public nếu dùng GitHub Free).
2. Giải nén và upload các file **bên trong** thư mục `sky-form` vào gốc repository. `index.html` phải nằm ngay gốc, không nằm trong thư mục con `sky-form`.
3. Commit các file vào nhánh `main`.
4. Trong repository chọn Settings → Pages → Build and deployment → Source: Deploy from a branch.
5. Chọn Branch: `main`, thư mục `/ (root)`, rồi Save.
6. Chờ GitHub hoàn tất, lấy địa chỉ website hiển thị tại Pages. Địa chỉ thường là `https://TEN-TAI-KHOAN.github.io/skyform/`.

Tài liệu chính thức: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Nhận nội dung form thật

GitHub Pages phục vụ file tĩnh, không tự xử lý email. Website đã có sẵn mã kết nối Formspree:

1. Tạo form tại https://formspree.io và xác nhận địa chỉ nhận theo hướng dẫn của họ.
2. Sao chép endpoint tại phần Integration của form.
3. Sửa `config.js`:

```js
window.SKYFORM_ENDPOINT = 'https://formspree.io/f/MA_FORM_CUA_BAN';
```

4. Upload/commit file `config.js` đã sửa. Gửi một lời nhắn thử từ website đã publish và xác nhận trong Formspree/inbox.

Chỉ chuyển sang trang thành công khi dịch vụ trả về trạng thái HTTP thành công. Nếu lỗi mạng/dịch vụ, form giữ nguyên nội dung và cho phép thử lại. Chưa kiểm thử nhận email thật vì chưa có endpoint của bạn. Đừng đặt mật khẩu hoặc API key bí mật trong các file công khai. Endpoint form công khai là đủ.

Tài liệu Formspree: https://help.formspree.io/articles/building-your-form/building-an-html-form

## Chỉnh nội dung

- `index.html`: logo chữ, tiêu đề, nhãn trường.
- `thank-you.html` và `thank-you.js`: trang cảm ơn, lời nhắn demo/thành công.
- `style.css`: màu sắc, khoảng cách, animation; màu chính `#087ccf`.
- `config.js`: endpoint nhận form.

Website không lưu tên/email/lời nhắn vào trình duyệt. Chỉ dùng sessionStorage để đánh dấu trạng thái demo/thành công trong 10 phút. Không có thư viện hoặc font bên ngoài. API WebMCP tùy chọn giúp điền sẵn form để xem xét, không tự gửi.
