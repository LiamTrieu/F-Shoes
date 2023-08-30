create database DATN_Website_FShoes;
use DATN_Website_FShoes;

CREATE TABLE size (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    deleted BOOLEAN DEFAULT 0
);

CREATE TABLE brand (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    deleted BOOLEAN DEFAULT 0
);
CREATE TABLE color (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code CHAR(10) NOT NULL,
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    deleted BOOLEAN DEFAULT 0
);
CREATE TABLE sole (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    deleted BOOLEAN DEFAULT 0
);
CREATE TABLE material (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    deleted BOOLEAN DEFAULT 0
);
CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    deleted BOOLEAN DEFAULT 0
);
CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    deleted BOOLEAN DEFAULT 0
);
CREATE TABLE promotion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code CHAR(30) NOT NULL,
    name NVARCHAR(100) NOT NULL,
    time_start DATEtime NOT NULL,
    time_end DATEtime NOT NULL,
    value DECIMAL(16 , 0 ) NOT NULL,
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    status INT
);
CREATE TABLE staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    date_birth DATE NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    gender BOOLEAN NOT NULL,
    password VARCHAR(100) NOT NULL,
    avatar VARCHAR(100) NOT NULL,
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    status INT
);
CREATE TABLE customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    date_birth DATE NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    gender BOOLEAN NOT NULL,
    password VARCHAR(100) NOT NULL,
    avatar VARCHAR(100) NOT NULL,
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    status INT
);
CREATE TABLE voucher (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code CHAR(30) NOT NULL,
    name NVARCHAR(100) NOT NULL,
    value DECIMAL(16 , 0 ) NOT NULL,
    maximum_value DECIMAL(16 , 0 ) NOT NULL,
    type BOOLEAN DEFAULT 0 NOT NULL,
    minimum_amount DECIMAL(16 , 0 ) NOT NULL,
    quantity INT NOT NULL,
    start_date DATEtime NOT NULL,
    end_date DATEtime NOT NULL,
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    status INT
);
CREATE TABLE product_detail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_brand INT ,
    id_sole INT,
    id_material INT ,
    id_category INT ,
    id_product INT ,
    id_size INT ,
    code CHAR(30) NOT NULL,
    price DECIMAL(16 , 0 ) NOT NULL,
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    deleted BOOLEAN DEFAULT 0,
    value INT,
    FOREIGN KEY (id_brand) REFERENCES brand(id),
     FOREIGN KEY (id_sole) REFERENCES sole(id),
      FOREIGN KEY (id_material) REFERENCES material(id),
       FOREIGN KEY (id_category) REFERENCES category(id),
        FOREIGN KEY (id_product) REFERENCES product(id),
        FOREIGN KEY (id_size) REFERENCES size(id)
);
CREATE TABLE image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    deleted BOOLEAN DEFAULT 0,
    id_product_detail INT ,
    FOREIGN KEY (id_product_detail)
        REFERENCES product_detail(id)
);

CREATE TABLE product_promotion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_product_detail INT ,
    id_promotion INT ,
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    status INT,
    FOREIGN KEY (id_product_detail)
        REFERENCES product_detail(id),
    FOREIGN KEY (id_promotion)
        REFERENCES promotion (id)
);


CREATE TABLE customer_voucher (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_customer INT ,
    id_voucher INT ,
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    status INT,
    FOREIGN KEY (id_voucher)
        REFERENCES voucher (id),
    FOREIGN KEY (id_customer)
        REFERENCES customer (id)
);

CREATE TABLE address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_customer INT ,
    name NVARCHAR(100) NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    specific_address NVARCHAR(100) NOT NULL,
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    status INT,
    FOREIGN KEY (id_customer)
        REFERENCES customer (id)
);

CREATE TABLE bill (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_voucher INT ,
    id_staff INT ,
    id_customer INT ,
    code CHAR(30),
    full_name NVARCHAR(100),
    phone_number VARCHAR(10),
    address NVARCHAR(100),
    total_money DECIMAL(16 , 0 ),
    money_reduced DECIMAL(16 , 0 ),
    money_after DECIMAL(16 , 0 ),
    ship_date DATE,
    receive_date DATE,
    money_ship DECIMAL(16 , 0 ),
    confirmation_date DATE,
    type BOOLEAN DEFAULT 0,
    note NVARCHAR(100),
    customer_amount DECIMAL(16 , 0 ),
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    status INT,
    desired_receipt_date DATE,
    complete_date DATE,
    FOREIGN KEY (id_customer)
        REFERENCES customer (id),
    FOREIGN KEY (id_staff)
        REFERENCES staff (id),
    FOREIGN KEY (id_voucher)
        REFERENCES voucher (id)
);
CREATE TABLE bill_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_bill INT ,
    status_bill INT,
    note NVARCHAR(100),
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    FOREIGN KEY (id_bill)
        REFERENCES bill (id)
);
CREATE TABLE bill_detail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_product_detail INT ,
    id_bill INT ,
    quantity INT,
    price DECIMAL(16 , 0 ),
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    status INT,
    FOREIGN KEY (id_bill)
        REFERENCES bill (id),
    FOREIGN KEY (id_product_detail)
        REFERENCES product_detail (id)
);
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_customer INT ,
    create_at DATE,
    FOREIGN KEY (id_customer)
        REFERENCES customer (id)
);
CREATE TABLE cart_detail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cart INT ,
    id_product_detail INT ,
    quantity INT,
    created_at DATE,
    updated_at DATE,
    created_by nvarchar(100),
    updated_by nvarchar(100),
    FOREIGN KEY (id_cart)
        REFERENCES cart (id),
    FOREIGN KEY (id_product_detail)
        REFERENCES product_detail (id)
);
CREATE TABLE transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_bill INT,
    type BOOLEAN DEFAULT 0,
    total_money DECIMAL(16 , 0 ),
    created_at DATE,
    updated_at DATE,
    created_by NVARCHAR(100),
    updated_by NVARCHAR(100),
    deleted BOOLEAN DEFAULT 0,
    FOREIGN KEY (id_bill)
        REFERENCES bill (id)
);






