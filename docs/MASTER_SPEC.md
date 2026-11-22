# MASTER PROMPT – XÂY DỰNG PHẦN MỀM SN AI LIVE STUDIO

**Tên dự án:** SN AI LIVE STUDIO  
**Chủ sở hữu:** SN Group  
**Phiên bản tài liệu:** Master Specification 1.0  
**Nền tảng:** macOS + Windows  
**Mục tiêu:** Phát triển phần mềm AI Livestream Commerce có khả năng triển khai và vận hành thực tế, phục vụ livestream bán hàng trên TikTok Shop, Shopee Live và mở rộng các nền tảng khác.

---

# PHẦN 1. VAI TRÒ CỦA BẠN

Bạn là đội ngũ phát triển phần mềm cao cấp, gồm các vai trò:

1. Chief Technology Officer (CTO).
2. Software Solution Architect.
3. Senior Full-stack Developer.
4. Desktop Application Engineer.
5. AI/LLM Engineer.
6. TikTok Shop & Shopee Integration Engineer.
7. E-commerce & Affiliate Commerce Specialist.
8. Database Architect.
9. UI/UX Designer.
10. Cybersecurity Engineer.
11. QA Automation Engineer.
12. DevOps Engineer.
13. Product Owner/Business Analyst.

Bạn phải phối hợp các chuyên môn trên để xây dựng một sản phẩm thống nhất, thay vì tạo ra những module rời rạc không kết nối được.

Tôi là chủ sở hữu dự án, phụ trách định hướng sản phẩm và phê duyệt những thay đổi quan trọng.

**Yêu cầu tuyệt đối:**

- Không chỉ phân tích ý tưởng. Phải chuyển yêu cầu thành thiết kế, mã nguồn, kiểm thử và sản phẩm hoạt động.
- Không viết phần mềm chỉ có giao diện demo.
- Không tạo chức năng giả nhưng thể hiện như đã kết nối thật.
- Không tự tuyên bố hoàn thành tính năng nếu chưa kiểm thử.
- Không tự sửa/xóa hệ thống ERP SN hiện tại.
- Không bỏ sót yêu cầu hoặc âm thầm thay đổi phạm vi.
- Không tự ý triển khai production khi chưa đủ điều kiện.
- Không đưa ra cam kết vượt quá khả năng công cụ, quyền truy cập hoặc API thực tế.
- Sử dụng tiếng Việt trong giao tiếp, chú thích nghiệp vụ và giao diện người dùng. Dùng tiếng Anh cho tên biến, API và cấu trúc mã nguồn.

# PHẦN 2. MÔ TẢ DỰ ÁN

Tôi muốn sở hữu một phần mềm AI Livestream Commerce mang tên:

**SN AI LIVE STUDIO**

Phần mềm cài trực tiếp trên máy tính MacBook/macOS hoặc Windows, phục vụ hoạt động livestream bán hàng trên TikTok Shop và Shopee Live.

Phần mềm cần có khả năng:

- Quản lý nhiều tài khoản livestream.
- Quản lý sản phẩm của từng tài khoản.
- Đồng bộ sản phẩm Affiliate của tài khoản đang LIVE.
- Đồng bộ kho sản phẩm từ website/ERP SN Group.
- Cho phép chọn một hoặc kết hợp hai nguồn sản phẩm.
- Quản lý danh sách sản phẩm trong mỗi phiên LIVE.
- Nhận, phân tích và phân loại bình luận khách hàng theo khả năng tích hợp được cấp quyền.
- Sử dụng AI để tư vấn và giới thiệu sản phẩm.
- Đề xuất hoặc gửi câu trả lời tự động khi nền tảng cho phép.
- Điều khiển OBS Studio.
- Tạo và điều phối kịch bản bán hàng.
- Hỗ trợ giọng nói AI và nhân vật MC ảo trong những môi trường được phép.
- Theo dõi đơn hàng, doanh thu, hoa hồng Affiliate.
- Lập báo cáo và phân tích hiệu quả livestream.
- Có cơ chế vận hành thủ công khi API của nền tảng chưa hỗ trợ.
- Mở rộng nhiều tài khoản, nhiều người dùng và nhiều phiên LIVE về sau.

Mục tiêu là tạo ra một công cụ bán hàng chuyên nghiệp, dễ sử dụng, có khả năng tự động hóa cao và tiết kiệm chi phí vận hành lâu dài.

# PHẦN 3. PHẠM VI HẠ TẦNG VÀ CÔNG NGHỆ

## 3.1. Kiến trúc ưu tiên

Thiết kế theo mô hình:

**Desktop Application + Local AI/Cloud AI + Platform Connectors + SN ERP Integration**

Định hướng công nghệ:

- Electron + React + TypeScript cho giao diện desktop.
- Node.js + TypeScript cho backend.
- SQLite cho dữ liệu cục bộ.
- PostgreSQL cho dữ liệu đồng bộ trên server nếu cần.
- OpenAI API cho tác vụ AI cần chất lượng cao.
- Ollama cho AI local khi máy có đủ tài nguyên.
- OBS Studio + WebSocket để điều khiển cảnh livestream.
- n8n cho các quy trình automation phụ trợ khi phù hợp.
- REST API/WebSocket cho giao tiếp dữ liệu.
- OAuth và cơ chế cấp quyền chính thức cho tài khoản nền tảng.
- Git/GitHub để quản lý mã nguồn.
- Unit test, integration test và end-to-end test.

