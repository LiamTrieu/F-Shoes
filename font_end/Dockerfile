# Sử dụng image chứa Node.js phiên bản 18 để xây dựng ứng dụng
FROM node:18 as builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Thêm NODE_OPTIONS vào môi trường
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy file package.json và package-lock.json để tận dụng Docker caching
COPY package*.json ./

# Tải các dependencies Node.js
RUN npm install

# Copy mã nguồn vào thư mục làm việc
COPY . .

# Chia nhỏ lệnh xây dựng thành các bước nhỏ hơn
RUN npm run build

# Sử dụng image chứa Nginx để triển khai ứng dụng
FROM nginx:latest

# Thiết lập thư mục làm việc
WORKDIR /usr/share/nginx/html

# Copy các file từ image builder vào image triển khai
COPY --from=builder /app/build .

# Thiết lập lệnh chạy khi container được khởi động
CMD ["nginx", "-g", "daemon off;"]
