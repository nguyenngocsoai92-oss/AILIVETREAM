# Chạy SN AI LIVE STUDIO V0.1

Cài Node.js 24 trở lên. Tại thư mục gốc của kho AILIVETREAM, chạy:

```bash
npm ci
npm start
```

Lần đầu mở, tạo mật khẩu quản trị cục bộ từ 12 ký tự. Sau đó thử đổi tên studio, lưu, đóng ứng dụng, mở lại và đăng nhập để kiểm tra tên đã lưu. Electron dùng thư mục dữ liệu ứng dụng của hệ điều hành để lưu SQLite.

Kiểm tra mã bằng `npm test`, `npm run typecheck` và `npm run build`. Sau khi build, có thể kiểm tra renderer Electron bằng `npx electron . --smoke-test` trong môi trường có màn hình.

Bản này cung cấp một tài khoản quản trị cục bộ và cấu hình studio. Chưa có phân quyền nhiều người dùng, kết nối TikTok Shop/Shopee/SN ERP/OBS hoặc bộ cài đã ký.

## Đóng gói macOS

Tải artifact theo kiến trúc của máy trong workflow **Build macOS disk image**. Giải nén tệp artifact, mở DMG, rồi kéo ứng dụng vào Applications. Gói thử nghiệm chưa có Developer ID và notarization. Chỉ cài khi đã xác minh nguồn tải và chính sách máy cho phép.

Có thể tạo app bundle bằng `npm ci && npm run package:mac` trên máy Mac. Bundle nằm trong thư mục `mac-release/`. Gói hiện có đăng nhập cục bộ, cấu hình studio, danh mục nhập tay và một bản nháp LIVE. Tích hợp chính thức, OBS, bình luận, AI và báo cáo chưa có trong gói.
