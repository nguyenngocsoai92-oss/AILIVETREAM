# Kiểm thử và nghiệm thu

| Nhóm | Ca bắt buộc | Bằng chứng |
|---|---|---|
| Unit domain | Hai tài khoản, trùng tên khác giá, câu hỏi mơ hồ, vừa đổi giá, hết hàng, ý định/FAQ, role thiếu quyền | Assertions trên kết quả và dữ liệu nguồn |
| Database/migration | DB mới/cũ, lỗi migration, đồng bộ trùng, nhập đồng thời, khôi phục backup và kiểm tra integrity | Fixture đã lọc, checksum, test rollback |
| Integration/API contract | 429, token hết hạn/thu hồi, lỗi mạng, thay đổi schema, webhook trùng, timeout gửi, OBS mất kết nối | Log đã che bí mật, receipt, kiểm tra idempotency |
| AI và bảo mật | Model timeout, ngưỡng ngân sách, prompt injection từ bình luận hoặc tệp, vượt account scope, giả mạo IPC, stop trong job đang chạy và restart | Không rò dữ liệu/không mở rộng quyền, audit và kết quả fallback |
| E2E và UI | Setup → chọn nguồn → chuẩn bị → nhập bình luận → duyệt → chép/gửi → kết phiên → báo cáo. Trạng thái rỗng, lỗi, mất kết nối, bàn phím và màn hình phụ | Playwright hoặc automation desktop, ảnh/log theo build |
| Commerce | Đơn về muộn, hoàn/hủy, hoa hồng điều chỉnh, thiếu attribution | Dataset đối soát và tổng độc lập |
| Hiệu năng/phục hồi | Đo hàng đợi dưới burst, SSD, CPU/RAM, latency và tắt app giữa batch | Ghi cấu hình máy thật, p95 và backlog. Chốt ngưỡng dựa trên tần suất LIVE pilot trước nghiệm thu |
| Native và live thật | Cài và cập nhật trên macOS/Windows đã chọn; OBS thật; một phiên VN cho từng nền tảng đã cấp quyền | Build/hash, OS/arch, cửa sổ test, account ID đã che, capability, kết quả và người xác nhận |

Release cần các ca áp dụng đều pass, người vận hành xác nhận runbook và quy trình dừng/phục hồi. Tách kết quả fixture, tài khoản thật và production.
