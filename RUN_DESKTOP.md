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

## Phát LIVE qua OBS

1. Mở OBS Studio và bật WebSocket Server trong **Tools → WebSocket Server Settings**. Giữ xác thực bật và dùng mật khẩu OBS.
2. Cấu hình nguồn camera/micro, cảnh và đích phát được nền tảng cấp phép trong OBS. Không nhập stream key vào SN AI LIVE STUDIO.
3. Mở **Phát LIVE qua OBS**, nhập cổng và mật khẩu WebSocket, rồi bấm **Kết nối OBS trên máy này**.
4. Chọn cảnh, kiểm tra đúng đích trong OBS, bấm **Bắt đầu phát OBS** và xác nhận. Kiểm tra trạng thái LIVE riêng trên công cụ của nền tảng.
5. Khi đã kết thúc, bấm **Dừng phát OBS** và xác nhận. Ngắt kết nối hoặc đăng xuất chỉ ngắt điều khiển. Luồng đang phát tiếp tục cho tới khi có lệnh dừng.

Kết nối chỉ tới OBS trên cùng máy. Tài khoản sàn, quyền phát và đích phát được cấu hình bên ngoài. Chưa có kiểm thử với OBS hoặc tài khoản sàn thật.

## MC ảo trên Mac

Vào **MC ảo**, nhập mỗi đoạn một dòng và lưu trên máy. Bấm **Đọc kịch bản** để nghe giọng tiếng Việt macOS và xem hoạt ảnh miệng. Nếu ứng dụng báo thiếu giọng, tải giọng tiếng Việt trong cài đặt trợ năng của Mac. Dùng **Dừng đọc** để dừng, kể cả khi app đang tìm giọng.

Bấm **Mở cửa sổ MC cho OBS** để mở cửa sổ hình và phụ đề riêng. Chọn cửa sổ này làm nguồn hình trong OBS. Kiểm tra đường thu âm thanh của giọng đọc cục bộ trong OBS trước khi đưa ra luồng phát. Hoạt ảnh miệng chạy theo trạng thái đọc của từng đoạn. Giọng đọc đã được kiểm thử bằng tiến trình giả lập, chưa được nghe thử trên máy Mac có cài giọng tiếng Việt.