Có thể đề xuất thay đổi công nghệ nếu chứng minh được lợi ích về hiệu năng, bảo mật, khả năng bảo trì hoặc chi phí. Không thay đổi chỉ vì sở thích công nghệ.

## 3.2. Môi trường vận hành

Ứng dụng phải hỗ trợ:

- macOS với bộ cài phù hợp kiến trúc máy.
- Windows với bộ cài phù hợp.
- Sử dụng 1 tài khoản LIVE trên 1 máy trong giai đoạn đầu.
- Có thiết kế mở rộng nhiều phiên LIVE và nhiều máy.
- Hỗ trợ màn hình phụ.
- Chế độ Always-on-top và Compact Mode.
- Chế độ sáng/tối.
- Điều khiển bằng phím tắt.

## 3.3. Hạ tầng SN Group

SN Group đã có website/ERP bán hàng và VPS khoảng 8 GB RAM.

Website thương mại điện tử:

`https://vanphongphamsn.com`

Website doanh nghiệp:

`https://sngroup.vn`

Phần mềm cần tích hợp ERP SN thông qua API độc lập.

Tuyệt đối không giả định ERP đang có sẵn endpoint, cấu trúc database hoặc phương thức xác thực cụ thể. Phải khảo sát trước khi kết nối.

Không thay đổi bảng dữ liệu, chức năng, website hoặc quy trình đang chạy nếu chưa được phê duyệt.

# PHẦN 4. HAI LUỒNG NGUỒN SẢN PHẨM

Đây là yêu cầu nghiệp vụ cốt lõi.

## 4.1. Luồng A – Kho Affiliate của tài khoản livestream

Mỗi tài khoản TikTok/Shopee có nguồn sản phẩm Affiliate riêng.

Khi lựa chọn tài khoản livestream, phần mềm phải xác định đúng dữ liệu thuộc tài khoản đó.

Các thông tin cần quản lý khi nguồn dữ liệu được cấp quyền:

- Nền tảng.
- Tài khoản Creator/Affiliate.
- ID sản phẩm.
- Seller/Shop.
- Tên sản phẩm.
- SKU và biến thể.
- Hình ảnh/video.
- Danh mục.
- Mô tả.
- Thông số kỹ thuật.
- Giá bán và giá gốc.
- Giá khuyến mại.
- Voucher.
- Hoa hồng dự kiến.
- Tồn kho hoặc tình trạng có thể mua.
- Link mua hàng.
- Trạng thái hợp lệ để quảng bá.
- Trạng thái sản phẩm trong danh sách LIVE/livebag nếu API hỗ trợ.
- Lần đồng bộ gần nhất.
- Nguồn dữ liệu và trạng thái xác minh.

Không tự giả định giá, hoa hồng hoặc tồn kho nếu nền tảng không cung cấp.

Không dùng dữ liệu Affiliate của tài khoản A để bán dưới tài khoản B khi thiếu quyền hợp lệ.

## 4.2. Luồng B – Kho sản phẩm SN Group

Đồng bộ từ website/ERP SN Group.

Các dữ liệu cần quản lý:

- Mã sản phẩm.
- SKU/biến thể.
- Tên sản phẩm.
- Danh mục.
- Thương hiệu.
- Hình ảnh.
- Mô tả.
- Giá bán.
- Giá vốn nếu được phân quyền.
- Tồn kho.
- Phân loại chất lượng.
- Đơn vị tính.
- Thuộc tính sản phẩm.
- Khuyến mại.
- Trạng thái kinh doanh.
- Thông tin bảo hành, đổi trả.
- Link sản phẩm và kênh bán hợp lệ.
- Dữ liệu vận chuyển khi có.

Ưu tiên hỗ trợ danh mục văn phòng phẩm, giấy in văn phòng, giấy in nhiệt, bút viết, sổ, dụng cụ văn phòng và các mặt hàng bổ sung về sau.

## 4.3. Luồng C – Kết hợp

Phần mềm có ba chế độ lựa chọn:

1. Affiliate Only.
2. SN ERP Only.
3. Mixed Mode.

Trong Mixed Mode, hệ thống được phép hiển thị và tư vấn cả hai nguồn, nhưng phải tách biệt rõ nguồn hàng, giá, kênh bán và cách chốt đơn.

Không được tự dẫn khách ra ngoài TikTok/Shopee nếu trái chính sách nền tảng.

Sản phẩm từ ERP SN chỉ có thể bán trực tiếp trong giỏ hàng của sàn khi đã có listing hợp lệ trên sàn và quyền liên kết tương ứng.

## 4.4. Product Engine

Xây một Product Engine độc lập gồm:

- Product Catalog.
- Product Search.
- Product Mapping.
- Product Variant.
- Price Snapshot.
- Stock Status.
- Affiliate Commission.
- Product Eligibility.
- Product Recommendation.
- Cross-sell/Upsell.
- Product Knowledge.
- Product Sync.
- Product History.

Hệ thống phải xử lý tình huống cùng một sản phẩm xuất hiện trên nhiều nền tảng nhưng có giá, SKU hoặc chương trình khuyến mại khác nhau.

Không dùng chung dữ liệu giá nếu chưa có cơ chế ánh xạ và xác nhận.

# PHẦN 5. QUẢN LÝ TÀI KHOẢN VÀ PHIÊN LIVE

## 5.1. Tài khoản

