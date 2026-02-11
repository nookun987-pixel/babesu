# 🚀 HƯỚNG DẪN DEPLOY VERCEL CHO MIKAGE ZENITH v30.1

## 📖 GIẢI THÍCH CÁC LỆNH

### 1️⃣ `npm install -g vercel`
**Chức năng**: Cài đặt Vercel CLI (Command Line Interface) toàn cục trên máy tính của bạn.

**Chi tiết**:
- `npm` - Node Package Manager (công cụ quản lý package của Node.js)
- `install` - Lệnh cài đặt package
- `-g` - Flag "global", cài đặt toàn cục để có thể dùng ở mọi nơi
- `vercel` - Tên package của Vercel CLI

**Khi nào cần chạy**: Chỉ cần chạy 1 lần duy nhất khi lần đầu sử dụng Vercel CLI.

### 2️⃣ `vercel --prod`
**Chức năng**: Deploy dự án lên Vercel ở môi trường Production.

**Chi tiết**:
- `vercel` - Lệnh chính của Vercel CLI
- `--prod` - Flag để deploy lên Production (môi trường thật, không phải preview)

**Kết quả**: Dự án của bạn sẽ được deploy lên Vercel và có URL công khai.

---

## 🎯 HƯỚNG DẪN TỪNG BƯỚC

### Bước 1: Cài đặt Vercel CLI (chỉ làm 1 lần)

```bash
npm install -g vercel
```

**Output mong đợi**:
```
added 1 package in 2s
```

### Bước 2: Đăng nhập vào Vercel

```bash
vercel login
```

**Điều gì sẽ xảy ra**:
1. Terminal sẽ hiển thị: "Vercel CLI needs to be authenticated"
2. Một trang web sẽ tự động mở trong trình duyệt
3. Chọn phương thức đăng nhập (GitHub, GitLab, Bitbucket, hoặc Email)
4. Sau khi đăng nhập thành công, terminal sẽ hiển thị: "✔ Success!"

### Bước 3: Di chuyển vào thư mục dự án

```bash
cd /path/to/babesu
# Hoặc nếu đã ở trong thư mục dự án thì bỏ qua bước này
```

### Bước 4: Deploy lần đầu (Preview)

```bash
vercel
```

**Điều gì sẽ xảy ra**:
1. CLI sẽ hỏi: "Set up and deploy ~/babesu?" → Nhấn **Enter** (Yes)
2. "Which scope?" → Chọn account của bạn
3. "Link to existing project?" → Nhấn **N** (No) nếu là lần đầu
4. "What's your project's name?" → Nhấn **Enter** (dùng tên mặc định "babesu")
5. "In which directory is your code located?" → Nhấn **Enter** (./)
6. "Want to override the settings?" → Nhấn **N** (No)

**Output**:
```
🔍 Inspect: https://vercel.com/your-name/babesu/xxx
✅ Preview: https://babesu-xxx.vercel.app
```

### Bước 5: Deploy lên Production

```bash
vercel --prod
```

**Điều gì sẽ xảy ra**:
1. CLI sẽ build dự án của bạn
2. Upload lên Vercel servers
3. Deploy lên Production URL

**Output**:
```
🔍 Inspect: https://vercel.com/your-name/babesu/yyy
✅ Production: https://babesu.vercel.app
```

---

## 🎬 QUY TRÌNH HOÀN CHỈNH

```bash
# Bước 1: Cài đặt CLI (chỉ làm 1 lần)
npm install -g vercel

# Bước 2: Đăng nhập (chỉ làm 1 lần)
vercel login

# Bước 3: Vào thư mục dự án
cd babesu

# Bước 4: Cài đặt dependencies
npm install

# Bước 5: Test build local (optional nhưng nên làm)
npm run build

# Bước 6: Deploy lên Production
vercel --prod
```

---

## ⚙️ CẤU HÌNH ENVIRONMENT VARIABLES

Sau khi deploy xong, bạn cần thêm các biến môi trường:

1. Vào Vercel Dashboard: https://vercel.com/dashboard
2. Chọn project "babesu"
3. Vào **Settings** → **Environment Variables**
4. Thêm các biến sau:

### Bắt buộc:
```
GEMINI_API_KEY = your_actual_gemini_api_key
```
Lấy key tại: https://aistudio.google.com/app/apikey

### Tùy chọn (nếu muốn dùng GCP Storage):
```
GCP_PROJECT_ID = your-gcp-project-id
GCP_BUCKET_NAME = mikage-zenith-assets
GCP_CREDENTIALS = {"type":"service_account","project_id":"..."}
```

5. Sau khi thêm xong, click **Redeploy** để áp dụng environment variables

---

## 🔧 CÁC LỆNH VERCEL CLI HỮU ÍCH KHÁC

### Deploy preview (không phải production)
```bash
vercel
```

### Xem danh sách deployments
```bash
vercel list
```

### Xem logs
```bash
vercel logs
```

### Xóa deployment
```bash
vercel remove [deployment-url]
```

### Xem thông tin project
```bash
vercel inspect
```

### Link project với existing Vercel project
```bash
vercel link
```

---

## 🎯 OUTPUT MẪU KHI DEPLOY THÀNH CÔNG

```
Vercel CLI 34.0.0
🔍 Inspect: https://vercel.com/nookun987-pixel/babesu/abc123
✅ Production: https://babesu.vercel.app [2s]
📝 Deployed to production. Run `vercel --prod` to overwrite later deployments.
```

Sau đó bạn có thể truy cập website tại: **https://babesu.vercel.app**

---

## 🐛 XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi: "Command not found: vercel"
**Nguyên nhân**: Chưa cài đặt Vercel CLI hoặc cài đặt không thành công
**Giải pháp**: 
```bash
npm install -g vercel
# Hoặc nếu dùng yarn:
yarn global add vercel
```

### Lỗi: "Not authorized"
**Nguyên nhân**: Chưa đăng nhập
**Giải pháp**: 
```bash
vercel login
```

### Lỗi: "Build failed"
**Nguyên nhân**: Code có lỗi hoặc thiếu dependencies
**Giải pháp**: 
```bash
# Test build local trước
npm run build

# Kiểm tra logs
vercel logs
```

### Lỗi: "Environment variable not found"
**Nguyên nhân**: Chưa set environment variables
**Giải pháp**: Vào Vercel Dashboard → Settings → Environment Variables và thêm các biến cần thiết

---

## 📊 THÔNG TIN DỰ ÁN

- **Framework**: Next.js 15.0.8
- **Build Time**: ~30-60 giây
- **Bundle Size**: 215 KB (main page)
- **API Endpoints**: `/api/generate`
- **Regions**: Singapore (sin1), Tokyo (hnd1)

---

## 🎉 HOÀN THÀNH!

Sau khi deploy thành công, dự án **Mikage Zenith v30.1** của bạn sẽ có:

✅ URL công khai: https://babesu.vercel.app
✅ SSL certificate tự động (HTTPS)
✅ CDN toàn cầu
✅ Automatic deployments từ GitHub (nếu kết nối)
✅ Analytics và monitoring
✅ Serverless Functions cho API

---

## 📞 HỖ TRỢ

- Vercel Documentation: https://vercel.com/docs
- Vercel CLI Reference: https://vercel.com/docs/cli
- Next.js Deployment: https://nextjs.org/docs/deployment

**Lưu ý**: Vercel Free tier có giới hạn:
- 100 GB bandwidth/tháng
- 6,000 phút build time/tháng
- Unlimited deployments

Để có unlimited bandwidth và advanced features, cần upgrade lên **Vercel Pro** ($20/tháng).
