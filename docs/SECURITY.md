# Bảo mật và vận hành

RBAC tại main/server cho từng tác vụ, session nội bộ hết hạn và thu hồi được. Hash mật khẩu bằng KDF có salt và giới hạn thử đăng nhập. Dùng OAuth/cơ chế ký chính thức theo từng nền tảng, kiểm tra callback để chống CSRF và giới hạn redirect. Secret/token ở OS vault hoặc server vault, che log và crash report. TLS ngoài loopback. Kiểm tra ID account, session và nguồn trong mỗi truy vấn nghiệp vụ.

Giảm PII gửi AI, lưu theo chính sách SN, hạn chế quyền đọc dữ liệu tài chính. Dữ liệu nhạy cảm được mã hóa theo threat model desktop; SQLite cần lựa chọn lớp/driver mã hóa có kiểm thử native. Backup nhất quán và mã hóa, kiểm tra integrity/migration trước khi restore, giữ bản gốc phục hồi đến khi xác minh. Ghi audit cho thao tác quyền, duyệt, gửi, import, dừng và restore.

Cập nhật chỉ nhận artefact đã ký, xác minh chữ ký trước cài. Thử nâng version với DB cũ và phương án phục hồi khi migration thất bại. Khóa dependency, kiểm tra phụ thuộc và secret trong CI. Tách staging/production và quyền chỉ đọc ERP ở pilot.