- Thêm tài khoản TikTok.
- Thêm tài khoản Shopee.
- Quản lý tài khoản Creator/Seller đúng vai trò.
- Liên kết bằng API chính thức.
- Hiển thị phạm vi quyền đã cấp.
- Theo dõi tình trạng kết nối.
- Cảnh báo token hết hạn.
- Ngắt kết nối an toàn.
- Phân quyền nhân viên.
- Tách dữ liệu theo tài khoản.

## 5.2. Phiên livestream

Mỗi phiên LIVE phải có:

- Mã phiên.
- Tài khoản.
- Nền tảng.
- Người vận hành.
- Thời gian bắt đầu.
- Thời gian kết thúc.
- Trạng thái kết nối.
- Nguồn sản phẩm.
- Danh sách sản phẩm.
- Sản phẩm đang giới thiệu.
- Cấu hình AI.
- Kịch bản.
- Thống kê.
- Lịch sử sự kiện.

Các trạng thái:

`Draft → Ready → Connecting → Live → Paused → Ended`

Thêm `Disconnected`, `Failed` và cơ chế phục hồi.

Không được tự nhận phiên đã LIVE chỉ vì OBS đã khởi động. Phải phân biệt trạng thái nguồn phát và trạng thái xác nhận từ nền tảng.

## 5.3. Kiểm tra trước LIVE

Xây Pre-live Checklist:

- Tài khoản đúng.
- Quyền API hợp lệ.
- Sản phẩm hợp lệ.
- Giá được xác minh.
- Kịch bản sẵn sàng.
- AI đã cấu hình.
- OBS kết nối thành công.
- Camera/micro sẵn sàng.
- Mạng ổn định.
- Nút dừng khẩn cấp hoạt động.

# PHẦN 6. AI COMMENT CENTER

Đây là trung tâm xử lý bình luận thời gian thực.

Phần mềm nhận bình luận từ nguồn dữ liệu chính thức được phép.

Giao diện có:

- Bình luận mới.
- Câu hỏi cần ưu tiên.
- Câu hỏi chưa xử lý.
- Câu trả lời AI đề xuất.
- Câu trả lời chờ duyệt.
- Câu đã gửi.
- Lỗi gửi và lịch sử phản hồi.

## 6.1. Phân loại bình luận

AI phải nhận diện tối thiểu:

- Hỏi giá.
- Hỏi tồn kho.
- Hỏi kích thước/màu sắc.
- Hỏi đặc tính sản phẩm.
- Hỏi cách sử dụng.
- Hỏi bảo hành.
- Hỏi đổi trả.
- Hỏi phí vận chuyển.
- Hỏi voucher/khuyến mại.
- Hỏi cách mua.
- So sánh sản phẩm.
- Mua số lượng lớn.
- Khiếu nại.
- Câu hỏi ngoài chủ đề.
- Spam.
- Nội dung nhạy cảm.
- Câu hỏi không xác định được sản phẩm.

## 6.2. Xác định ngữ cảnh

AI cần hiểu:

- Sản phẩm đang ghim, nếu nguồn tích hợp cho phép biết.
- Sản phẩm đang được người dẫn giới thiệu.
- Sản phẩm vừa giới thiệu trước đó.
- Tên hoặc mã sản phẩm khách nhắc đến.
- Câu hỏi trước đó của khách trong phạm vi phiên.
- Các biến thể đang có.

Nếu khách hỏi “Loại kia bao nhiêu?” mà không xác định được sản phẩm thì phải hỏi lại, tuyệt đối không đoán.

## 6.3. Ba chế độ phản hồi

**Manual:** AI chỉ soạn câu trả lời.

**Approval:** AI soạn, nhân viên duyệt và gửi qua cơ chế được phép.

**Controlled Auto:** AI tự gửi một số nhóm phản hồi được cho phép, có giới hạn tốc độ và kiểm soát chất lượng.

Mặc định sử dụng Approval Mode.

Auto Mode chỉ được bật sau khi đã xác nhận quyền API, chính sách nền tảng và kết quả kiểm thử.

## 6.4. Cơ chế xử lý

- Hàng đợi bình luận.
- Chống trùng.
- Ưu tiên khách có ý định mua.
- Rate limiting.
- Retry an toàn.
- Idempotency.
- Timeout.
- Circuit breaker.
- Chuyển cho nhân viên khi AI không chắc chắn.
- Lưu nhật ký.
- Dừng AI tức thời.

Không xây tính năng spam bình luận, thao túng tương tác hoặc sử dụng biện pháp vượt cơ chế kiểm soát của nền tảng.

# PHẦN 7. AI SALES AGENT

AI phải hoạt động như nhân viên bán hàng hiểu sản phẩm, không phải chatbot trả lời chung chung.

Các chức năng:

1. Tra cứu sản phẩm.
2. Tư vấn đặc điểm và công dụng.
3. So sánh sản phẩm.
4. Đề xuất sản phẩm thay thế.
5. Bán kèm.
6. Giải đáp thắc mắc.
7. Hướng dẫn mua hàng.
8. Tóm tắt thông số kỹ thuật.
9. Hỗ trợ xử lý khiếu nại ban đầu.
10. Chuyển câu hỏi khó cho người vận hành.
11. Tạo lời giới thiệu sản phẩm.
12. Tạo nội dung bán hàng theo kịch bản.
13. Học từ cơ sở tri thức đã được duyệt.
14. Phân tích những câu hỏi phổ biến.

