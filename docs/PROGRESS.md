# Tiến độ SN AI LIVE STUDIO — 22/11/2026

| Mã | Phân hệ | Yêu cầu | Trạng thái | File | Ưu tiên | Phụ thuộc | Kiểm thử | Tồn đọng / Tiếp theo |
|---|---|---|---|---|---|---|---|---|
| INIT-01 | Kiến trúc | Bộ tài liệu nền tảng | Implemented | docs/*.md | P0 | Đặc tả gốc | Kiểm tra ZIP và liên kết | Đã đưa vào kho AILIVETREAM |
| FND-01 | Desktop | Electron, React, TypeScript và IPC | Implemented | main.cjs, preload.cjs, renderer.tsx, package.json | P0 | Node 24+ | Typecheck, build và kiểm tra cú pháp đạt | Electron Linux bị chặn khi tạo socket. Kiểm tra mở ứng dụng trên macOS và Windows |
| FND-02 | Dữ liệu | SQLite và cấu hình cục bộ | In Progress | storage.cjs, studio.test.cjs | P0 | FND-01 | Kiểm thử giữ dữ liệu khi mở lại DB đạt | Migration có phiên bản và ca phục hồi |
| FND-03 | Quản trị | Thiết lập và đăng nhập một tài khoản quản trị cục bộ | In Progress | storage.cjs, main.cjs, renderer.tsx | P0 | FND-02 | Kiểm thử mật khẩu đúng/sai đạt | RBAC nhiều người dùng, audit và kiểm thử giao diện |
| FND-04/05 | Chất lượng | Quản trị, CI và kiểm thử desktop native | Not Started | RUN_DESKTOP.md | P1/P0 | FND-01..03 | Chưa chạy | Chạy trên macOS/Windows và bổ sung CI |

TikTok Shop, Shopee, ERP và OBS chưa kết nối. Các mốc còn lại theo [Master Checklist](MASTER_CHECKLIST.md).
