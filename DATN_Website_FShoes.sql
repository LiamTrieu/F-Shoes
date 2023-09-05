create database DATN_Website_FShoes;
use DATN_Website_FShoes;

CREATE TABLE size (
    id INT AUTO_INCREMENT PRIMARY KEY,
    size FLOAT UNIQUE NOT NULL,
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    deleted BOOLEAN
);

CREATE TABLE brand (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) UNIQUE NOT NULL,
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    deleted BOOLEAN
);
CREATE TABLE color (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code CHAR(20) UNIQUE NOT NULL,
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    deleted BOOLEAN
);
CREATE TABLE sole (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) UNIQUE NOT NULL,
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    deleted BOOLEAN
);
CREATE TABLE material (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) UNIQUE NOT NULL,
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    deleted BOOLEAN
);
CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) UNIQUE NOT NULL,
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    deleted BOOLEAN
);
CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) UNIQUE NOT NULL,
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    deleted BOOLEAN
);
CREATE TABLE promotion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) UNIQUE NOT NULL,
    time_start BIGINT NOT NULL,
    time_end BIGINT NOT NULL,
    value INT NOT NULL,
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    status INT
);
CREATE TABLE staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    date_birth BIGINT NOT NULL,
    citizen_id VARCHAR(20) UNIQUE NOT NULL,
    phone_number VARCHAR(10) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    gender BOOLEAN NOT NULL,
    password VARCHAR(100) NOT NULL,
    avatar VARCHAR(100),
    role INT NOT NULL DEFAULT 0,
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    status INT
);
CREATE TABLE customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    date_birth BIGINT,
    phone_number VARCHAR(10) UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    gender BOOLEAN,
    password VARCHAR(100),
    avatar VARCHAR(100),
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    status INT
);
CREATE TABLE voucher (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code CHAR(30) UNIQUE NOT NULL,
    name NVARCHAR(100) NOT NULL,
    value DECIMAL(16 , 0 ) NOT NULL,
    maximum_value DECIMAL(16 , 0 ) NOT NULL,
    type BOOLEAN NOT NULL,
    minimum_amount DECIMAL(16 , 0 ),
    quantity INT NOT NULL,
    start_date BIGINT NOT NULL,
    end_date BIGINT NOT NULL,
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    status INT
);
CREATE TABLE product_detail (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_brand INT,
    id_sole INT,
    id_material INT,
    id_category INT,
    id_product INT,
    id_size INT,
    id_color INT,
    id_image INT,
    code CHAR(30) UNIQUE NOT NULL,
    price DECIMAL(16 , 0 ) NOT NULL,
    amount INT,
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    deleted BOOLEAN DEFAULT 0,
    FOREIGN KEY (id_brand)
        REFERENCES brand (id),
    FOREIGN KEY (id_sole)
        REFERENCES sole (id),
    FOREIGN KEY (id_material)
        REFERENCES material (id),
    FOREIGN KEY (id_category)
        REFERENCES category (id),
    FOREIGN KEY (id_product)
        REFERENCES product (id),
    FOREIGN KEY (id_size)
        REFERENCES size (id)
);
CREATE TABLE image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    deleted BOOLEAN DEFAULT 0,
    id_product_detail BIGINT,
    FOREIGN KEY (id_product_detail)
        REFERENCES product_detail (id)
);
alter table product_detail add constraint FOREIGN KEY (id_image)REFERENCES image (id);

CREATE TABLE product_promotion (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_product_detail BIGINT,
    id_promotion INT,
    price_promotion DECIMAL(16 , 0 ),
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    status INT,
    FOREIGN KEY (id_product_detail)
        REFERENCES product_detail (id),
    FOREIGN KEY (id_promotion)
        REFERENCES promotion (id)
);


CREATE TABLE customer_voucher (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_customer INT,
    id_voucher INT,
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    status INT,
    FOREIGN KEY (id_voucher)
        REFERENCES voucher (id),
    FOREIGN KEY (id_customer)
        REFERENCES customer (id)
);

CREATE TABLE address (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_customer INT,
    name NVARCHAR(100) NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    specific_address NVARCHAR(100) NOT NULL,
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    FOREIGN KEY (id_customer)
        REFERENCES customer (id)
);

CREATE TABLE bill (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_voucher INT,
    id_customer INT,
    code CHAR(30),
    full_name NVARCHAR(100),
    phone_number VARCHAR(10),
    address NVARCHAR(100),
    total_money DECIMAL(16 , 0 ),
    money_reduced DECIMAL(16 , 0 ),
    money_after DECIMAL(16 , 0 ),
    ship_date BIGINT,
    receive_date BIGINT,
    money_ship DECIMAL(16 , 0 ),
    confirmation_date BIGINT,
    type BOOLEAN DEFAULT 0,
    note NVARCHAR(100),
    customer_amount DECIMAL(16 , 0 ),
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    status INT,
    desired_receipt_date BIGINT,
    complete_date BIGINT,
    FOREIGN KEY (id_customer)
        REFERENCES customer (id),
    FOREIGN KEY (id_voucher)
        REFERENCES voucher (id)
);
CREATE TABLE bill_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_bill BIGINT,
    id_staff INT,
    status_bill INT,
    note NVARCHAR(100),
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    FOREIGN KEY (id_bill)
        REFERENCES bill (id),
    FOREIGN KEY (id_staff)
        REFERENCES staff (id)
);
CREATE TABLE bill_detail (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_product_detail BIGINT,
    id_bill BIGINT,
    quantity INT,
    price DECIMAL(16 , 0 ),
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    status INT,
    FOREIGN KEY (id_bill)
        REFERENCES bill (id),
    FOREIGN KEY (id_product_detail)
        REFERENCES product_detail (id)
);
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_customer INT,
    create_at BIGINT,
    FOREIGN KEY (id_customer)
        REFERENCES customer (id)
);
CREATE TABLE cart_detail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cart INT,
    id_product_detail BIGINT,
    quantity INT,
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    FOREIGN KEY (id_cart)
        REFERENCES cart (id),
    FOREIGN KEY (id_product_detail)
        REFERENCES product_detail (id)
);
CREATE TABLE transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_bill BIGINT,
    id_staff INT,
    type BOOLEAN DEFAULT 0,
    total_money DECIMAL(16 , 0 ),
    payment_method INT,
    note NVARCHAR(250),
    created_at BIGINT,
    updated_at BIGINT,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    deleted BOOLEAN DEFAULT 0,
    status INT,
    FOREIGN KEY (id_bill)
        REFERENCES bill (id),
    FOREIGN KEY (id_staff)
        REFERENCES staff (id)
);