## 7.1. Cơ chế RAG / Tool Calling

Ưu tiên kiến trúc:

`Comment → Intent Detection → Product Resolution → Data Retrieval → AI Generation → Validation → Approval/Send → Audit Log`

AI phải lấy dữ liệu sản phẩm thật qua tool hoặc database.

Không tự tạo dữ liệu kinh doanh từ trí nhớ mô hình.

Các trường quan trọng như giá, khuyến mại, số lượng tồn, hoa hồng và điều kiện bảo hành phải có nguồn được xác minh và thời gian hiệu lực.

## 7.2. Knowledge Base

Quản lý:

- Chính sách bán hàng.
- Chính sách vận chuyển.
- Đổi trả.
- Bảo hành.
- Hướng dẫn sử dụng.
- Câu hỏi thường gặp.
- Kịch bản tư vấn.
- Thông tin sản phẩm.
- Những nội dung không được AI cam kết.

Knowledge Base có version và người phê duyệt.

## 7.3. AI Safety Rules

AI không được:

- Bịa giá hoặc khuyến mại.
- Bịa tồn kho.
- Bịa hoa hồng.
- Tạo đánh giá giả.
- Đưa ra tuyên bố sản phẩm không có căn cứ.
- Công khai dữ liệu cá nhân.
- Xác nhận đơn chưa thành công.
- Cam kết vượt chính sách.
- Gửi nội dung hàng loạt gây spam.
- Bỏ qua quyền API và giới hạn nền tảng.

Các hành động có tác động tài chính hoặc công khai phải sử dụng guardrail và quyền phê duyệt phù hợp.

# PHẦN 8. AI VOICE VÀ MC ẢO

Thiết kế thành phân hệ độc lập, không làm phụ thuộc toàn bộ phần mềm.

Ba cấp độ:

**Cấp 1 – Internal Voice Assistant**

AI đọc bình luận hoặc lời gợi ý qua tai nghe cho người vận hành.

**Cấp 2 – AI Voice Output**

AI chuyển lời giới thiệu sản phẩm thành giọng nói để phát trên những kênh được phép.

**Cấp 3 – Virtual AI Host**

Nhân vật MC ảo có hình ảnh, biểu cảm, khẩu hình, lời nói, điều phối sản phẩm và phản hồi dựa trên dữ liệu thực.

Yêu cầu kỹ thuật:

- TTS.
- Voice Queue.
- Audio Routing.
- Avatar Rendering.
- Lip-sync.
- Text/Voice Moderation.
- Pause/Resume.
- Emergency Stop.
- OBS Integration.
- Latency Monitoring.

Tuyệt đối không mặc định TikTok/Shopee cho phép MC ảo tự phát nội dung. Phải kiểm tra chính sách hiện hành theo khu vực, tài khoản và hình thức sử dụng trước khi kích hoạt.

Không sử dụng giọng nói hoặc hình ảnh mô phỏng người thật khi chưa có quyền hợp lệ.

# PHẦN 9. OBS STUDIO VÀ LIVE CONTROL

Ứng dụng cần tích hợp OBS qua giao diện điều khiển được hỗ trợ.

Chức năng:

- Kết nối OBS.
- Hiển thị trạng thái OBS.
- Chuyển cảnh.
- Quản lý scene/source được cấp quyền.
- Hiển thị tên sản phẩm.
- Hiển thị giá đã xác minh.
- Hiển thị hình ảnh sản phẩm.
- Điều khiển banner.
- Điều khiển media.
- Quản lý âm thanh cơ bản.
- Bộ đếm thời gian.
- Phím tắt.
- Chế độ overlay.
- Kiểm tra trạng thái stream.

Không trộn lẫn trạng thái OBS với trạng thái phát thành công trên TikTok/Shopee.

# PHẦN 10. SCRIPT ENGINE – KỊCH BẢN LIVESTREAM

Xây hệ thống kịch bản có thể tùy chỉnh:

1. Chào mở đầu.
2. Giới thiệu thương hiệu.
3. Giới thiệu sản phẩm.
4. Thông số và lợi ích.
5. Hướng dẫn sử dụng.
6. So sánh.
7. Trình bày ưu đãi hợp lệ.
8. Hướng dẫn mua hàng.
9. Xử lý câu hỏi.
10. Chuyển sản phẩm.
11. Tổng kết.
12. Kết thúc livestream.

Cho phép:

- Kịch bản theo sản phẩm.
- Kịch bản theo nhóm sản phẩm.
- Kịch bản theo thời gian.
- Kịch bản do AI tạo.
- Người vận hành chỉnh sửa.
- Lưu version.
- Đánh dấu nội dung đã được duyệt.
- Chuyển sản phẩm bằng thao tác thủ công hoặc automation đã được phép.

# PHẦN 11. ĐƠN HÀNG, AFFILIATE VÀ HOA HỒNG

Phải phân biệt hai nghiệp vụ.

## 11.1. Affiliate

Theo dõi khi dữ liệu được cấp quyền:

- Sản phẩm giới thiệu.
- Link hoặc điểm mua.
- Đơn hàng ghi nhận.
- Giá trị đơn.
- Tình trạng đơn.
- Hoàn/hủy.
- Hoa hồng dự kiến.
- Hoa hồng đủ điều kiện.
- Hoa hồng thực nhận.
- Ngày đối soát.

Không suy diễn doanh thu chỉ từ số lượt xem hoặc bình luận.

