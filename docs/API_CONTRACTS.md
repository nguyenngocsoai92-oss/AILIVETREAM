# Hợp đồng nội bộ dự kiến

| Interface | Đầu vào và đầu ra |
|---|---|
| PlatformAdapter.capabilities | accountId → market, role, quyền, health và hạn mức đã xác minh |
| CatalogAdapter.listProducts | source/account, cursor → sản phẩm, biến thể, snapshot, nextCursor, provenance |
| CommentAdapter.read / send | account/session, cursor hoặc draft/operationId → events hoặc receipt. Có trạng thái unsupported, forbidden và unknown outcome |
| OrderAdapter.listChanges | account, watermark, cursor → order changes, settlement events, evidence |
| ObsController | readStatus, listScenes, setScene, cập nhật source/media/audio có allowlist |
| AiProvider.generate | task, context tối thiểu có evidence IDs, budget → draft, usage, latency, error |
| ERP read adapter | khảo sát nguồn, sandbox, phân trang, thời gian cập nhật, schema, xác thực, mã lỗi và quota trước khi khóa contract |

Lỗi chuẩn hóa gồm invalid input, unavailable, unauthorized, forbidden, rate limited, timeout, conflict và unknown outcome. Log correlation ID, không log bí mật hoặc payload khách hàng thô. Form nhập CSV có preview, lỗi từng dòng, dry run và commit transaction. Hợp đồng này là interface nội bộ, endpoint ERP chỉ xác định sau khảo sát.
