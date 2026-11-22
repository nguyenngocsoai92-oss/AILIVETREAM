# Hướng dẫn làm việc với SN AI LIVE STUDIO

- Bắt đầu với docs/PROGRESS.md, tài liệu module và các file liên quan. Đối chiếu docs/MASTER_SPEC.md khi cần xác nhận phạm vi.
- Dùng tiếng Việt cho giao diện và tài liệu nghiệp vụ. Dùng tiếng Anh cho mã nguồn và API.
- Khảo sát mã hiện có trước khi sửa. Mỗi nhiệm vụ dùng một ID trong docs/MASTER_CHECKLIST.md.
- Chỉ dùng API chính thức. Giữ fixture và kết nối thật có trạng thái riêng. Yêu cầu bằng chứng và quyền thực tế trước khi bật capability.
- Mặc định chỉ đọc ERP khi đã có hợp đồng API và quyền. Mọi thay đổi dữ liệu ERP, phát hành hoặc triển khai production cần phê duyệt.
- Chạy lint, typecheck, test và build phù hợp. Ghi môi trường, lệnh, kết quả và phần chưa kiểm chứng trong PROGRESS. Ghi quyết định quan trọng trong DECISIONS.
- Giữ secret ngoài mã nguồn, log, fixture và ảnh màn hình. Ghi nhật ký đã lọc cho tác vụ gửi, đổi quyền, đồng bộ và dừng khẩn cấp.