## 11.2. Sản phẩm SN Group

Đồng bộ với ERP:

- Đơn hàng.
- Chi tiết mặt hàng.
- Khách hàng theo dữ liệu được phép.
- Thanh toán.
- Trạng thái xuất kho.
- Giao hàng.
- Hoàn trả.
- Công nợ nếu thuộc phạm vi ERP.
- Doanh thu.

Không để phần mềm livestream tự ghi đè dữ liệu kế toán, kho hoặc đơn hàng khi chưa có API nghiệp vụ và quyền tương ứng.

# PHẦN 12. DASHBOARD, KPI VÀ BÁO CÁO

Thiết kế dashboard gồm:

- Tổng số phiên LIVE.
- Tổng thời gian LIVE.
- Tài khoản đang hoạt động.
- Số sản phẩm đã giới thiệu.
- Bình luận nhận được.
- Bình luận xử lý.
- Thời gian phản hồi.
- Tỷ lệ phản hồi thành công.
- Lượt tương tác.
- Sản phẩm được quan tâm.
- Sản phẩm chuyển đổi tốt.
- Doanh thu được xác minh.
- Hoa hồng được xác minh.
- Chi phí AI.
- Hiệu quả theo phiên/tài khoản/sản phẩm.
- Tỷ lệ AI phải chuyển cho nhân viên.
- Lỗi API.
- Xu hướng theo ngày, tuần, tháng.

Chỉ hiển thị KPI khi có nguồn dữ liệu đáng tin cậy.

Các chỉ tiêu chưa được API cung cấp phải được đánh dấu là không có dữ liệu, không tự suy đoán.

Xuất báo cáo Excel/CSV, và PDF nếu cần.

# PHẦN 13. AUTOMATION ENGINE

Các quy trình:

**Trước livestream:**

- Kiểm tra tài khoản.
- Kiểm tra token.
- Đồng bộ sản phẩm.
- Kiểm tra giá và trạng thái hàng.
- Chuẩn bị kịch bản.
- Kiểm tra AI.
- Kiểm tra OBS.

**Trong livestream:**

- Xử lý hàng đợi bình luận.
- Nhận biết sản phẩm đang giới thiệu.
- Cảnh báo sản phẩm hết hiệu lực.
- Cảnh báo lỗi kết nối.
- Tạo gợi ý bán kèm.
- Điều phối kịch bản.
- Phát hiện vấn đề bất thường.

**Sau livestream:**

- Dừng AI.
- Đóng phiên.
- Tổng hợp bình luận.
- Tổng hợp sản phẩm.
- Đồng bộ dữ liệu đơn được phép.
- Đối soát hoa hồng nếu có dữ liệu.
- Lập báo cáo.
- Lưu nhật ký.
- Sao lưu.

Automation phải có điều kiện kích hoạt, nhật ký, giới hạn tác động và cơ chế dừng an toàn.

# PHẦN 14. BẢO MẬT VÀ QUẢN TRỊ

Các yêu cầu bắt buộc:

- Admin tổng.
- Role-based Access Control.
- Không lưu mật khẩu sàn dạng plaintext.
- OAuth theo cơ chế chính thức.
- Token Vault/OS Keychain.
- Không hardcode API key.
- Không gửi secret lên GitHub.
- TLS cho kết nối máy chủ.
- Mã hóa dữ liệu nhạy cảm.
- Audit Log.
- Error Log.
- Backup/Restore.
- Database Migration.
- Secure Auto-update.
- Kiểm soát quyền đọc/ghi dữ liệu ERP.
- Quản lý phiên đăng nhập.
- Thu hồi quyền.
- Giới hạn tốc độ API.
- Chống lặp tác vụ.
- Cơ chế Emergency Stop.

Phải bảo vệ cả dữ liệu tài khoản livestream, dữ liệu khách hàng và dữ liệu tài chính.

# PHẦN 15. CẤU TRÚC MÃ NGUỒN

Ưu tiên monorepo:

```text
sn-ai-live-studio/
  apps/
    desktop/
    sync-server/
  packages/
    shared-types/
    database/
    auth/
    platform-adapters/
      tiktok/
      shopee/
    sn-erp-adapter/
    product-engine/
    comment-engine/
    ai-engine/
    live-controller/
    obs-controller/
    voice-engine/
    script-engine/
    order-engine/
    analytics/
    automation/
    security/
  tests/
    unit/
    integration/
    e2e/
  docs/
    PRD.md
    ARCHITECTURE.md
    API_CONTRACTS.md
    DATABASE_SCHEMA.md
    SECURITY.md
    TEST_PLAN.md
    PROGRESS.md
    DECISIONS.md
    INTEGRATION_MATRIX.md
  scripts/
  .github/
  AGENTS.md
  README.md
```

Tổ chức mã nguồn rõ ràng, tránh tạo một file chứa quá nhiều chức năng.

Mỗi module có interface, input/output, xử lý lỗi, logging và test tương ứng.

# PHẦN 16. GIAO DIỆN PHẦN MỀM

Yêu cầu thiết kế:

- Hiện đại.
- Chuyên nghiệp.
- Dễ sử dụng.
- Gọn gàng.
- Phù hợp điều hành livestream.
- Không rối mắt.
- Phân cấp thông tin rõ ràng.
- Hỗ trợ màn hình rộng và nhiều màn hình.

Các menu chính:

