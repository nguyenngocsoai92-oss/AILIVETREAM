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


## Phát hành macOS có chữ ký Apple

- REL-02 — Đã thêm quy trình ký Developer ID, notarization, stapler và kiểm tra Gatekeeper cho Apple Silicon. Lượt kiểm thử GitHub Actions dừng ở bước kiểm tra cấu hình vì thiếu chứng chỉ.
- Kho cần GitHub Actions secrets MACOS_CERT_P12_BASE64, MACOS_CERT_PASSWORD, APPLE_ID, APPLE_TEAM_ID và APPLE_APP_PASSWORD trong môi trường macos-release. Chỉ người quản lý thông tin ký của SN Group nhập các giá trị.
- Chưa có DMG đã ký để phát hành. Các bản thử nghiệm cũ vẫn có thể bị Gatekeeper từ chối.


## Điều khiển OBS

- LIVE-02 — Đã thêm kết nối OBS WebSocket v5 trên cùng máy, đọc trạng thái, chuyển cảnh, bắt đầu và dừng phát có xác nhận.
- Ba bài kiểm thử Node, kiểm tra TypeScript và build đạt. Bài thử OBS dùng WebSocket giả lập. Chưa kiểm tra bằng OBS thật hoặc nền tảng thật.
- OAuth và đồng bộ TikTok Shop/Shopee, bình luận, AI và báo cáo chưa hoàn tất. Phát qua OBS cần cấu hình đích và quyền phát sẵn trong OBS.


## MC ảo tiếng Việt

- VOI-01/02 đang triển khai. Đã có nhân vật 2D, kịch bản lưu SQLite, hàng đợi đọc bằng macOS và cửa sổ hình/phụ đề riêng để chọn trong OBS.
- Kiểm tra TypeScript, build và bốn bài kiểm thử tự động đạt. Kiểm thử giọng đọc dùng tiến trình giả lập. Cần kiểm tra âm thanh trên Mac có giọng tiếng Việt và ghép nguồn hình/tiếng trong OBS.
- Tạm hoãn kết nối TikTok và Shopee theo yêu cầu chủ dự án. Bình luận, AI tư vấn tự động và báo cáo đầy đủ vẫn đang chờ.
