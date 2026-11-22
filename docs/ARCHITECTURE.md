# Kiến trúc đề xuất

## Luồng thực thi

Electron renderer chỉ gọi IPC định kiểu qua preload. Main kiểm tra nguồn IPC, schema và quyền tại từng handler. Main điều phối domain, SQLite, hàng đợi, token vault và OBS. Tắt Node integration trong renderer, bật context isolation, sandbox và CSP. Không nạp trang web bên ngoài vào cửa sổ có đặc quyền. Cửa sổ OBS overlay chỉ đọc nội dung hiển thị đã lọc, giới hạn localhost.

SQLite đặt trong thư mục dữ liệu ứng dụng, một tiến trình điều phối ghi, WAL, foreign keys và transaction cho thay đổi nhiều bảng. React hiển thị trạng thái từ domain. Model routing chọn rule/FAQ, Ollama hoặc OpenAI. Nguồn bên ngoài qua adapter. Chỉ bổ sung Node sync-server/PostgreSQL theo nhu cầu thực tế. App secret bắt buộc phía server giữ ở server. Desktop giữ thông tin người dùng theo khả năng OS vault, thiếu vault thì chặn lưu credential thay vì hạ cấp. n8n chỉ phù hợp tác vụ hậu kỳ có thể chạy lại, không nằm trên đường xử lý bình luận hoặc nút dừng.

## Ranh giới phân hệ

| Phân hệ | Trách nhiệm |
|---|---|
| Desktop, auth, security | IPC, cửa sổ, local login/RBAC, vault, audit, ký bộ cài và cập nhật |
| Database | Migration có phiên bản, transaction, backup nhất quán, restore có kiểm tra |
| Adapters | TikTok, Shopee, ERP, import thủ công. Chuẩn hóa dữ liệu, quyền, lỗi và provenance |
| Product Engine | Catalog, tìm kiếm, biến thể, mapping, lịch sử, eligibility, giá, tồn, tri thức và gợi ý bổ sung |
| Comment Engine | Hàng đợi, intent, chống trùng, ngữ cảnh, duyệt, gửi, reconciliation |
| AI Engine | Retrieval, KB đã duyệt, generation/validation, router, timeout, đo chi phí |
| Live, OBS, Script | State machine, preflight, cảnh/nguồn, overlay, kịch bản, phím tắt |
| Order, Analytics | Sổ đơn, đối soát, attribution, KPI, Excel/CSV và PDF nếu có nhu cầu |
| Automation, Voice | Điều phối trước/trong/sau LIVE, stop latch, TTS và MC theo cấp |

## Điểm phải giải quyết trong thiết kế

| Điểm cần xác minh | Quyết định đề xuất |
|---|---|
| Desktop và OAuth partner | Tách tài khoản nội bộ, xác thực Creator/Seller và quyền từng capability. Server tối thiểu nếu nền tảng yêu cầu ký bằng bí mật ứng dụng hoặc webhook công khai. |
| Tín hiệu LIVE | Lưu session business state, OBS status và platform confirmation riêng. Khi chỉ biết người vận hành báo đã phát, hiển thị “Xác nhận thủ công”, kèm người và thời điểm. |
| Approval thiếu quyền gửi | Sau khi duyệt, cung cấp bản chép. Chỉ tự ghi sent với xác nhận từ adapter. Dùng trạng thái riêng cho xác nhận gửi thủ công hoặc chưa biết sau timeout. |
| Shared product identity | Mapping nối biến thể ERP với listing cụ thể, yêu cầu phê duyệt. Snapshot giá và tồn gắn listing, tài khoản và thời điểm. |
| Hạn mức và độ tin cậy | Lưu hạn mức theo endpoint, market và tài khoản từ tài liệu/quyền. Tôn trọng Retry-After, backoff, circuit breaker. Với thao tác gửi không có idempotency phía sàn, timeout sau khi gửi dẫn tới đối soát thủ công thay vì tự gửi lại. |
| Dừng giữa thao tác | Stop latch lưu bền, chặn job mới và retry, hủy việc đang chờ và phát tín hiệu hủy cho tác vụ đang chạy. Kết quả không rõ được đối soát. Sau restart phải chủ động mở lại. |
| VPS 8 GB | Chờ khảo sát tài nguyên, dịch vụ, tải, backup và môi trường staging. Chưa xếp Ollama hay PostgreSQL lên VPS ERP. |
| Thiếu quyền analytics | Giữ chỉ tiêu thiếu dữ liệu ở trạng thái unknown. Ghi riêng số liệu API, tệp có đối soát và nguồn thủ công. |
| Cài đặt đa nền tảng | Chạy CI native theo hệ điều hành và kiến trúc đã chốt. Ký Windows, ký và notarize macOS trước phát hành. |

## Luồng phản hồi

Comment → chuẩn hóa/chống trùng → intent → chọn sản phẩm → truy xuất snapshot/KB → dựng câu trả lời → xác thực từng dữ kiện → duyệt → gửi hoặc chép → audit. Bình luận và KB nhập vào là dữ liệu không tin cậy. Không cấp cho LLM quyền gửi hay ghi ERP. Trước duyệt/gửi kiểm tra phiên, quyền, stop latch và hiệu lực phiên bản giá/KB. Dùng rule hoặc mẫu khi AI lỗi. Đo token và chi phí từng lần gọi, giới hạn context và ngân sách từng phiên.