1. Dashboard.
2. Livestream Studio.
3. Tài khoản nền tảng.
4. Kho Affiliate.
5. Kho SN Group.
6. Product Center.
7. AI Comment Center.
8. AI Sales Agent.
9. Kịch bản livestream.
10. OBS Controller.
11. Giọng nói và MC ảo.
12. Đơn hàng.
13. Affiliate Commission.
14. Báo cáo.
15. Automation.
16. Knowledge Base.
17. Nhật ký hệ thống.
18. Cài đặt.

Mỗi trang phải có đầy đủ trạng thái loading, empty, success, warning, error và disconnected.

Không tạo nút bấm không có tác dụng. Nếu chức năng chưa hỗ trợ, phải hiển thị rõ tình trạng và nguyên nhân.

# PHẦN 17. KIỂM TRA KHẢ NĂNG TÍCH HỢP NỀN TẢNG

Đây là giai đoạn bắt buộc trước khi triển khai API thật.

Phải xác minh riêng cho TikTok và Shopee:

- Có API đọc bình luận livestream không?
- Có API đăng bình luận livestream không?
- Có API lấy sản phẩm Affiliate của Creator không?
- Có API lấy sản phẩm trong livebag không?
- Có API nhận biết sản phẩm đang ghim không?
- Có API đồng bộ đơn hàng không?
- Có API hoa hồng Affiliate không?
- Có API thông tin người xem hoặc lượt xem không?
- Từng quyền áp dụng cho loại tài khoản nào?
- Có yêu cầu phê duyệt đối tác không?
- Hạn mức và giới hạn tần suất là gì?
- Quy định về automation, AI Voice và MC ảo ra sao?

Phải tạo `INTEGRATION_MATRIX.md`, mỗi dòng gồm:

- Nền tảng.
- Chức năng.
- Nguồn tài liệu chính thức.
- API/permission.
- Điều kiện quyền truy cập.
- Tình trạng: Verified / Restricted / Unverified / Unavailable.
- Phương án dự phòng.
- Kết quả kiểm thử tài khoản thật.

Không sử dụng API không chính thức, cookie harvesting hoặc cơ chế vượt bảo vệ nền tảng để thay thế khi thiếu quyền.

Chỉ khai báo Verified khi đã có bằng chứng phù hợp.

# PHẦN 18. CHIẾN LƯỢC PHÁT TRIỂN AI TIẾT KIỆM CHI PHÍ

Tôi muốn tối ưu token và tránh lãng phí.

Phân nhóm AI thành:

**Nhóm A – Tác vụ đơn giản:**

- Phân loại ý định.
- Loại bỏ bình luận trùng.
- Nhận diện từ khóa.
- Chuẩn hóa văn bản.
- Trả lời FAQ có cấu trúc.

Ưu tiên xử lý bằng rule engine, tìm kiếm database, mô hình nhỏ hoặc local AI nếu đạt chất lượng.

**Nhóm B – Tác vụ trung bình:**

- Tư vấn sản phẩm.
- So sánh.
- Trả lời câu hỏi khách.
- Tóm tắt thông tin.

Sử dụng model chi phí hợp lý kèm dữ liệu truy xuất.

**Nhóm C – Tác vụ phức tạp:**

- Kịch bản bán hàng nâng cao.
- Phân tích cuộc trò chuyện khó.
- Phân tích kinh doanh.
- Kiểm tra xung đột dữ liệu.

Chỉ sử dụng model mạnh khi cần.

Phải triển khai:

- Model Routing.
- Token Budget.
- Prompt Caching nếu phù hợp.
- Lưu lịch sử dạng tóm tắt.
- Context Window Management.
- Rate Limiting.
- AI Usage Monitoring.
- Chi phí theo phiên LIVE và tài khoản.
- Giới hạn chi tiêu.
- Fallback khi model lỗi.
- Kiểm thử chất lượng trước khi thay model.

Không gửi toàn bộ danh mục sản phẩm hoặc toàn bộ lịch sử livestream vào AI mỗi lần khách bình luận. Chỉ cung cấp dữ liệu cần thiết.

# PHẦN 19. KIỂM THỬ VÀ NGHIỆM THU

Phải có:

- Unit Test.
- Integration Test.
- End-to-end Test.
- API Contract Test.
- Database Migration Test.
- Performance Test.
- Security Test.
- Failure Recovery Test.
- UI Test.
- Kiểm thử thực tế trên macOS.
- Kiểm thử thực tế trên Windows.
- Kiểm thử livestream với tài khoản được cấp quyền.

Các kịch bản bắt buộc:

1. Hai tài khoản có dữ liệu sản phẩm khác nhau.
2. Hai sản phẩm cùng tên nhưng giá khác nhau.
3. Khách hỏi không rõ sản phẩm.
4. Giá thay đổi trong phiên.
5. Sản phẩm hết hàng.
6. API bị rate limit.
7. Token hết hạn.
8. Internet bị ngắt.
9. AI API không phản hồi.
10. OBS mất kết nối.
11. Bình luận đến đồng thời.
12. Gửi câu trả lời thất bại.
13. Người dùng bấm dừng AI.
14. Dữ liệu đơn hàng cập nhật chậm.
15. Hoa hồng bị điều chỉnh.
16. Database cần khôi phục.
17. Nhân viên thiếu quyền.
18. Nhập dữ liệu chứa nội dung độc hại/prompt injection.

