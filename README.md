# SN AI LIVE STUDIO

Bộ tài liệu khởi tạo dự án desktop của SN Group. Bắt đầu với [PROGRESS](docs/PROGRESS.md), [kiến trúc](docs/ARCHITECTURE.md) và [Master Checklist](docs/MASTER_CHECKLIST.md). [MASTER_SPEC](docs/MASTER_SPEC.md) giữ nguyên đặc tả gốc.

## Khởi tạo kho mã

Giải nén, mở thư mục này và chạy `git init -b main` để tạo kho cục bộ. Tạo repository private trống mang tên `sn-ai-live-studio` trong tổ chức GitHub do SN Group quản lý. Khi đã có quyền, thêm remote của tổ chức. Đưa bộ tài liệu lên nhánh làm việc theo quy trình review của SN Group.

## Cấu trúc đề xuất

- `apps/desktop` chứa Electron main, preload và React renderer.
- `packages/` chứa database, auth, product-engine, comment-engine, ai-engine, các adapter và phân hệ nghiệp vụ, tạo theo mốc sử dụng.
- `apps/sync-server` bổ sung khi cần giữ bí mật ứng dụng đối tác, nhận webhook hoặc đồng bộ nhiều máy.
- `tests/` chứa bài kiểm thử xuyên module và end-to-end.
- `docs/` chứa phạm vi, kiến trúc, tiến độ, điều kiện nghiệm thu và bằng chứng tích hợp.

Bootstrap sau khi chốt repo. Chọn bản Electron/Node còn được hỗ trợ, khóa phiên bản và lockfile. Đặt các lệnh lint, typecheck, test, build trong package.json trước khi thêm CI.
