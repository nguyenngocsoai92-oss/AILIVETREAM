# Master Checklist

P0 chặn mốc liên quan. P1 hoàn thiện vận hành trong mốc. Mọi hạng mục triển khai đang Not Started. Ghi nhận trạng thái theo từng mã trong PROGRESS. V0.4 có thể chạy song song với phần OBS của V0.5 sau khi hợp đồng domain ổn định. Thời lượng chưa ước tính vì thiếu phạm vi tài khoản, máy kiểm thử và quyền đối tác.

| Mốc / ID | Ưu tiên | Phụ thuộc | Việc và tiêu chí nghiệm thu |
|---|---|---|---|
| V0.1 FND-01 | P0 | Kho mã do SN quản lý | Electron/React/TS, workspace, preload IPC. Cài dependency từ lockfile và build sạch. App mở, thoát, mở lại, dùng đường dẫn dữ liệu đúng OS. |
| V0.1 FND-02 | P0 | FND-01 | SQLite, migration, cấu hình bền vững, xử lý lỗi, log đã lọc. Test DB trống, DB cũ và lỗi giữa migration. |
| V0.1 FND-03 | P0 | FND-02 | Setup admin lần đầu, đăng nhập, RBAC, session, thu hồi và audit. Người thiếu quyền bị chặn cả khi gọi IPC trực tiếp. |
| V0.1 FND-04 | P1 | FND-03 | Màn hình quản trị, nhật ký, cài đặt, theme, trạng thái chức năng và lưu cấu hình sau restart. |
| V0.1 FND-05 | P0 | FND-01..04 | CI lint/typecheck/unit/integration/build và smoke app trên macOS/Windows. Ghi artifact, commit và log. |
| V0.2 PRD-01 | P0 | FND-02..03 | Catalog, variants, snapshot, search, lịch sử. Chứng minh hai tài khoản trùng tên/SKU vẫn giữ đúng nguồn và giá. |
| V0.2 PRD-02 | P0 | PRD-01 | Import CSV và Affiliate fixture có nhãn, validate, preview và rollback. Reimport không tạo bản ghi trùng. |
| V0.2 PRD-03 | P0 | PRD-01 | Mapping, eligibility, ba chế độ nguồn. Mixed chỉ chốt qua listing hợp lệ đúng kênh. |
| V0.2 PRD-04 | P1 | PRD-01, khảo sát ERP | Adapter chỉ đọc, contract test, phân trang, cursor và xử lý schema lỗi. Kiểm tra sandbox trước bật kết nối thật. |
| V0.3 AI-01 | P0 | PRD-01..03 | Intake thủ công, intent theo đặc tả, chống trùng và phân giải sản phẩm trong phiên. Câu mơ hồ trả câu hỏi xác nhận. |
| V0.3 AI-02 | P0 | AI-01 | KB version/duyệt, truy xuất theo scope, guardrail chống prompt injection, giá/tồn hết hạn và fallback nhân viên. |
| V0.3 AI-03 | P0 | AI-02 | Manual/Approval, duyệt, chép, audit và dừng. Giá đổi sau khi soạn thì yêu cầu xem lại. |
| V0.3 AI-04 | P1 | AI-02 | Rule/FAQ, OpenAI/Ollama qua interface, context nhỏ, timeout, theo dõi token/chi phí và giới hạn ngân sách. Thử lỗi model và hết ngân sách. |
| V0.4 INT-01 | P0 | Tài khoản test VN | Xin quyền theo từng capability và cập nhật ma trận. Kiểm tra Creator/Seller, quota, chính sách automation/Voice/MC. |
| V0.4 INT-02 | P0 | INT-01, FND-03 | Auth/vault, scope, refresh và thu hồi đúng tài khoản. Token hết hạn và thiếu scope phải có trạng thái rõ. |
| V0.4 INT-03 | P0 | INT-02, PRD-01 | Đồng bộ Affiliate chính thức theo phần được cấp, cursor, retry và không lẫn tài khoản. So khớp với tài khoản thật. |
| V0.4 INT-04 | P1 | INT-02, AI-03 | Ingest/gửi bình luận khi được phép, hạn mức, chống gửi lặp, đối soát timeout. Controlled Auto chỉ bật theo quyền và nghiệm thu. |
| V0.5 LIVE-01 | P0 | PRD-03, AI-03 | Session state machine, preflight, tách OBS/platform/user confirmation, lưu lịch sử và phục hồi sau mất mạng. |
| V0.5 LIVE-02 | P0 | LIVE-01 | OBS cảnh/source/media/âm thanh, trạng thái, overlay giá đã xác minh. Test ngắt OBS giữa phiên và kết nối lại. |
| V0.5 LIVE-03 | P0 | LIVE-01 | Script theo sản phẩm/nhóm/thời gian, sửa, lưu phiên bản, duyệt, AI draft, chuyển sản phẩm. |
| V0.5 LIVE-04 | P1 | LIVE-02..03 | Điều phối trước/trong/sau phiên, Compact, Always-on-top, màn hình phụ, phím tắt, timer và nút dừng. Dừng hàng đợi kiểm tra qua restart. |
| V0.6 COM-01 | P0 | LIVE-01, dữ liệu đã duyệt | Nhập/sync đơn Seller/SN và Affiliate. Thử đơn đến muộn, hoàn, hủy, điều chỉnh và replay. |
| V0.6 COM-02 | P0 | COM-01 | Đối soát hoa hồng, trạng thái dự kiến/đủ điều kiện/thực nhận, attribution có bằng chứng. |
| V0.6 COM-03 | P1 | COM-01..02, AI-04 | Dashboard/Excel/CSV, lọc phiên/tài khoản/sản phẩm và xu hướng. Số liệu thiếu hiển thị chưa có dữ liệu, tổng khớp mẫu đối soát. |
| V1.0 REL-01 | P0 | FND-05, LIVE-04, COM-03 | Threat model, hardening, bảo mật IPC/PII, backup/restore, nâng version và rollback. Thử trên DB tương đương pilot. |
| V1.0 REL-02 | P0 | REL-01, quyền ký | Bộ cài macOS/Windows theo ma trận đã duyệt, ký và cập nhật an toàn. Thử cài mới, nâng cấp và chạy offline. |
| V1.0 REL-03 | P0 | REL-02, TEST_PLAN | Pilot tài khoản thật, đánh giá phiên thủ công và từng API được cấp, nhật ký lỗi, hướng dẫn vận hành, ký nghiệm thu SN. Phạm vi release ghi rõ từng capability đã Verified. |
| V2.0 VOI-01 | P1 | LIVE-04 | TTS nội bộ qua tai nghe, queue, pause/resume, đo độ trễ và stop. |
| V2.0 VOI-02 | P1 | VOI-01, INT-01 | TTS công khai/MC ảo có quyền, audio routing, avatar, lipsync, moderation và dừng OBS. |
| V2.0 SCALE-01 | P1 | REL-03 và nhu cầu thực | Đồng bộ nhiều máy/phiên, PostgreSQL khi cần, test cô lập tenant và conflict. |