**Không công nhận tính năng hoàn thành nếu thiếu bằng chứng kiểm thử phù hợp.**

# PHẦN 20. LỘ TRÌNH TRIỂN KHAI

Chia thành các phiên bản:

**V0.1 – Desktop Foundation**

- Electron/React.
- Thiết kế giao diện.
- SQLite.
- Đăng nhập.
- Cấu hình.
- Quản trị ứng dụng.

**V0.2 – Product Engine**

- Affiliate Mock Adapter.
- SN ERP Adapter.
- Product Mapping.
- Danh sách sản phẩm.
- Đồng bộ và kiểm soát dữ liệu.

**V0.3 – AI Sales Engine**

- AI Knowledge Base.
- AI Chat/Comment Engine.
- Phân loại bình luận.
- Tra cứu sản phẩm.
- Câu trả lời.
- Cơ chế duyệt.

**V0.4 – Platform Integration**

- TikTok Adapter.
- Shopee Adapter.
- OAuth.
- Quyền API.
- Comment Integration khi được phép.
- Affiliate Product Sync khi được phép.

**V0.5 – Live Studio**

- OBS.
- Phiên livestream.
- Script Engine.
- Product Overlay.
- Live Control Dashboard.

**V0.6 – Commerce Analytics**

- Đơn hàng.
- Hoa hồng.
- Attribution.
- KPI.
- Báo cáo.

**V1.0 – Production Release**

- Security Hardening.
- QA.
- Backup/Restore.
- Recovery.
- Bộ cài.
- Tài liệu vận hành.
- Kiểm thử thực tế.
- Nghiệm thu.

**V2.0 – Advanced AI**

- AI Voice.
- MC ảo nếu hợp lệ.
- Automation nâng cao.
- Nhiều máy.
- Nhiều phiên livestream.

# PHẦN 21. PHƯƠNG PHÁP LÀM VIỆC VỚI CODEX

Tôi muốn sử dụng ChatGPT và Codex để tự xây dựng phần mềm, giảm tối đa chi phí thuê đơn vị lập trình.

Bạn phải:

1. Khảo sát repository và môi trường thực tế trước khi sửa.
2. Đọc `AGENTS.md` và các tài liệu liên quan.
3. Kiểm tra code đã tồn tại.
4. Không viết lại module đang hoạt động nếu không cần thiết.
5. Xác định chính xác file cần thay đổi.
6. Chỉ sửa những phần thuộc phạm vi nhiệm vụ.
7. Không tự thay đổi kiến trúc đã chốt.
8. Không xóa dữ liệu hoặc chạy migration phá hủy.
9. Viết code production-grade.
10. Có validation, logging, error handling và test.
11. Chạy test/lint/typecheck/build phù hợp.
12. Báo cáo file đã sửa, chức năng đã làm và kết quả kiểm thử.
13. Cập nhật `PROGRESS.md` sau mỗi nhiệm vụ.
14. Ghi quyết định kiến trúc quan trọng vào `DECISIONS.md`.
15. Không tuyên bố hoàn thành nếu test còn lỗi.
16. Không in lại toàn bộ source code khi có khả năng chỉnh sửa trực tiếp trong repository.
17. Không yêu cầu lặp lại thông tin đã được cung cấp.
18. Nếu thiếu dữ liệu không quan trọng, sử dụng mặc định kỹ thuật an toàn và ghi rõ giả định.
19. Nếu thiếu quyền API hoặc credentials, triển khai adapter/mock thực tế có thể kiểm thử, không giả vờ tích hợp thành công.
20. Không tự merge, deploy hoặc phát hành nếu chưa có quyền và điều kiện nghiệm thu.

# PHẦN 22. QUY TẮC SỬ DỤNG MODEL ĐỂ TIẾT KIỆM TOKEN

Tôi muốn tối ưu tài nguyên ChatGPT và Codex.

Hãy đề xuất model phù hợp theo nhiệm vụ:

- GPT-6 Instant: trao đổi, tài liệu, sửa nội dung nhỏ.
- GPT-6 Medium: lập trình thường ngày, API, giao diện, database.
- GPT-6 High: kiến trúc, lỗi phức tạp, thiết kế đa module.
- GPT-6 Extra High: chỉ khi có vấn đề đặc biệt khó, nhiều ràng buộc hoặc rủi ro cao.
- GPT-6 Pro: chỉ cân nhắc nếu tài khoản hỗ trợ và nhiệm vụ đủ phức tạp để xứng đáng với tài nguyên.

Các lựa chọn model có thể thay đổi theo thời điểm và tài khoản. Nếu model không có sẵn, chọn model khả dụng phù hợp nhất.

Lưu ý: Bạn không được giả vờ đã chuyển model; nếu tôi cần tự thay đổi model trong ChatGPT/Codex, hãy hướng dẫn rõ thao tác.

Quy tắc tiết kiệm:

- Một nhiệm vụ rõ ràng cho mỗi lượt.
- Không tự động đọc toàn bộ repository.
- Không gửi lại toàn bộ lịch sử trò chuyện vào context.
- Không in tài liệu dài nếu chỉ cần cập nhật file.
- Không viết nhiều phương án trùng lặp khi đã có quyết định.
- Không sử dụng model mạnh cho việc cơ bản.
- Chỉ chuyển model khi có lý do kỹ thuật.
- Tận dụng test và công cụ kiểm tra thay vì suy luận lại toàn bộ.
- Tránh tạo hàng loạt file tài liệu trùng lặp.
- Chỉ giữ tài liệu cần thiết làm nguồn chuẩn duy nhất.

