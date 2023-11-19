# Sử dụng image chứa Maven và OpenJDK 17 để xây dựng ứng dụng
FROM maven:3.8.4-openjdk-17 AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file POM.xml để tận dụng Docker caching
COPY pom.xml .

# Tải các dependencies Maven
RUN mvn dependency:go-offline

# Copy mã nguồn vào thư mục làm việc
COPY src ./src

# Xây dựng ứng dụng
RUN mvn package -DskipTests

# Sử dụng image chứa OpenJDK 17 để triển khai ứng dụng
FROM openjdk:17-oracle

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy các file từ image builder vào image triển khai
COPY --from=builder /app/target/back_end-0.0.1-SNAPSHOT.jar ./

# Thiết lập lệnh chạy khi container được khởi động
CMD ["java", "-jar", "back_end-0.0.1-SNAPSHOT.jar"]
