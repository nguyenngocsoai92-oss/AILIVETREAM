# Tiến độ SN AI LIVE STUDIO

- FND-01 — Đã đưa Electron, React, TypeScript và IPC lên main. Typecheck và build đạt. Môi trường Linux chặn Electron tạo socket nên chưa xác nhận cửa sổ ứng dụng.
- FND-02 — SQLite đã lưu cấu hình và đọc lại sau khi mở DB. Kiểm thử tự động đạt. Migration có phiên bản đang chờ.
- FND-03 — Đã có thiết lập và đăng nhập một quản trị viên cục bộ. Kiểm thử mật khẩu đúng/sai đạt. RBAC nhiều người dùng và audit đang chờ.
- Tiếp theo — Chạy trên macOS/Windows và bổ sung CI. TikTok Shop, Shopee, ERP và OBS chưa kết nối.

Xem [hướng dẫn chạy desktop](../RUN_DESKTOP.md) và [Master Checklist](MASTER_CHECKLIST.md).


## Danh mục và chuẩn bị LIVE

- PRD-01/03, LIVE-01 — Đã có nhập sản phẩm thủ công theo nguồn/tài khoản và lưu một bản nháp phiên vào SQLite. Chặn SKU trùng trong cùng nguồn và tài khoản, chặn chọn sản phẩm ngoài phạm vi phiên.
- npm test (2 ca), typecheck và build đều đạt. Giá, tồn kho, listing và kết nối chính thức chưa được xác minh.


## Đóng gói macOS

- REL-02 — Đã thêm workflow build bundle .app và DMG theo kiến trúc Apple Silicon/Intel. Workflow chạy test, typecheck, build, mở bundle và kiểm tra ảnh đĩa.
- Apple Silicon đã có DMG được kiểm tra từ lượt đầu. Intel đã xây và mở bundle, nhưng hdiutil báo ổ đĩa bận. Lượt kế tiếp bổ sung ZIP và thử lại ảnh đĩa.
- Gói V0.1 chưa có Developer ID và notarization. Phạm vi chức năng theo RUN_DESKTOP.md.
