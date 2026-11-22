# Lược đồ dữ liệu sơ bộ

| Nhóm bảng | Khóa, quan hệ và dữ liệu |
|---|---|
| users, roles, memberships, local_sessions | user/role/permission, hash mật khẩu có salt, session hết hạn/thu hồi |
| platform_accounts, capabilities | unique(platform, market, external_account_id, role), trạng thái quyền, vault reference, expires_at |
| catalog_sources, catalog_items, variants | source có owner account hoặc phạm vi SN; unique(source_id, external_item_id), unique(item_id, external_variant_id) |
| listings, product_mappings | variant, account, external listing, channel, eligibility, approved_by, approved_at |
| product_snapshots | listing/variant, price_minor, currency, stock, promo, commission, captured_at, valid_until, evidence_ref; lịch sử ghi nối tiếp |
| live_sessions, session_products, live_events | account, operator, mode, state, OBS/platform state, order, current listing, thời gian, bằng chứng |
| comments, reply_drafts, reply_attempts, outbox | session, external ID có namespace, trạng thái, KB/price references, idempotency key, thử gửi và remote receipt |
| knowledge_documents, knowledge_versions, scripts, script_versions | quyền duyệt, phiên bản đã duyệt, hiệu lực và tham chiếu từ phiên |
| orders, order_lines, financial_events, attribution | account/source/external ID, SKU, status, tiền tệ, đối soát, evidence_ref, liên kết phiên nếu có căn cứ |
| sync_runs, sync_cursors, import_batches | account/source, watermark, cursor, checksum, kết quả và lỗi đã lọc |
| ai_usage, audit_events, app_settings, schema_migrations | chi phí, model, token; actor/action/time; cấu hình; lịch sử migration |

Dùng UUID nội bộ, UTC, tiền theo đơn vị nhỏ nhất, nullable cho dữ liệu chưa có. Truy vấn domain bắt buộc scope tài khoản hoặc nguồn ERP được phân quyền. Tạo index theo account/session và thời gian. Dedupe bình luận theo session và ID nguồn, nhập tệp theo hash batch + mã dòng. Cập nhật cursor trong cùng transaction với batch đã áp dụng. Dựng báo cáo từ sự kiện tài chính append-only, tránh cộng nhân đôi khi replay. Lịch retention và quyền xem PII chốt trước pilot có dữ liệu khách hàng.