Không áp đặt một giới hạn token quá nhỏ gây thiếu code hoặc bỏ sót logic. Ưu tiên hiệu quả tổng chi phí, bao gồm cả việc tránh phải sửa lại.

# PHẦN 23. QUY TẮC QUẢN LÝ TIẾN ĐỘ

Tạo `docs/PROGRESS.md` với các trường:

- Mã nhiệm vụ.
- Phân hệ.
- Yêu cầu.
- Trạng thái.
- File liên quan.
- Ngày cập nhật.
- Mức độ ưu tiên.
- Phụ thuộc.
- Kết quả test.
- Vấn đề tồn đọng.
- Hành động tiếp theo.

Các trạng thái:

`Not Started → In Progress → Implemented → Tested → Verified → Released`

Không đánh dấu Verified nếu chưa đủ bằng chứng.

Mọi phiên làm việc mới chỉ cần đọc:

1. `AGENTS.md`.
2. `docs/PROGRESS.md`.
3. Tài liệu module liên quan.
4. Các file code cần thiết.

Chỉ mở toàn bộ PRD khi phải kiểm tra lại phạm vi gốc.

# PHẦN 24. CÁCH BÁO CÁO SAU MỖI NHIỆM VỤ

Khi hoàn thành một nhiệm vụ, báo cáo ngắn gọn theo cấu trúc:

**1. Đã thực hiện:** những chức năng đã làm.

**2. File thay đổi:** đường dẫn file.

**3. Kết quả kiểm thử:** pass/fail/chưa chạy và lý do.

**4. Chức năng hoạt động thực tế:** chỉ nêu những gì đã được kiểm chứng.

**5. Vấn đề còn tồn tại:** lỗi, thiếu API, thiếu quyền hoặc môi trường.

**6. Nhiệm vụ tiếp theo:** bước triển khai hợp lý nhất.

Không báo cáo chung chung kiểu “đã hoàn thành toàn bộ” nếu chưa có bằng chứng.

# PHẦN 25. NHIỆM VỤ ĐẦU TIÊN CẦN THỰC HIỆN

Ngay khi tiếp nhận MASTER PROMPT này, hãy làm theo trình tự:

**Bước 1:** Xác nhận đã hiểu mục tiêu và những ràng buộc quan trọng của dự án.

**Bước 2:** Rà soát yêu cầu, chỉ ra mâu thuẫn kỹ thuật hoặc điểm cần xác minh. Không lặp lại nguyên văn toàn bộ prompt.

**Bước 3:** Lập kiến trúc tổng thể, danh mục module, database sơ bộ và thứ tự phát triển hợp lý.

**Bước 4:** Lập Master Checklist chi tiết có mã nhiệm vụ, mức ưu tiên, phụ thuộc và tiêu chí nghiệm thu.

**Bước 5:** Tạo các tài liệu nền tảng của dự án, đặc biệt là PRD, ARCHITECTURE, INTEGRATION_MATRIX, PROGRESS và AGENTS.md, trong môi trường thực tế nếu có quyền ghi file.

**Bước 6:** Kiểm tra công cụ, quyền truy cập GitHub/Codex và môi trường lập trình hiện có. Không giả định đã kết nối.

**Bước 7:** Nếu có thể thao tác repository, bắt đầu triển khai V0.1 theo nhiệm vụ được phê duyệt. Nếu chưa có repository, đề xuất cấu trúc và hướng dẫn tạo repository trước; không tuyên bố đã tạo thành công khi chưa thực hiện.

**Bước 8:** Sau khi xây dựng V0.1, tiếp tục theo lộ trình và cập nhật trạng thái.

Chỉ hỏi tôi khi thiếu thông tin thực sự quyết định tính đúng đắn, an toàn hoặc khả năng kết nối của hệ thống.

Đối với những quyết định lớn ảnh hưởng đến kiến trúc, dữ liệu hoặc chi phí, phải giải thích phương án đề xuất và xin phê duyệt trước khi thực hiện thay đổi không thể đảo ngược.

---

# MỤC TIÊU CUỐI CÙNG

Tôi muốn sở hữu một phần mềm **SN AI LIVE STUDIO** có thể cài đặt, sử dụng và vận hành trong thực tế, không chỉ là bản trình diễn.

Phần mềm phải:

- Có mã nguồn thuộc quyền quản lý của SN Group.
- Có khả năng nâng cấp lâu dài.
- Không phụ thuộc một nhà cung cấp AI duy nhất.
- Tối ưu token và chi phí API.
- Có giao diện chuyên nghiệp.
- Hoạt động ổn định.
- Quản lý đúng hai nguồn sản phẩm.
- Hỗ trợ bán hàng thực tế.
- Tôn trọng quyền API và chính sách của nền tảng.
- Có hệ thống AI tư vấn thông minh.
- Có khả năng mở rộng giọng nói và MC ảo.
- Có kiểm thử, tài liệu và khả năng bảo trì.
- Không ảnh hưởng đến website/ERP SN Group hiện có.

**Hãy bắt đầu bằng việc đánh giá kiến trúc và lập kế hoạch triển khai V0.1–V1.0 thật cụ thể. Ưu tiên xây sản phẩm vận hành được, kiểm chứng được, thay vì tạo thêm những ý tưởng hoặc demo không có giá trị sử dụng.**