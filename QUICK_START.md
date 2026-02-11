# 🚀 QUICK START - DEPLOY NGAY LẬP TỨC

## Cách nhanh nhất để deploy Mikage Zenith v30.1 lên Vercel

### 🎯 3 BƯỚC ĐƠN GIẢN

#### 1. Cài đặt Vercel CLI
```bash
npm install -g vercel
```

#### 2. Đăng nhập
```bash
vercel login
```

#### 3. Deploy!
```bash
# Vào thư mục dự án
cd babesu

# Deploy lên Production
vercel --prod
```

**XONG! Dự án của bạn đã online! 🎉**

---

## 🤖 HOẶC SỬ DỤNG SCRIPT TỰ ĐỘNG

Chúng tôi đã tạo script tự động hóa mọi thứ:

```bash
# Chạy script deploy
./deploy-vercel.sh
```

Script sẽ tự động:
- ✅ Kiểm tra Vercel CLI
- ✅ Đăng nhập nếu cần
- ✅ Cài đặt dependencies
- ✅ Build và kiểm tra lỗi
- ✅ Deploy lên Vercel
- ✅ Hiển thị kết quả

---

## 📱 DEPLOY QUA GITHUB (KHÔNG CẦN CLI)

1. Vào https://vercel.com/new
2. Click "Import Git Repository"
3. Chọn repo: `nookun987-pixel/babesu`
4. Click "Deploy"

**Vercel sẽ tự động:**
- Detect Next.js
- Build dự án
- Deploy lên Production
- Auto-deploy mỗi khi push code mới

---

## ⚙️ SAU KHI DEPLOY

### Thêm API Keys (Bắt buộc!)

1. Vào https://vercel.com/dashboard
2. Chọn project "babesu"
3. Settings → Environment Variables
4. Thêm:
```
GEMINI_API_KEY = [your_key_here]
```

5. Click "Save" và "Redeploy"

**Lấy Gemini API Key**: https://aistudio.google.com/app/apikey

---

## ✅ KIỂM TRA KẾT QUẢ

Sau khi deploy, truy cập:
- **Production**: https://babesu.vercel.app
- **Dashboard**: https://vercel.com/dashboard

Kiểm tra các tính năng:
- ✅ Homepage loads
- ✅ Character Studio
- ✅ Image Forge
- ✅ AI ChatBot
- ✅ API endpoint: /api/generate

---

## 🆘 GẶP VẤN ĐỀ?

### Build Failed?
```bash
# Test local trước
npm run build
```

### Environment Variables?
Đừng quên thêm `GEMINI_API_KEY` vào Vercel Dashboard!

### Cần help?
Xem hướng dẫn chi tiết: `HUONG_DAN_DEPLOY_VERCEL.md`

---

## 📊 THÔNG TIN

- **Build Time**: ~30-60 giây
- **Bundle Size**: 215 KB
- **Framework**: Next.js 15.0.8
- **Free Tier**: 100 GB bandwidth/tháng

---

**🎉 Chúc mừng! Dự án của bạn đã sẵn sàng cho Production!**
