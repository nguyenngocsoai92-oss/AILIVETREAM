# Quyết định kiến trúc

| Mã | Đề xuất | Lý do và điều kiện xem lại |
|---|---|---|
| ADR-001 | Electron/React/TS, Node trong main, SQLite, repo npm workspaces | Theo đặc tả, vận hành một máy, không cần backend riêng cho V0.1. So sánh driver SQLite theo Electron ABI và bộ cài native. |
| ADR-002 | Import CSV và vận hành thủ công đi trước kết nối chính thức | Pilot có thể chạy khi quyền LIVE chưa rõ. Dữ liệu mẫu và nguồn thật có nhãn riêng. |
| ADR-003 | ERP chỉ đọc qua hợp đồng riêng | Chờ chủ hệ thống cung cấp sandbox, đặc tả, tài khoản và quota. |
| ADR-004 | Khóa phạm vi theo tài khoản, listing và bằng chứng | Giữ giá/voucher đúng nguồn trong Mixed và giúp truy vết phản hồi. |
| ADR-005 | Hoãn server, PostgreSQL và app secret tới mốc cần | Chốt khi OAuth, webhook hoặc yêu cầu đồng bộ bắt buộc. Chi phí và môi trường triển khai cần chủ dự án duyệt. |
| ADR-006 | Kiểm tra ký, kiến trúc và OS native trước chốt phát hành | Đề xuất pilot macOS arm64 và Windows x64, xác nhận nhu cầu Intel Mac/Windows ARM trước khi chốt ma trận V1.0. |
