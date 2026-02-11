#!/bin/bash

# 🚀 Script Deploy Vercel cho Mikage Zenith v30.1
# Tác giả: Mikage Production Team
# Mục đích: Tự động hóa quá trình deploy lên Vercel

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Banner
echo -e "${PURPLE}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║        🚀 MIKAGE ZENITH v30.1 - VERCEL DEPLOY 🚀         ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if Vercel CLI is installed
echo -e "\n${BLUE}[1/6] Kiểm tra Vercel CLI...${NC}"
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI chưa được cài đặt!"
    echo -e "${YELLOW}Đang cài đặt Vercel CLI...${NC}"
    npm install -g vercel
    print_success "Đã cài đặt Vercel CLI!"
else
    print_success "Vercel CLI đã được cài đặt!"
    vercel --version
fi

# Check if user is logged in
echo -e "\n${BLUE}[2/6] Kiểm tra đăng nhập Vercel...${NC}"
if ! vercel whoami &> /dev/null; then
    print_warning "Chưa đăng nhập vào Vercel!"
    echo -e "${YELLOW}Vui lòng đăng nhập...${NC}"
    vercel login
else
    print_success "Đã đăng nhập vào Vercel!"
    echo -e "   User: $(vercel whoami)"
fi

# Check if we're in the right directory
echo -e "\n${BLUE}[3/6] Kiểm tra thư mục dự án...${NC}"
if [ ! -f "package.json" ]; then
    print_error "Không tìm thấy package.json!"
    print_info "Vui lòng chạy script này trong thư mục dự án babesu"
    exit 1
fi

if [ ! -f "vercel.json" ]; then
    print_error "Không tìm thấy vercel.json!"
    print_info "Vui lòng đảm bảo đã có file cấu hình Vercel"
    exit 1
fi

print_success "Đang ở đúng thư mục dự án!"

# Install dependencies
echo -e "\n${BLUE}[4/6] Cài đặt dependencies...${NC}"
if [ ! -d "node_modules" ]; then
    print_info "Đang cài đặt dependencies..."
    npm install
    print_success "Đã cài đặt xong dependencies!"
else
    print_success "Dependencies đã được cài đặt!"
fi

# Run build test
echo -e "\n${BLUE}[5/6] Kiểm tra build...${NC}"
print_info "Đang build dự án để kiểm tra..."
if npm run build; then
    print_success "Build thành công!"
else
    print_error "Build thất bại!"
    print_info "Vui lòng sửa lỗi trước khi deploy"
    exit 1
fi

# Deploy to Vercel
echo -e "\n${BLUE}[6/6] Deploy lên Vercel...${NC}"
echo -e "${YELLOW}Bạn muốn deploy:${NC}"
echo -e "  ${GREEN}1${NC} - Preview (để test trước)"
echo -e "  ${GREEN}2${NC} - Production (phiên bản chính thức)"
echo -e "  ${GREEN}3${NC} - Hủy bỏ"
echo ""
read -p "Chọn (1/2/3): " choice

case $choice in
    1)
        print_info "Đang deploy lên Preview..."
        vercel
        print_success "Deploy Preview thành công!"
        ;;
    2)
        print_warning "Bạn đang deploy lên PRODUCTION!"
        read -p "Bạn có chắc chắn? (y/N): " confirm
        if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
            print_info "Đang deploy lên Production..."
            vercel --prod
            print_success "Deploy Production thành công!"
        else
            print_info "Đã hủy deploy Production"
            exit 0
        fi
        ;;
    3)
        print_info "Đã hủy deploy"
        exit 0
        ;;
    *)
        print_error "Lựa chọn không hợp lệ!"
        exit 1
        ;;
esac

# Success message
echo -e "\n${PURPLE}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║             ✨ DEPLOY HOÀN TẤT THÀNH CÔNG! ✨            ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

print_success "Dự án Mikage Zenith v30.1 đã được deploy!"
print_info "Kiểm tra dashboard tại: https://vercel.com/dashboard"
print_info "Xem logs với lệnh: vercel logs"

# Show environment variables reminder
echo -e "\n${YELLOW}📝 LƯU Ý:${NC}"
print_warning "Đừng quên thêm Environment Variables vào Vercel Dashboard:"
echo -e "   • GEMINI_API_KEY (bắt buộc)"
echo -e "   • GCP_PROJECT_ID (tùy chọn)"
echo -e "   • GCP_BUCKET_NAME (tùy chọn)"
echo -e "   • GCP_CREDENTIALS (tùy chọn)"
echo -e "\nVào: https://vercel.com/dashboard → Settings → Environment Variables"
