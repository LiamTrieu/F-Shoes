package com.fshoestool;

import com.fshoes.entity.Address;
import com.fshoes.entity.Bill;
import com.fshoes.entity.BillDetail;
import com.fshoes.entity.BillHistory;
import com.fshoes.entity.Brand;
import com.fshoes.entity.Cart;
import com.fshoes.entity.CartDetail;
import com.fshoes.entity.Category;
import com.fshoes.entity.Color;
import com.fshoes.entity.Customer;
import com.fshoes.entity.CustomerVoucher;
import com.fshoes.entity.Image;
import com.fshoes.entity.Material;
import com.fshoes.entity.Product;
import com.fshoes.entity.ProductDetail;
import com.fshoes.entity.ProductPromotion;
import com.fshoes.entity.Promotion;
import com.fshoes.entity.Size;
import com.fshoes.entity.Sole;
import com.fshoes.entity.Staff;
import com.fshoes.entity.Transaction;
import com.fshoes.entity.Voucher;
import com.fshoes.infrastructure.constant.PaymentMethod;
import com.fshoes.infrastructure.constant.Status;
import com.fshoes.infrastructure.constant.StatusBill;
import com.fshoes.infrastructure.constant.StatusBillDetail;
import com.fshoes.infrastructure.constant.StatusVoucher;
import com.fshoes.infrastructure.constant.TypeBill;
import com.fshoes.infrastructure.constant.TypeTransaction;
import com.fshoes.infrastructure.constant.TypeVoucher;
import com.fshoes.repository.AddressRepository;
import com.fshoes.repository.BillDetailRepository;
import com.fshoes.repository.BillHistoryRepository;
import com.fshoes.repository.BillRepository;
import com.fshoes.repository.BrandRepository;
import com.fshoes.repository.CartDetailRepository;
import com.fshoes.repository.CartRepository;
import com.fshoes.repository.CategoryRepository;
import com.fshoes.repository.ColorRepository;
import com.fshoes.repository.CustomerRepository;
import com.fshoes.repository.CustomerVoucherRepository;
import com.fshoes.repository.ImageRepository;
import com.fshoes.repository.MaterialRepository;
import com.fshoes.repository.ProductDetailRepository;
import com.fshoes.repository.ProductPromotionRepository;
import com.fshoes.repository.ProductRepository;
import com.fshoes.repository.PromotionRepository;
import com.fshoes.repository.SizeRepository;
import com.fshoes.repository.SoleRepository;
import com.fshoes.repository.StaffRepository;
import com.fshoes.repository.TransactionRepository;
import com.fshoes.repository.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.math.BigDecimal;
import java.util.Calendar;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.fshoes.repository")
public class DBGenerator implements CommandLineRunner {

    @Autowired
    private CartDetailRepository cartDetailRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private BillHistoryRepository billHistoryRepository;
    @Autowired
    private ProductPromotionRepository productPromotionRepository;

    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private BillDetailRepository billDetailRepository;

    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private ProductDetailRepository productDetailRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private MaterialRepository materialRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SizeRepository sizeRepository;
    @Autowired
    private SoleRepository soleRepository;
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private CustomerVoucherRepository customerVoucherRepository;
    @Autowired
    private VoucherRepository voucherRepository;
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private PromotionRepository promotionRepository;
    @Autowired
    private CustomerRepository customerRepository;

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(DBGenerator.class);
        ctx.close();
    }

    public void run(String... args) throws Exception {
        //Customer
        Customer customer1 = Customer.builder().fullName("Nguyễn Văn A").dateBirth(System.currentTimeMillis()).phoneNumber("0123456789").email("customer1@example.com").gender(true).password("password1").avatar(null).status(Status.HOAT_DONG).build();
        customer1.setId(customerRepository.save(customer1).getId());

        Customer customer2 = Customer.builder().fullName("Nguyễn Văn B").dateBirth(System.currentTimeMillis()).phoneNumber("0234567890").email("customer2@example.com").gender(false).password("password2").avatar(null).status(Status.HOAT_DONG).build();
        customer2.setId(customerRepository.save(customer2).getId());

        Customer customer3 = Customer.builder().fullName("Nguyễn Văn C").dateBirth(System.currentTimeMillis()).phoneNumber("0345678901").email("customer3@example.com").gender(true).password("password3").avatar(null).status(Status.HOAT_DONG).build();
        customer3.setId(customerRepository.save(customer3).getId());

        Customer customer4 = Customer.builder().fullName("Nguyễn Văn D").dateBirth(System.currentTimeMillis()).phoneNumber("0456789012").email("customer4@example.com").gender(false).password("password4").avatar(null).status(Status.HOAT_DONG).build();
        customer4.setId(customerRepository.save(customer4).getId());

        Customer customer5 = Customer.builder().fullName("Nguyễn Văn E").dateBirth(System.currentTimeMillis()).phoneNumber("0567890123").email("customer5@example.com").gender(true).password("password5").avatar(null).status(Status.HOAT_DONG).build();
        customer5.setId(customerRepository.save(customer5).getId());
        //Customer

        //Promotion
        Promotion promotion1 = Promotion.builder().name("Promotion 1").timeStart(System.currentTimeMillis()).timeEnd(System.currentTimeMillis() + 86400000).type(true).value(50).status(StatusVoucher.DANG_DIEN_RA).build();
        promotion1.setId(promotionRepository.save(promotion1).getId());

        Promotion promotion2 = Promotion.builder().name("Promotion 2").timeStart(System.currentTimeMillis()).timeEnd(System.currentTimeMillis() + 86400000).type(true).value(60).status(StatusVoucher.DANG_DIEN_RA).build();
        promotion2.setId(promotionRepository.save(promotion2).getId());

        Promotion promotion3 = Promotion.builder().name("Promotion 3").timeStart(System.currentTimeMillis()).timeEnd(System.currentTimeMillis() + 86400000).type(true).value(70).status(StatusVoucher.DANG_DIEN_RA).build();
        promotion3.setId(promotionRepository.save(promotion3).getId());

        Promotion promotion4 = Promotion.builder().name("Promotion 4").timeStart(System.currentTimeMillis()).timeEnd(System.currentTimeMillis() + 86400000).type(true).value(80).status(StatusVoucher.DANG_DIEN_RA).build();
        promotion4.setId(promotionRepository.save(promotion4).getId());

        Promotion promotion5 = Promotion.builder().name("Promotion 5").timeStart(System.currentTimeMillis()).timeEnd(System.currentTimeMillis() + 86400000).type(true).value(90).status(StatusVoucher.DANG_DIEN_RA).build();
        promotion5.setId(promotionRepository.save(promotion5).getId());
        //Promotion

        //Staff
        Staff staff1 = Staff.builder().fullName("Lê Thị A").dateBirth(System.currentTimeMillis()).CitizenId("1234567890123456").phoneNumber("0123456789").email("staff1@example.com").gender(true).password("password1").avatar(null).role(0).status(Status.HOAT_DONG).build();
        staff1.setId(staffRepository.save(staff1).getId());

        Staff staff2 = Staff.builder().fullName("Lê Thị B").dateBirth(System.currentTimeMillis()).CitizenId("2345678901234567").phoneNumber("0123456788").email("staff2@example.com").gender(true).password("password2").avatar(null).role(0).status(Status.HOAT_DONG).build();
        staff2.setId(staffRepository.save(staff2).getId());

        Staff staff3 = Staff.builder().fullName("Lê Thị C").dateBirth(System.currentTimeMillis()).CitizenId("3456789012345678").phoneNumber("0123456787").email("staff3@example.com").gender(true).password("password3").avatar(null).role(0).status(Status.HOAT_DONG).build();
        staff3.setId(staffRepository.save(staff3).getId());

        Staff staff4 = Staff.builder().fullName("Lê Thị D").dateBirth(System.currentTimeMillis()).CitizenId("4567890123456789").phoneNumber("0123456786").email("staff4@example.com").gender(true).password("password4").avatar(null).role(0).status(Status.HOAT_DONG).build();
        staff4.setId(staffRepository.save(staff4).getId());

        Staff staff5 = Staff.builder().fullName("Lê Thị E").dateBirth(System.currentTimeMillis()).CitizenId("5678901234567890").phoneNumber("0123456785").email("staff5@example.com").gender(true).password("password5").avatar(null).role(0).status(Status.HOAT_DONG).build();
        staff5.setId(staffRepository.save(staff5).getId());
        //Staff

        //Voucher
        Voucher voucher1 = Voucher.builder().code("VC12345").name("Voucher 1").value(BigDecimal.valueOf(25)).maximumValue(BigDecimal.valueOf(100)).type(TypeVoucher.CA_NHAN).minimumAmount(BigDecimal.valueOf(50)).quantity(10).startDate(System.currentTimeMillis()).endDate(System.currentTimeMillis() + 604800000).status(StatusVoucher.DANG_DIEN_RA).build();
        voucher1.setId(voucherRepository.save(voucher1).getId());

        Voucher voucher2 = Voucher.builder().code("VC23456").name("Voucher 2").value(BigDecimal.valueOf(30)).maximumValue(BigDecimal.valueOf(100)).type(TypeVoucher.CA_NHAN).minimumAmount(BigDecimal.valueOf(50)).quantity(10).startDate(System.currentTimeMillis()).endDate(System.currentTimeMillis() + 604800000).status(StatusVoucher.DANG_DIEN_RA).build();
        voucher2.setId(voucherRepository.save(voucher2).getId());

        Voucher voucher3 = Voucher.builder().code("VC34567").name("Voucher 3").value(BigDecimal.valueOf(40)).maximumValue(BigDecimal.valueOf(100)).type(TypeVoucher.CA_NHAN).minimumAmount(BigDecimal.valueOf(50)).quantity(10).startDate(System.currentTimeMillis()).endDate(System.currentTimeMillis() + 604800000).status(StatusVoucher.DANG_DIEN_RA).build();
        voucher3.setId(voucherRepository.save(voucher3).getId());

        Voucher voucher4 = Voucher.builder().code("VC45678").name("Voucher 4").value(BigDecimal.valueOf(50)).maximumValue(BigDecimal.valueOf(100)).type(TypeVoucher.CA_NHAN).minimumAmount(BigDecimal.valueOf(50)).quantity(10).startDate(System.currentTimeMillis()).endDate(System.currentTimeMillis() + 604800000).status(StatusVoucher.DANG_DIEN_RA).build();
        voucher4.setId(voucherRepository.save(voucher4).getId());

        Voucher voucher5 = Voucher.builder().code("VC56789").name("Voucher 5").value(BigDecimal.valueOf(60)).maximumValue(BigDecimal.valueOf(100)).type(TypeVoucher.CA_NHAN).minimumAmount(BigDecimal.valueOf(50)).quantity(10).startDate(System.currentTimeMillis()).endDate(System.currentTimeMillis() + 604800000).status(StatusVoucher.DANG_DIEN_RA).build();
        voucher5.setId(voucherRepository.save(voucher5).getId());

        Voucher voucher6 = Voucher.builder().code("VC67890").name("Voucher 6").value(BigDecimal.valueOf(25)).maximumValue(BigDecimal.valueOf(100)).type(TypeVoucher.TAT_CA).minimumAmount(BigDecimal.valueOf(50)).quantity(10).startDate(System.currentTimeMillis()).endDate(System.currentTimeMillis() + 604800000).status(StatusVoucher.DANG_DIEN_RA).build();
        voucher6.setId(voucherRepository.save(voucher6).getId());

        Voucher voucher7 = Voucher.builder().code("VC78901").name("Voucher 7").value(BigDecimal.valueOf(30)).maximumValue(BigDecimal.valueOf(100)).type(TypeVoucher.TAT_CA).minimumAmount(BigDecimal.valueOf(50)).quantity(10).startDate(System.currentTimeMillis()).endDate(System.currentTimeMillis() + 604800000).status(StatusVoucher.DANG_DIEN_RA).build();
        voucher7.setId(voucherRepository.save(voucher7).getId());

        Voucher voucher8 = Voucher.builder().code("VC89012").name("Voucher 8").value(BigDecimal.valueOf(40)).maximumValue(BigDecimal.valueOf(100)).type(TypeVoucher.TAT_CA).minimumAmount(BigDecimal.valueOf(50)).quantity(10).startDate(System.currentTimeMillis()).endDate(System.currentTimeMillis() + 604800000).status(StatusVoucher.DANG_DIEN_RA).build();
        voucher8.setId(voucherRepository.save(voucher8).getId());

        Voucher voucher9 = Voucher.builder().code("VC90123").name("Voucher 9").value(BigDecimal.valueOf(50)).maximumValue(BigDecimal.valueOf(100)).type(TypeVoucher.TAT_CA).minimumAmount(BigDecimal.valueOf(50)).quantity(10).startDate(System.currentTimeMillis()).endDate(System.currentTimeMillis() + 604800000).status(StatusVoucher.DANG_DIEN_RA).build();
        voucher9.setId(voucherRepository.save(voucher9).getId());

        Voucher voucher10 = Voucher.builder().code("VC01234").name("Voucher 10").value(BigDecimal.valueOf(60)).maximumValue(BigDecimal.valueOf(100)).type(TypeVoucher.TAT_CA).minimumAmount(BigDecimal.valueOf(50)).quantity(10).startDate(System.currentTimeMillis()).endDate(System.currentTimeMillis() + 604800000).status(StatusVoucher.DANG_DIEN_RA).build();
        voucher10.setId(voucherRepository.save(voucher10).getId());
        //Voucher

        //CustomerVoucher
        //Cá nhân
        CustomerVoucher customerVoucher1 = CustomerVoucher.builder().customer(customer1).voucher(voucher1).build();
        customerVoucher1.setId(customerVoucherRepository.save(customerVoucher1).getId());

        CustomerVoucher customerVoucher2 = CustomerVoucher.builder().customer(customer2).voucher(voucher2).build();
        customerVoucher2.setId(customerVoucherRepository.save(customerVoucher2).getId());

        CustomerVoucher customerVoucher3 = CustomerVoucher.builder().customer(customer3).voucher(voucher3).build();
        customerVoucher3.setId(customerVoucherRepository.save(customerVoucher3).getId());

        CustomerVoucher customerVoucher4 = CustomerVoucher.builder().customer(customer4).voucher(voucher4).build();
        customerVoucher4.setId(customerVoucherRepository.save(customerVoucher4).getId());

        CustomerVoucher customerVoucher5 = CustomerVoucher.builder().customer(customer5).voucher(voucher5).build();
        customerVoucher5.setId(customerVoucherRepository.save(customerVoucher5).getId());
        //cá nhân

        //tất cả
        CustomerVoucher customerVoucher6 = CustomerVoucher.builder().customer(customer1).voucher(voucher6).build();
        customerVoucher6.setId(customerVoucherRepository.save(customerVoucher6).getId());

        CustomerVoucher customerVoucher7 = CustomerVoucher.builder().customer(customer1).voucher(voucher7).build();
        customerVoucher7.setId(customerVoucherRepository.save(customerVoucher7).getId());

        CustomerVoucher customerVoucher8 = CustomerVoucher.builder().customer(customer1).voucher(voucher8).build();
        customerVoucher8.setId(customerVoucherRepository.save(customerVoucher8).getId());

        CustomerVoucher customerVoucher9 = CustomerVoucher.builder().customer(customer1).voucher(voucher9).build();
        customerVoucher9.setId(customerVoucherRepository.save(customerVoucher9).getId());

        CustomerVoucher customerVoucher10 = CustomerVoucher.builder().customer(customer1).voucher(voucher10).build();
        customerVoucher10.setId(customerVoucherRepository.save(customerVoucher10).getId());

        CustomerVoucher customerVoucher11 = CustomerVoucher.builder().customer(customer2).voucher(voucher6).build();
        customerVoucher11.setId(customerVoucherRepository.save(customerVoucher11).getId());

        CustomerVoucher customerVoucher12 = CustomerVoucher.builder().customer(customer2).voucher(voucher7).build();
        customerVoucher12.setId(customerVoucherRepository.save(customerVoucher12).getId());

        CustomerVoucher customerVoucher13 = CustomerVoucher.builder().customer(customer2).voucher(voucher8).build();
        customerVoucher13.setId(customerVoucherRepository.save(customerVoucher13).getId());

        CustomerVoucher customerVoucher14 = CustomerVoucher.builder().customer(customer2).voucher(voucher9).build();
        customerVoucher14.setId(customerVoucherRepository.save(customerVoucher14).getId());

        CustomerVoucher customerVoucher15 = CustomerVoucher.builder().customer(customer2).voucher(voucher10).build();
        customerVoucher15.setId(customerVoucherRepository.save(customerVoucher15).getId());

        CustomerVoucher customerVoucher16 = CustomerVoucher.builder().customer(customer3).voucher(voucher6).build();
        customerVoucher16.setId(customerVoucherRepository.save(customerVoucher16).getId());

        CustomerVoucher customerVoucher17 = CustomerVoucher.builder().customer(customer3).voucher(voucher7).build();
        customerVoucher17.setId(customerVoucherRepository.save(customerVoucher17).getId());

        CustomerVoucher customerVoucher18 = CustomerVoucher.builder().customer(customer3).voucher(voucher8).build();
        customerVoucher18.setId(customerVoucherRepository.save(customerVoucher18).getId());

        CustomerVoucher customerVoucher19 = CustomerVoucher.builder().customer(customer3).voucher(voucher9).build();
        customerVoucher19.setId(customerVoucherRepository.save(customerVoucher19).getId());

        CustomerVoucher customerVoucher20 = CustomerVoucher.builder().customer(customer3).voucher(voucher10).build();
        customerVoucher20.setId(customerVoucherRepository.save(customerVoucher20).getId());

        CustomerVoucher customerVoucher21 = CustomerVoucher.builder().customer(customer4).voucher(voucher6).build();
        customerVoucher21.setId(customerVoucherRepository.save(customerVoucher21).getId());

        CustomerVoucher customerVoucher22 = CustomerVoucher.builder().customer(customer4).voucher(voucher7).build();
        customerVoucher22.setId(customerVoucherRepository.save(customerVoucher22).getId());

        CustomerVoucher customerVoucher23 = CustomerVoucher.builder().customer(customer4).voucher(voucher8).build();
        customerVoucher23.setId(customerVoucherRepository.save(customerVoucher23).getId());

        CustomerVoucher customerVoucher24 = CustomerVoucher.builder().customer(customer4).voucher(voucher9).build();
        customerVoucher24.setId(customerVoucherRepository.save(customerVoucher24).getId());

        CustomerVoucher customerVoucher25 = CustomerVoucher.builder().customer(customer4).voucher(voucher10).build();
        customerVoucher25.setId(customerVoucherRepository.save(customerVoucher25).getId());

        CustomerVoucher customerVoucher26 = CustomerVoucher.builder().customer(customer5).voucher(voucher6).build();
        customerVoucher26.setId(customerVoucherRepository.save(customerVoucher26).getId());

        CustomerVoucher customerVoucher27 = CustomerVoucher.builder().customer(customer5).voucher(voucher7).build();
        customerVoucher27.setId(customerVoucherRepository.save(customerVoucher27).getId());

        CustomerVoucher customerVoucher28 = CustomerVoucher.builder().customer(customer5).voucher(voucher8).build();
        customerVoucher28.setId(customerVoucherRepository.save(customerVoucher28).getId());

        CustomerVoucher customerVoucher29 = CustomerVoucher.builder().customer(customer5).voucher(voucher9).build();
        customerVoucher29.setId(customerVoucherRepository.save(customerVoucher29).getId());

        CustomerVoucher customerVoucher30 = CustomerVoucher.builder().customer(customer5).voucher(voucher10).build();
        customerVoucher30.setId(customerVoucherRepository.save(customerVoucher30).getId());
        //tất cả
        //CustomerVoucher

        //Address
        Address address1 = Address.builder().name("Địa chỉ 1").phoneNumber("0123456789").email("vietnam1@example.com").specificAddress("123 Đường A, Quận 1, TP.HCM").type(true).customer(customer1).build();
        address1.setId(addressRepository.save(address1).getId());

        Address address2 = Address.builder().name("Địa chỉ 2").phoneNumber("0234567890").email("vietnam2@example.com").specificAddress("456 Đường B, Quận 2, TP.HCM").type(true).customer(customer2).build();
        address2.setId(addressRepository.save(address2).getId());

        Address address3 = Address.builder().name("Địa chỉ 3").phoneNumber("0345678901").email("vietnam3@example.com").specificAddress("789 Đường C, Quận 3, TP.HCM").type(true).customer(customer3).build();
        address3.setId(addressRepository.save(address3).getId());

        Address address4 = Address.builder().name("Địa chỉ 4").phoneNumber("0456789012").email("vietnam4@example.com").specificAddress("101 Đường D, Quận 4, TP.HCM").type(true).customer(customer4).build();
        address4.setId(addressRepository.save(address4).getId());

        Address address5 = Address.builder().name("Địa chỉ 5").phoneNumber("0567890123").email("vietnam5@example.com").specificAddress("111 Đường E, Quận 5, TP.HCM").type(true).customer(customer5).build();
        address5.setId(addressRepository.save(address5).getId());
        //Addesss

        //bill
        Bill bill1 = Bill.builder().code("HD001").fullName("Nguyễn Văn A").phoneNumber("0123456789").address("123 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(12350000.0)).moneyReduced(BigDecimal.valueOf(100000.0)).moneyAfter(BigDecimal.valueOf(12250000.0)).shipDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).receiveDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).moneyShip(BigDecimal.valueOf(30000.0)).confirmationDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).type(TypeBill.DAT_HANG).note("Đặt hành").customerAmount(BigDecimal.valueOf(900.0)).desiredReceiptDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).completeDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).status(StatusBill.HOAN_THANH).customer(customer1).voucher(null).build();
        bill1.setId(billRepository.save(bill1).getId());

        Bill bill2 = Bill.builder().code("HD002").fullName("Nguyễn Văn B").phoneNumber("0123456789").address("124 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(12500000.0)).moneyReduced(BigDecimal.valueOf(200000.0)).moneyAfter(BigDecimal.valueOf(12300000.0)).shipDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).receiveDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).moneyShip(BigDecimal.valueOf(25000.0)).confirmationDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).type(TypeBill.DAT_HANG).note("Đặt hàng online").customerAmount(BigDecimal.valueOf(12300000.0)).desiredReceiptDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).completeDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).status(StatusBill.HOAN_THANH).customer(customer2).voucher(null).build();
        bill2.setId(billRepository.save(bill2).getId());

        Bill bill3 = Bill.builder().code("HD003").fullName("Nguyễn Văn C").phoneNumber("0123456789").address("125 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(13000000.0)).moneyReduced(BigDecimal.valueOf(300000.0)).moneyAfter(BigDecimal.valueOf(12700000.0)).shipDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).receiveDate(null).moneyShip(BigDecimal.valueOf(20000.0)).confirmationDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).type(TypeBill.DAT_HANG).note("Đặt hàng online").customerAmount(BigDecimal.valueOf(12700000.0)).desiredReceiptDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).completeDate(null).status(StatusBill.DANG_VAN_CHUYEN).customer(customer3).voucher(null).build();
        bill3.setId(billRepository.save(bill3).getId());

        Bill bill4 = Bill.builder().code("HD004").fullName("Nguyễn Văn D").phoneNumber("0123456789").address("125 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(15000000.0)).moneyReduced(BigDecimal.valueOf(0.0)).moneyAfter(BigDecimal.valueOf(15000000.0)).shipDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).receiveDate(null).moneyShip(BigDecimal.valueOf(20000.0)).confirmationDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).type(TypeBill.DAT_HANG).note("Đặt hàng online").customerAmount(BigDecimal.valueOf(15000000.0)).desiredReceiptDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).completeDate(null).status(StatusBill.DANG_VAN_CHUYEN).customer(customer3).voucher(null).build();
        bill4.setId(billRepository.save(bill4).getId());

        Bill bill5 = Bill.builder().code("HD005").fullName("Nguyễn Văn E").phoneNumber("0123456789").address("127 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(15000000.0)).moneyReduced(BigDecimal.valueOf(500000.0)).moneyAfter(BigDecimal.valueOf(14500000.0)).shipDate(null).receiveDate(null).moneyShip(BigDecimal.valueOf(0.0)).confirmationDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).type(TypeBill.DAT_HANG).note("Đặt hàng").customerAmount(BigDecimal.valueOf(14500000.0)).desiredReceiptDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).completeDate(null).status(StatusBill.DA_XAC_NHAN).customer(customer5).voucher(null).build();
        bill5.setId(billRepository.save(bill5).getId());

        Bill bill6 = Bill.builder().code("HD006").fullName("Nguyễn Văn F").phoneNumber("0123456789").address("128 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(16000000.0)).moneyReduced(BigDecimal.valueOf(600000.0)).moneyAfter(BigDecimal.valueOf(15400000.0)).shipDate(null).receiveDate(null).moneyShip(BigDecimal.valueOf(0.0)).confirmationDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).type(TypeBill.DAT_HANG).note("Đặt hàng online").customerAmount(BigDecimal.valueOf(15400000.0)).desiredReceiptDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).completeDate(null).status(StatusBill.DA_XAC_NHAN).customer(customer2).voucher(null).build();
        bill6.setId(billRepository.save(bill6).getId());

        Bill bill7 = Bill.builder().code("HD007").fullName("Nguyễn Văn G").phoneNumber("0123456789").address("129 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(17000000.0)).moneyReduced(BigDecimal.valueOf(700000.0)).moneyAfter(BigDecimal.valueOf(16300000.0)).shipDate(null).receiveDate(null).moneyShip(BigDecimal.valueOf(0.0)).confirmationDate(null).type(TypeBill.DAT_HANG).note("Đặt online").customerAmount(BigDecimal.valueOf(0.0)).desiredReceiptDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).completeDate(null).status(StatusBill.CHO_XAC_NHAN).customer(customer5).voucher(null).build();
        bill7.setId(billRepository.save(bill7).getId());

        Bill bill8 = Bill.builder().code("HD008").fullName("Nguyễn Văn H").phoneNumber("0123456789").address("130 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(18000000.0)).moneyReduced(BigDecimal.valueOf(800000.0)).moneyAfter(BigDecimal.valueOf(17200000.0)).shipDate(null).receiveDate(null).moneyShip(BigDecimal.valueOf(0.0)).confirmationDate(null).type(TypeBill.DAT_HANG).note("Đặt hàng online").customerAmount(BigDecimal.valueOf(0.0)).desiredReceiptDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).completeDate(null).status(StatusBill.CHO_XAC_NHAN).customer(customer1).voucher(null).build();
        bill8.setId(billRepository.save(bill8).getId());

        Bill bill9 = Bill.builder().code("HD009").fullName("Nguyễn Văn I").phoneNumber("0123456789").address("131 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(19000000.0)).moneyReduced(BigDecimal.valueOf(900000.0)).moneyAfter(BigDecimal.valueOf(18100000.0)).shipDate(null).receiveDate(null).moneyShip(BigDecimal.valueOf(80000.0)).confirmationDate(System.currentTimeMillis() + 30 * 60 * 1000).type(TypeBill.TAI_QUAY).note("Mua tại quầy").customerAmount(BigDecimal.valueOf(0.0)).desiredReceiptDate(System.currentTimeMillis() - (System.currentTimeMillis() % (24 * 60 * 60 * 1000))).completeDate(null).status(StatusBill.CHO_THANH_TOAN).customer(null).voucher(null).build();
        bill9.setId(billRepository.save(bill9).getId());

        Bill bill10 = Bill.builder().code("HD010").fullName("Nguyễn Văn J").phoneNumber("0123456789").address("142 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(20000000.0)).moneyReduced(BigDecimal.valueOf(1000000.0)).moneyAfter(BigDecimal.valueOf(19000000.0)).shipDate(null).receiveDate(null).moneyShip(BigDecimal.valueOf(0.0)).confirmationDate(System.currentTimeMillis() + 30 * 60 * 1000).type(TypeBill.TAI_QUAY).note("Mua tại quầy").customerAmount(BigDecimal.valueOf(0.0)).desiredReceiptDate(System.currentTimeMillis() - (System.currentTimeMillis() % (24 * 60 * 60 * 1000))).completeDate(null).status(StatusBill.CHO_THANH_TOAN).customer(null).voucher(null).build();
        bill10.setId(billRepository.save(bill10).getId());

        Bill bill11 = Bill.builder().code("HD011").fullName("Nguyễn Văn Nam").phoneNumber("0123456789").address("142 Đường ABC, Quận DEF, Thành phố HCM").totalMoney(BigDecimal.valueOf(20000000.0)).moneyReduced(BigDecimal.valueOf(1000000.0)).moneyAfter(BigDecimal.valueOf(19000000.0)).shipDate(null).receiveDate(null).moneyShip(BigDecimal.valueOf(0.0)).confirmationDate(System.currentTimeMillis() + 30 * 60 * 1000).type(TypeBill.TAI_QUAY).note("Mua tại quầy").customerAmount(BigDecimal.valueOf(19000000.0)).desiredReceiptDate(System.currentTimeMillis() - (System.currentTimeMillis() % (24 * 60 * 60 * 1000))).completeDate(null).status(StatusBill.DA_THANH_TOAN).customer(null).voucher(null).build();
        bill11.setId(billRepository.save(bill11).getId());

        Bill bill12 = Bill.builder().code("HD012").fullName("Nguyễn Văn Nam").phoneNumber("0123456789").address("145 Đường ABC, Quận DEF, Thành phố HN").totalMoney(BigDecimal.valueOf(20000000.0)).moneyReduced(BigDecimal.valueOf(0.0)).moneyAfter(BigDecimal.valueOf(20000000.0)).shipDate(null).receiveDate(null).moneyShip(BigDecimal.valueOf(0.0)).confirmationDate(System.currentTimeMillis() + 30 * 60 * 1000).type(TypeBill.TAI_QUAY).note("Mua tại quầy").customerAmount(BigDecimal.valueOf(20000000.0)).desiredReceiptDate(System.currentTimeMillis() - (System.currentTimeMillis() % (24 * 60 * 60 * 1000))).completeDate(null).status(StatusBill.DA_THANH_TOAN).customer(null).voucher(null).build();
        bill12.setId(billRepository.save(bill12).getId());

        Bill bill13 = Bill.builder().code("HD013").fullName("Nguyễn Văn B").phoneNumber("0123456789").address("145 Đường ABC, Quận DEF, Thành phố ĐN").totalMoney(BigDecimal.valueOf(20000000.0)).moneyReduced(BigDecimal.valueOf(1000000.0)).moneyAfter(BigDecimal.valueOf(19000000.0)).shipDate(null).receiveDate(null).moneyShip(BigDecimal.valueOf(0.0)).confirmationDate(System.currentTimeMillis() + 30 * 60 * 1000).type(TypeBill.DAT_HANG).note("Đặt online").customerAmount(BigDecimal.valueOf(0.0)).desiredReceiptDate(System.currentTimeMillis() - (System.currentTimeMillis() % (24 * 60 * 60 * 1000))).completeDate(null).status(StatusBill.DA_HUY).customer(customer1).voucher(null).build();
        bill13.setId(billRepository.save(bill13).getId());
        //bill

        //Sole
        Sole sole1 = Sole.builder().name("Đế cao su").build();
        sole1.setId(soleRepository.save(sole1).getId());
        Sole sole2 = Sole.builder().name("Đế da").build();
        sole2.setId(soleRepository.save(sole2).getId());
        Sole sole3 = Sole.builder().name("Đế vàng").build();
        sole3.setId(soleRepository.save(sole3).getId());
        Sole sole4 = Sole.builder().name("Đế sắt").build();
        sole4.setId(soleRepository.save(sole4).getId());
        Sole sole5 = Sole.builder().name("Đế nhựa").build();
        sole5.setId(soleRepository.save(sole5).getId());
        //Sole

        //Size
        Size size1 = Size.builder().size(36f).build();
        size1.setId(sizeRepository.save(size1).getId());

        Size size2 = Size.builder().size(37f).build();
        size2.setId(sizeRepository.save(size2).getId());

        Size size3 = Size.builder().size(38f).build();
        size3.setId(sizeRepository.save(size3).getId());

        Size size4 = Size.builder().size(39f).build();
        size4.setId(sizeRepository.save(size4).getId());

        Size size5 = Size.builder().size(40f).build();
        size5.setId(sizeRepository.save(size5).getId());
        //Size

        //Product
        Product product1 = Product.builder().name("Adidas Superstar").build();
        product1.setId(productRepository.save(product1).getId());
        Product product2 = Product.builder().name("Nike Air Force 1").build();
        product2.setId(productRepository.save(product2).getId());
        Product product3 = Product.builder().name("Converse Chuck Taylor").build();
        product3.setId(productRepository.save(product3).getId());
        Product product4 = Product.builder().name("Puma Suede").build();
        product4.setId(productRepository.save(product4).getId());
        Product product5 = Product.builder().name("New Balance 990").build();
        product5.setId(productRepository.save(product5).getId());
        //Product

        //material
        Material material1 = Material.builder().name("Da bò").build();
        material1.setId(materialRepository.save(material1).getId());

        Material material2 = Material.builder().name("Da lộn").build();
        material2.setId(materialRepository.save(material2).getId());

        Material material3 = Material.builder().name("Vải canvas").build();
        material3.setId(materialRepository.save(material3).getId());

        Material material4 = Material.builder().name("Nylon").build();
        material4.setId(materialRepository.save(material4).getId());

        Material material5 = Material.builder().name("Suede").build();
        material5.setId(materialRepository.save(material5).getId());
        //material

        //brand
        Brand brand1 = Brand.builder().name("Nike").build();
        brand1.setId(brandRepository.save(brand1).getId());

        Brand brand2 = Brand.builder().name("Adidas").build();
        brand2.setId(brandRepository.save(brand2).getId());

        Brand brand3 = Brand.builder().name("Puma").build();
        brand3.setId(brandRepository.save(brand3).getId());

        Brand brand4 = Brand.builder().name("Reebok").build();
        brand4.setId(brandRepository.save(brand4).getId());

        Brand brand5 = Brand.builder().name("New Balance").build();
        brand5.setId(brandRepository.save(brand5).getId());
        //brand

        //color
        Color color1 = Color.builder().code("#8B0016").name("Màu Đỏ Đậm").build();
        color1.setId(colorRepository.save(color1).getId());

        Color color2 = Color.builder().code("#00FF00").name("Màu Xanh Lá").build();
        color2.setId(colorRepository.save(color2).getId());

        Color color3 = Color.builder().code("#0000FF").name("Màu Xanh Dương").build();
        color3.setId(colorRepository.save(color3).getId());

        Color color4 = Color.builder().code("#FFFF00").name("Màu Vàng").build();
        color4.setId(colorRepository.save(color4).getId());

        Color color5 = Color.builder().code("#FFA500").name("Màu Cam").build();
        color5.setId(colorRepository.save(color5).getId());
        //color

        //category
        Category category1 = Category.builder().name("Giày lười").build();
        category1.setId(categoryRepository.save(category1).getId());

        Category category2 = Category.builder().name("Giày thời trang").build();
        category2.setId(categoryRepository.save(category2).getId());

        Category category3 = Category.builder().name("Giày nam").build();
        category3.setId(categoryRepository.save(category3).getId());

        Category category4 = Category.builder().name("Giày nữ").build();
        category4.setId(categoryRepository.save(category4).getId());

        Category category5 = Category.builder().name("Giày thể thao").build();
        category5.setId(categoryRepository.save(category5).getId());
        //Category

        //product detail
        ProductDetail productDetail1 = ProductDetail.builder().code("PD001").price(BigDecimal.valueOf(100)).amount(50).description("Mô tả sản phẩm 1").brand(brand1).sole(sole1).size(size1).product(product1).material(material1).color(color1).category(category1).build();
        productDetail1.setId(productDetailRepository.save(productDetail1).getId());

        ProductDetail productDetail2 = ProductDetail.builder().code("PD002").price(BigDecimal.valueOf(90)).amount(45).description("Mô tả sản phẩm 2").brand(brand2).sole(sole2).size(size2).product(product2).material(material2).color(color2).category(category2).build();
        productDetail2.setId(productDetailRepository.save(productDetail2).getId());

        ProductDetail productDetail3 = ProductDetail.builder().code("PD003").price(BigDecimal.valueOf(80)).amount(40).description("Mô tả sản phẩm 3").brand(brand3).sole(sole3).size(size3).product(product3).material(material3).color(color3).category(category3).build();
        productDetail3.setId(productDetailRepository.save(productDetail3).getId());

        ProductDetail productDetail4 = ProductDetail.builder().code("PD004").price(BigDecimal.valueOf(70)).amount(35).description("Mô tả sản phẩm 4").brand(brand4).sole(sole4).size(size4).product(product4).material(material4).color(color4).category(category4).build();
        productDetail4.setId(productDetailRepository.save(productDetail4).getId());

        ProductDetail productDetail5 = ProductDetail.builder().code("PD005").price(BigDecimal.valueOf(60)).amount(30).description("Mô tả sản phẩm 5").brand(brand5).sole(sole5).size(size5).product(product5).material(material5).color(color5).category(category5).build();
        productDetail5.setId(productDetailRepository.save(productDetail5).getId());

        ProductDetail productDetail6 = ProductDetail.builder().code("PD006").price(BigDecimal.valueOf(55)).amount(28).description("Mô tả sản phẩm 6").brand(brand1).sole(sole1).size(size1).product(product1).material(material1).color(color1).category(category1).build();
        productDetail6.setId(productDetailRepository.save(productDetail6).getId());

        ProductDetail productDetail7 = ProductDetail.builder().code("PD007").price(BigDecimal.valueOf(48)).amount(24).description("Mô tả sản phẩm 7").brand(brand2).sole(sole2).size(size2).product(product2).material(material2).color(color2).category(category2).build();
        productDetail7.setId(productDetailRepository.save(productDetail7).getId());

        ProductDetail productDetail8 = ProductDetail.builder().code("PD008").price(BigDecimal.valueOf(50)).amount(25).description("Mô tả sản phẩm 8").brand(brand3).sole(sole3).size(size3).product(product3).material(material3).color(color3).category(category3).build();
        productDetail8.setId(productDetailRepository.save(productDetail8).getId());

        ProductDetail productDetail9 = ProductDetail.builder().code("PD009").price(BigDecimal.valueOf(45)).amount(23).description("Mô tả sản phẩm 9").brand(brand4).sole(sole4).size(size4).product(product4).material(material4).color(color4).category(category4).build();
        productDetail9.setId(productDetailRepository.save(productDetail9).getId());

        ProductDetail productDetail10 = ProductDetail.builder().code("PD010").price(BigDecimal.valueOf(40)).amount(20).description("Mô tả sản phẩm 10").brand(brand5).sole(sole5).size(size5).product(product5).material(material5).color(color5).category(category5).build();
        productDetail10.setId(productDetailRepository.save(productDetail10).getId());

        ProductDetail productDetail11 = ProductDetail.builder().code("PD011").price(BigDecimal.valueOf(35)).amount(18).description("Mô tả sản phẩm 11").brand(brand1).sole(sole1).size(size1).product(product1).material(material1).color(color1).category(category1).build();
        productDetail11.setId(productDetailRepository.save(productDetail11).getId());

        ProductDetail productDetail12 = ProductDetail.builder().code("PD012").price(BigDecimal.valueOf(30)).amount(15).description("Mô tả sản phẩm 12").brand(brand2).sole(sole2).size(size2).product(product2).material(material2).color(color2).category(category2).build();
        productDetail12.setId(productDetailRepository.save(productDetail12).getId());

        ProductDetail productDetail13 = ProductDetail.builder().code("PD013").price(BigDecimal.valueOf(25)).amount(13).description("Mô tả sản phẩm 13").brand(brand3).sole(sole3).size(size3).product(product3).material(material3).color(color3).category(category3).build();
        productDetail13.setId(productDetailRepository.save(productDetail13).getId());

        ProductDetail productDetail14 = ProductDetail.builder().code("PD014").price(BigDecimal.valueOf(20)).amount(10).description("Mô tả sản phẩm 14").brand(brand4).sole(sole4).size(size4).product(product4).material(material4).color(color4).category(category4).build();
        productDetail14.setId(productDetailRepository.save(productDetail14).getId());

        ProductDetail productDetail15 = ProductDetail.builder().code("PD015").price(BigDecimal.valueOf(15)).amount(8).description("Mô tả sản phẩm 15").brand(brand5).sole(sole5).size(size5).product(product5).material(material5).color(color5).category(category5).build();
        productDetail15.setId(productDetailRepository.save(productDetail15).getId());

        ProductDetail productDetail16 = ProductDetail.builder().code("PD016").price(BigDecimal.valueOf(12)).amount(6).description("Mô tả sản phẩm 16").brand(brand1).sole(sole1).size(size1).product(product1).material(material1).color(color1).category(category1).build();
        productDetail16.setId(productDetailRepository.save(productDetail16).getId());

        ProductDetail productDetail17 = ProductDetail.builder().code("PD017").price(BigDecimal.valueOf(10)).amount(5).description("Mô tả sản phẩm 17").brand(brand2).sole(sole2).size(size2).product(product2).material(material2).color(color2).category(category2).build();
        productDetail17.setId(productDetailRepository.save(productDetail17).getId());

        ProductDetail productDetail18 = ProductDetail.builder().code("PD018").price(BigDecimal.valueOf(18)).amount(9).description("Mô tả sản phẩm 18").brand(brand1).sole(sole1).size(size1).product(product1).material(material1).color(color1).category(category1).build();
        productDetail18.setId(productDetailRepository.save(productDetail18).getId());

        ProductDetail productDetail19 = ProductDetail.builder().code("PD019").price(BigDecimal.valueOf(19)).amount(9).description("Mô tả sản phẩm 19").brand(brand2).sole(sole2).size(size2).product(product2).material(material2).color(color2).category(category2).build();
        productDetail19.setId(productDetailRepository.save(productDetail19).getId());

        ProductDetail productDetail20 = ProductDetail.builder().code("PD020").price(BigDecimal.valueOf(20)).amount(10).description("Mô tả sản phẩm 20").brand(brand3).sole(sole3).size(size3).product(product3).material(material3).color(color3).category(category3).build();
        productDetail20.setId(productDetailRepository.save(productDetail20).getId());

        ProductDetail productDetail21 = ProductDetail.builder().code("PD021").price(BigDecimal.valueOf(21)).amount(10).description("Mô tả sản phẩm 21").brand(brand4).sole(sole4).size(size4).product(product4).material(material4).color(color4).category(category4).build();
        productDetail21.setId(productDetailRepository.save(productDetail21).getId());

        ProductDetail productDetail22 = ProductDetail.builder().code("PD022").price(BigDecimal.valueOf(22)).amount(11).description("Mô tả sản phẩm 22").brand(brand5).sole(sole5).size(size5).product(product5).material(material5).color(color5).category(category5).build();
        productDetail22.setId(productDetailRepository.save(productDetail22).getId());

        ProductDetail productDetail23 = ProductDetail.builder().code("PD023").price(BigDecimal.valueOf(23)).amount(11).description("Mô tả sản phẩm 23").brand(brand1).sole(sole1).size(size1).product(product1).material(material1).color(color1).category(category1).build();
        productDetail23.setId(productDetailRepository.save(productDetail23).getId());

        ProductDetail productDetail24 = ProductDetail.builder().code("PD024").price(BigDecimal.valueOf(24)).amount(12).description("Mô tả sản phẩm 24").brand(brand2).sole(sole2).size(size2).product(product2).material(material2).color(color2).category(category2).build();
        productDetail24.setId(productDetailRepository.save(productDetail24).getId());

        ProductDetail productDetail25 = ProductDetail.builder().code("PD025").price(BigDecimal.valueOf(25)).amount(12).description("Mô tả sản phẩm 25").brand(brand3).sole(sole3).size(size3).product(product3).material(material3).color(color3).category(category3).build();
        productDetail25.setId(productDetailRepository.save(productDetail25).getId());
        //product detail

        //Image
        Image image1 = Image.builder().url("https://shorturl.at/wCM25").defaultImage(true).productDetail(productDetail1).build();
        image1.setId(imageRepository.save(image1).getId());

        Image image2 = Image.builder().url("https://shorturl.at/dkFOZ").defaultImage(true).productDetail(productDetail2).build();
        image2.setId(imageRepository.save(image2).getId());

        Image image3 = Image.builder().url("https://shorturl.at/EIY58").defaultImage(true).productDetail(productDetail3).build();
        image3.setId(imageRepository.save(image3).getId());

        Image image4 = Image.builder().url("https://shorturl.at/boQ09").defaultImage(true).productDetail(productDetail4).build();
        image4.setId(imageRepository.save(image4).getId());

        Image image5 = Image.builder().url("https://shorturl.at/twRVW").defaultImage(true).productDetail(productDetail5).build();
        image5.setId(imageRepository.save(image5).getId());

        Image image6 = Image.builder().url("https://shorturl.at/goQ37").defaultImage(true).productDetail(productDetail6).build();
        image6.setId(imageRepository.save(image6).getId());

        Image image7 = Image.builder().url("https://shorturl.at/oGJPZ").defaultImage(true).productDetail(productDetail7).build();
        image7.setId(imageRepository.save(image7).getId());

        Image image8 = Image.builder().url("https://shorturl.at/abcyN").defaultImage(true).productDetail(productDetail8).build();
        image8.setId(imageRepository.save(image8).getId());

        Image image9 = Image.builder().url("https://shorturl.at/FOPS3").defaultImage(true).productDetail(productDetail9).build();
        image9.setId(imageRepository.save(image9).getId());

        Image image10 = Image.builder().url("https://shorturl.at/mtvA3").defaultImage(true).productDetail(productDetail10).build();
        image10.setId(imageRepository.save(image10).getId());

        Image image11 = Image.builder().url("https://shorturl.at/tvDM9").defaultImage(true).productDetail(productDetail11).build();
        image11.setId(imageRepository.save(image11).getId());

        Image image12 = Image.builder().url("https://shorturl.at/dmsKW").defaultImage(true).productDetail(productDetail12).build();
        image12.setId(imageRepository.save(image12).getId());

        Image image13 = Image.builder().url("https://shorturl.at/AGR39").defaultImage(true).productDetail(productDetail13).build();
        image13.setId(imageRepository.save(image13).getId());

        Image image14 = Image.builder().url("https://shorturl.at/lmrN2").defaultImage(true).productDetail(productDetail14).build();
        image14.setId(imageRepository.save(image14).getId());

        Image image15 = Image.builder().url("https://shorturl.at/dfiko").defaultImage(true).productDetail(productDetail15).build();
        image15.setId(imageRepository.save(image15).getId());

        Image image16 = Image.builder().url("https://shorturl.at/ceU46").defaultImage(true).productDetail(productDetail16).build();
        image16.setId(imageRepository.save(image16).getId());

        Image image17 = Image.builder().url("https://shorturl.at/GHJMR").defaultImage(true).productDetail(productDetail17).build();
        image17.setId(imageRepository.save(image17).getId());

        Image image18 = Image.builder().url("https://shorturl.at/KLVY1").defaultImage(true).productDetail(productDetail18).build();
        image18.setId(imageRepository.save(image18).getId());

        Image image19 = Image.builder().url("https://shorturl.at/dfhyC").defaultImage(true).productDetail(productDetail19).build();
        image19.setId(imageRepository.save(image19).getId());

        Image image20 = Image.builder().url("https://shorturl.at/aeyJO").defaultImage(true).productDetail(productDetail20).build();
        image20.setId(imageRepository.save(image20).getId());

        Image image21 = Image.builder().url("https://shorturl.at/cdsy3").defaultImage(true).productDetail(productDetail21).build();
        image21.setId(imageRepository.save(image21).getId());

        Image image22 = Image.builder().url("https://shorturl.at/imxTX").defaultImage(true).productDetail(productDetail22).build();
        image22.setId(imageRepository.save(image22).getId());

        Image image23 = Image.builder().url("https://shorturl.at/nAFGW").defaultImage(true).productDetail(productDetail23).build();
        image23.setId(imageRepository.save(image23).getId());

        Image image24 = Image.builder().url("https://shorturl.at/mvxW6").defaultImage(true).productDetail(productDetail24).build();
        image24.setId(imageRepository.save(image24).getId());

        Image image25 = Image.builder().url("https://shorturl.at/nvwX9").defaultImage(true).productDetail(productDetail25).build();
        image25.setId(imageRepository.save(image25).getId());
        //Image

        //billDetail
        BillDetail billDetail1 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(200000)).status(StatusBillDetail.TON_TAI).bill(bill1).productDetail(productDetail1).build();
        billDetail1.setId(billDetailRepository.save(billDetail1).getId());

        BillDetail billDetail2 = BillDetail.builder().quantity(3).price(BigDecimal.valueOf(270000)).status(StatusBillDetail.TON_TAI).bill(bill2).productDetail(productDetail2).build();
        billDetail2.setId(billDetailRepository.save(billDetail2).getId());

        BillDetail billDetail3 = BillDetail.builder().quantity(1).price(BigDecimal.valueOf(80000)).status(StatusBillDetail.TON_TAI).bill(bill3).productDetail(productDetail3).build();
        billDetail3.setId(billDetailRepository.save(billDetail3).getId());

        BillDetail billDetail4 = BillDetail.builder().quantity(4).price(BigDecimal.valueOf(280000)).status(StatusBillDetail.TON_TAI).bill(bill4).productDetail(productDetail4).build();
        billDetail4.setId(billDetailRepository.save(billDetail4).getId());

        BillDetail billDetail5 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(120000)).status(StatusBillDetail.TON_TAI).bill(bill5).productDetail(productDetail5).build();
        billDetail5.setId(billDetailRepository.save(billDetail5).getId());

        BillDetail billDetail6 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(200000)).status(StatusBillDetail.TON_TAI).bill(bill6).productDetail(productDetail6).build();
        billDetail6.setId(billDetailRepository.save(billDetail6).getId());

        BillDetail billDetail7 = BillDetail.builder().quantity(3).price(BigDecimal.valueOf(270000)).status(StatusBillDetail.TON_TAI).bill(bill7).productDetail(productDetail7).build();
        billDetail7.setId(billDetailRepository.save(billDetail7).getId());

        BillDetail billDetail8 = BillDetail.builder().quantity(1).price(BigDecimal.valueOf(80000)).status(StatusBillDetail.TON_TAI).bill(bill8).productDetail(productDetail8).build();
        billDetail8.setId(billDetailRepository.save(billDetail8).getId());

        BillDetail billDetail9 = BillDetail.builder().quantity(4).price(BigDecimal.valueOf(280000)).status(StatusBillDetail.TON_TAI).bill(bill9).productDetail(productDetail9).build();
        billDetail9.setId(billDetailRepository.save(billDetail9).getId());

        BillDetail billDetail10 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(120000)).status(StatusBillDetail.TON_TAI).bill(bill10).productDetail(productDetail10).build();
        billDetail10.setId(billDetailRepository.save(billDetail10).getId());

        BillDetail billDetail11 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(200000)).status(StatusBillDetail.TON_TAI).bill(bill11).productDetail(productDetail1).build();
        billDetail11.setId(billDetailRepository.save(billDetail11).getId());

        BillDetail billDetail12 = BillDetail.builder().quantity(3).price(BigDecimal.valueOf(270000)).status(StatusBillDetail.TON_TAI).bill(bill12).productDetail(productDetail2).build();
        billDetail12.setId(billDetailRepository.save(billDetail12).getId());

        BillDetail billDetail13 = BillDetail.builder().quantity(1).price(BigDecimal.valueOf(80000)).status(StatusBillDetail.TON_TAI).bill(bill13).productDetail(productDetail3).build();
        billDetail13.setId(billDetailRepository.save(billDetail13).getId());

        BillDetail billDetail14 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(200000)).status(StatusBillDetail.TON_TAI).bill(bill1).productDetail(productDetail14).build();
        billDetail14.setId(billDetailRepository.save(billDetail14).getId());

        BillDetail billDetail15 = BillDetail.builder().quantity(3).price(BigDecimal.valueOf(270000)).status(StatusBillDetail.TON_TAI).bill(bill2).productDetail(productDetail15).build();
        billDetail15.setId(billDetailRepository.save(billDetail15).getId());

        BillDetail billDetail16 = BillDetail.builder().quantity(1).price(BigDecimal.valueOf(80000)).status(StatusBillDetail.TON_TAI).bill(bill3).productDetail(productDetail16).build();
        billDetail16.setId(billDetailRepository.save(billDetail16).getId());

        BillDetail billDetail17 = BillDetail.builder().quantity(4).price(BigDecimal.valueOf(280000)).status(StatusBillDetail.TON_TAI).bill(bill4).productDetail(productDetail17).build();
        billDetail17.setId(billDetailRepository.save(billDetail17).getId());

        BillDetail billDetail18 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(120000)).status(StatusBillDetail.TON_TAI).bill(bill5).productDetail(productDetail18).build();
        billDetail18.setId(billDetailRepository.save(billDetail18).getId());

        BillDetail billDetail19 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(200000)).status(StatusBillDetail.TON_TAI).bill(bill6).productDetail(productDetail19).build();
        billDetail19.setId(billDetailRepository.save(billDetail19).getId());

        BillDetail billDetail20 = BillDetail.builder().quantity(3).price(BigDecimal.valueOf(270000)).status(StatusBillDetail.TON_TAI).bill(bill7).productDetail(productDetail20).build();
        billDetail20.setId(billDetailRepository.save(billDetail20).getId());

        BillDetail billDetail21 = BillDetail.builder().quantity(1).price(BigDecimal.valueOf(80000)).status(StatusBillDetail.TON_TAI).bill(bill8).productDetail(productDetail21).build();
        billDetail21.setId(billDetailRepository.save(billDetail21).getId());

        BillDetail billDetail22 = BillDetail.builder().quantity(4).price(BigDecimal.valueOf(280000)).status(StatusBillDetail.TON_TAI).bill(bill9).productDetail(productDetail22).build();
        billDetail22.setId(billDetailRepository.save(billDetail22).getId());

        BillDetail billDetail23 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(120000)).status(StatusBillDetail.TON_TAI).bill(bill10).productDetail(productDetail23).build();
        billDetail23.setId(billDetailRepository.save(billDetail23).getId());

        BillDetail billDetail24 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(200000)).status(StatusBillDetail.TON_TAI).bill(bill11).productDetail(productDetail24).build();
        billDetail24.setId(billDetailRepository.save(billDetail24).getId());

        BillDetail billDetail25 = BillDetail.builder().quantity(3).price(BigDecimal.valueOf(270000)).status(StatusBillDetail.TON_TAI).bill(bill12).productDetail(productDetail25).build();
        billDetail25.setId(billDetailRepository.save(billDetail25).getId());

        BillDetail billDetail26 = BillDetail.builder().quantity(1).price(BigDecimal.valueOf(80000)).status(StatusBillDetail.TON_TAI).bill(bill13).productDetail(productDetail1).build();
        billDetail26.setId(billDetailRepository.save(billDetail26).getId());

        //billDetail

        //transaction
        Transaction transaction1 = Transaction.builder().type(TypeTransaction.THANH_TOAN).totalMoney(BigDecimal.valueOf(500000.0)).paymentMethod(PaymentMethod.TIEN_MAT).note("Payment for Order #HD1").status(Status.HOAT_DONG).bill(bill1).staff(staff1).build();
        transaction1.setId(transactionRepository.save(transaction1).getId());

        Transaction transaction2 = Transaction.builder().type(TypeTransaction.THANH_TOAN).totalMoney(BigDecimal.valueOf(600000)).paymentMethod(PaymentMethod.TIEN_MAT).note("Payment for Order #HD2").status(Status.HOAT_DONG).bill(bill2).staff(staff2).build();
        transaction2.setId(transactionRepository.save(transaction2).getId());

        Transaction transaction3 = Transaction.builder().type(TypeTransaction.THANH_TOAN).totalMoney(BigDecimal.valueOf(700000)).paymentMethod(PaymentMethod.TIEN_MAT).note("Payment for Order #HD3").status(Status.HOAT_DONG).bill(bill3).staff(staff3).build();
        transaction3.setId(transactionRepository.save(transaction3).getId());

        Transaction transaction4 = Transaction.builder().type(TypeTransaction.THANH_TOAN).totalMoney(BigDecimal.valueOf(800000)).paymentMethod(PaymentMethod.CHUYEN_KHOAN).note("Payment for Order #HD4").status(Status.HOAT_DONG).bill(bill4).staff(staff4).build();
        transaction4.setId(transactionRepository.save(transaction4).getId());

        Transaction transaction5 = Transaction.builder().type(TypeTransaction.THANH_TOAN).totalMoney(BigDecimal.valueOf(900000)).paymentMethod(PaymentMethod.TIEN_MAT).note("Payment for Order #HD5").status(Status.HOAT_DONG).bill(bill5).staff(staff5).build();
        transaction5.setId(transactionRepository.save(transaction5).getId());

        Transaction transaction6 = Transaction.builder().type(TypeTransaction.THANH_TOAN).totalMoney(BigDecimal.valueOf(1000000)).paymentMethod(PaymentMethod.CHUYEN_KHOAN).note("Payment for Order #HD6").status(Status.HOAT_DONG).bill(bill6).staff(staff1).build();
        transaction6.setId(transactionRepository.save(transaction6).getId());

        Transaction transaction7 = Transaction.builder().type(TypeTransaction.THANH_TOAN).totalMoney(BigDecimal.valueOf(1100000)).paymentMethod(PaymentMethod.CHUYEN_KHOAN).note("Payment for Order #HD11").status(Status.HOAT_DONG).bill(bill11).staff(staff4).build();

        transaction7.setId(transactionRepository.save(transaction7).getId());

        Transaction transaction8 = Transaction.builder().type(TypeTransaction.THANH_TOAN).totalMoney(BigDecimal.valueOf(1200000)).paymentMethod(PaymentMethod.TIEN_MAT).note("Payment for Order #HD12").status(Status.HOAT_DONG).bill(bill12).staff(staff2).build();
        transaction8.setId(transactionRepository.save(transaction8).getId());
        //transaction

        //ProductPromotion
        ProductPromotion productPromotion1 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(50)).productDetail(productDetail1).promotion(promotion1).build();
        productPromotion1.setId(productPromotionRepository.save(productPromotion1).getId());

        ProductPromotion productPromotion2 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(55)).productDetail(productDetail2).promotion(promotion1).build();
        productPromotion2.setId(productPromotionRepository.save(productPromotion2).getId());

        ProductPromotion productPromotion3 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(60)).productDetail(productDetail3).promotion(promotion1).build();
        productPromotion3.setId(productPromotionRepository.save(productPromotion3).getId());

        ProductPromotion productPromotion4 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(65)).productDetail(productDetail4).promotion(promotion1).build();
        productPromotion4.setId(productPromotionRepository.save(productPromotion4).getId());

        ProductPromotion productPromotion5 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(70)).productDetail(productDetail5).promotion(promotion1).build();
        productPromotion5.setId(productPromotionRepository.save(productPromotion5).getId());

        ProductPromotion productPromotion6 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(75)).productDetail(productDetail6).promotion(promotion2).build();
        productPromotion6.setId(productPromotionRepository.save(productPromotion6).getId());

        ProductPromotion productPromotion7 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(80)).productDetail(productDetail7).promotion(promotion2).build();
        productPromotion7.setId(productPromotionRepository.save(productPromotion7).getId());

        ProductPromotion productPromotion8 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(85)).productDetail(productDetail8).promotion(promotion3).build();
        productPromotion8.setId(productPromotionRepository.save(productPromotion8).getId());

        ProductPromotion productPromotion9 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(90)).productDetail(productDetail9).promotion(promotion4).build();
        productPromotion9.setId(productPromotionRepository.save(productPromotion9).getId());

        ProductPromotion productPromotion10 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(95)).productDetail(productDetail10).promotion(promotion5).build();
        productPromotion10.setId(productPromotionRepository.save(productPromotion10).getId());

        ProductPromotion productPromotion11 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(100)).productDetail(productDetail11).promotion(promotion3).build();
        productPromotion11.setId(productPromotionRepository.save(productPromotion11).getId());

        ProductPromotion productPromotion12 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(105)).productDetail(productDetail12).promotion(promotion3).build();
        productPromotion12.setId(productPromotionRepository.save(productPromotion12).getId());

        ProductPromotion productPromotion13 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(110)).productDetail(productDetail13).promotion(promotion3).build();
        productPromotion13.setId(productPromotionRepository.save(productPromotion13).getId());

        ProductPromotion productPromotion14 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(115)).productDetail(productDetail14).promotion(promotion3).build();
        productPromotion14.setId(productPromotionRepository.save(productPromotion14).getId());// ProductPromotion 15
        ProductPromotion productPromotion15 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(120)).productDetail(productDetail15).promotion(promotion3).build();
        productPromotion15.setId(productPromotionRepository.save(productPromotion15).getId());

        ProductPromotion productPromotion16 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(125)).productDetail(productDetail16).promotion(promotion4).build();
        productPromotion16.setId(productPromotionRepository.save(productPromotion16).getId());

        ProductPromotion productPromotion17 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(130)).productDetail(productDetail17).promotion(promotion4).build();
        productPromotion17.setId(productPromotionRepository.save(productPromotion17).getId());

        ProductPromotion productPromotion18 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(135)).productDetail(productDetail18).promotion(promotion4).build();
        productPromotion18.setId(productPromotionRepository.save(productPromotion18).getId());

        ProductPromotion productPromotion19 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(140)).productDetail(productDetail19).promotion(promotion4).build();
        productPromotion19.setId(productPromotionRepository.save(productPromotion19).getId());

        ProductPromotion productPromotion20 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(145)).productDetail(productDetail20).promotion(promotion4).build();
        productPromotion20.setId(productPromotionRepository.save(productPromotion20).getId());

        ProductPromotion productPromotion21 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(150)).productDetail(productDetail21).promotion(promotion5).build();
        productPromotion21.setId(productPromotionRepository.save(productPromotion21).getId());

        ProductPromotion productPromotion22 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(155)).productDetail(productDetail22).promotion(promotion5).build();
        productPromotion22.setId(productPromotionRepository.save(productPromotion22).getId());

        ProductPromotion productPromotion23 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(160)).productDetail(productDetail23).promotion(promotion5).build();
        productPromotion23.setId(productPromotionRepository.save(productPromotion23).getId());

        ProductPromotion productPromotion24 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(165)).productDetail(productDetail24).promotion(promotion5).build();
        productPromotion24.setId(productPromotionRepository.save(productPromotion24).getId());

        ProductPromotion productPromotion25 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(170)).productDetail(productDetail25).promotion(promotion5).build();
        productPromotion25.setId(productPromotionRepository.save(productPromotion25).getId());
        //ProductPromotion

        //billhistory

        BillHistory billHistory1 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tạo đơn hàng").bill(bill1).staff(null).build();
        billHistory1.setId(billHistoryRepository.save(billHistory1).getId());

        BillHistory billHistory2 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Xac nhan don hang").bill(bill1).staff(staff1).build();
        billHistory2.setId(billHistoryRepository.save(billHistory2).getId());

        BillHistory billHistory3 = BillHistory.builder().statusBill(StatusBill.DANG_VAN_CHUYEN).note("Don hang dang giao den ban").bill(bill1).staff(staff1).build();
        billHistory3.setId(billHistoryRepository.save(billHistory3).getId());

        BillHistory billHistory4 = BillHistory.builder().statusBill(StatusBill.DA_GIAO_HANG).note("Da giao hang").bill(bill1).staff(staff1).build();
        billHistory4.setId(billHistoryRepository.save(billHistory4).getId());

        BillHistory billHistory5 = BillHistory.builder().statusBill(StatusBill.DA_THANH_TOAN).note("Da thanh toan").bill(bill1).staff(staff1).build();
        billHistory5.setId(billHistoryRepository.save(billHistory5).getId());

        BillHistory billHistory6 = BillHistory.builder().statusBill(StatusBill.HOAN_THANH).note("Hoan thanh").bill(bill1).staff(staff1).build();
        billHistory6.setId(billHistoryRepository.save(billHistory6).getId());

        BillHistory billHistory7 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tạo đơn hàng").bill(bill2).staff(null).build();
        billHistory7.setId(billHistoryRepository.save(billHistory7).getId());

        BillHistory billHistory8 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Da thanh toan").bill(bill2).staff(null).build();
        billHistory8.setId(billHistoryRepository.save(billHistory8).getId());

        BillHistory billHistory9 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Xac nhan don hang").bill(bill2).staff(staff1).build();
        billHistory9.setId(billHistoryRepository.save(billHistory9).getId());

        BillHistory billHistory10 = BillHistory.builder().statusBill(StatusBill.DANG_VAN_CHUYEN).note("Don hang dang giao den ban").bill(bill2).staff(staff1).build();
        billHistory10.setId(billHistoryRepository.save(billHistory10).getId());

        BillHistory billHistory11 = BillHistory.builder().statusBill(StatusBill.DA_GIAO_HANG).note("Da giao hang").bill(bill2).staff(staff1).build();
        billHistory11.setId(billHistoryRepository.save(billHistory11).getId());

        BillHistory billHistory12 = BillHistory.builder().statusBill(StatusBill.HOAN_THANH).note("Hoan thanh").bill(bill2).staff(staff1).build();
        billHistory12.setId(billHistoryRepository.save(billHistory12).getId());
//bill 3:
        BillHistory billHistory13 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tạo đơn hàng").bill(bill3).staff(null).build();
        billHistory13.setId(billHistoryRepository.save(billHistory13).getId());

        BillHistory billHistory14 = BillHistory.builder().statusBill(StatusBill.DA_THANH_TOAN).note("Thanh toan").bill(bill3).staff(null).build();
        billHistory14.setId(billHistoryRepository.save(billHistory14).getId());

        BillHistory billHistory15 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Xac nhan don hang").bill(bill3).staff(staff1).build();
        billHistory15.setId(billHistoryRepository.save(billHistory15).getId());

        BillHistory billHistory16 = BillHistory.builder().statusBill(StatusBill.DANG_VAN_CHUYEN).note("Don hang dang giao den ban").bill(bill3).staff(staff1).build();
        billHistory16.setId(billHistoryRepository.save(billHistory16).getId());

        //bill 4:
        BillHistory billHistory17 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tạo đơn hàng").bill(bill4).staff(null).build();
        billHistory17.setId(billHistoryRepository.save(billHistory17).getId());

        BillHistory billHistory18 = BillHistory.builder().statusBill(StatusBill.DA_THANH_TOAN).note("Thanh toan").bill(bill4).staff(null).build();
        billHistory18.setId(billHistoryRepository.save(billHistory18).getId());

        BillHistory billHistory19 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Xac nhan don hang").bill(bill4).staff(staff1).build();
        billHistory19.setId(billHistoryRepository.save(billHistory19).getId());

        BillHistory billHistory20 = BillHistory.builder().statusBill(StatusBill.DANG_VAN_CHUYEN).note("Don hang dang giao den ban").bill(bill4).staff(staff1).build();
        billHistory20.setId(billHistoryRepository.save(billHistory20).getId());

        //bill 5:
        BillHistory billHistory21 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tạo đơn hàng").bill(bill5).staff(null).build();
        billHistory21.setId(billHistoryRepository.save(billHistory21).getId());

        BillHistory billHistory22 = BillHistory.builder().statusBill(StatusBill.DA_THANH_TOAN).note("Thanh toan").bill(bill5).staff(null).build();
        billHistory22.setId(billHistoryRepository.save(billHistory22).getId());

        BillHistory billHistory23 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Xac nhan don hang").bill(bill5).staff(staff1).build();
        billHistory23.setId(billHistoryRepository.save(billHistory23).getId());

        //bill 6:
        BillHistory billHistory24 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tạo đơn hàng").bill(bill6).staff(null).build();
        billHistory24.setId(billHistoryRepository.save(billHistory24).getId());

        BillHistory billHistory25 = BillHistory.builder().statusBill(StatusBill.DA_THANH_TOAN).note("Thanh toan").bill(bill6).staff(null).build();
        billHistory25.setId(billHistoryRepository.save(billHistory25).getId());

        BillHistory billHistory26 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Xac nhan don hang").bill(bill6).staff(staff1).build();
        billHistory26.setId(billHistoryRepository.save(billHistory26).getId());

        //bill 7:
        BillHistory billHistory27 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tao don hang").bill(bill7).staff(null).build();
        billHistory27.setId(billHistoryRepository.save(billHistory27).getId());

        //bill8:
        BillHistory billHistory28 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tao don hang").bill(bill8).staff(null).build();
        billHistory28.setId(billHistoryRepository.save(billHistory28).getId());

        //bill9:
        BillHistory billHistory29 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tao don").bill(bill9).staff(staff1).build();
        billHistory29.setId(billHistoryRepository.save(billHistory29).getId());

        BillHistory billHistory30 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Da xac nhan").bill(bill9).staff(staff1).build();
        billHistory30.setId(billHistoryRepository.save(billHistory29).getId());
        //bill10:
        BillHistory billHistory31 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tao don").bill(bill10).staff(staff1).build();
        billHistory31.setId(billHistoryRepository.save(billHistory31).getId());

        BillHistory billHistory32 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Da xac nhan").bill(bill10).staff(staff1).build();
        billHistory32.setId(billHistoryRepository.save(billHistory32).getId());

        //bill11:
        BillHistory billHistory33 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tao don").bill(bill11).staff(staff1).build();
        billHistory33.setId(billHistoryRepository.save(billHistory33).getId());

        BillHistory billHistory34 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Da xac nhan").bill(bill11).staff(staff1).build();
        billHistory34.setId(billHistoryRepository.save(billHistory34).getId());

        BillHistory billHistory35 = BillHistory.builder().statusBill(StatusBill.DA_THANH_TOAN).note("Da thanh toan").bill(bill11).staff(staff1).build();
        billHistory35.setId(billHistoryRepository.save(billHistory35).getId());

        //bill12:
        BillHistory billHistory36 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tao don").bill(bill12).staff(staff1).build();
        billHistory36.setId(billHistoryRepository.save(billHistory36).getId());

        BillHistory billHistory37 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Da xac nhan").bill(bill12).staff(staff1).build();
        billHistory37.setId(billHistoryRepository.save(billHistory37).getId());

        BillHistory billHistory38 = BillHistory.builder().statusBill(StatusBill.DA_THANH_TOAN).note("Da thanh toan").bill(bill12).staff(staff1).build();
        billHistory38.setId(billHistoryRepository.save(billHistory38).getId());

        //bill 13:
        BillHistory billHistory39 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tao don").bill(bill13).staff(null).build();
        billHistory39.setId(billHistoryRepository.save(billHistory39).getId());

        BillHistory billHistory40 = BillHistory.builder().statusBill(StatusBill.DA_HUY).note("Huy don").bill(bill13).staff(null).build();
        billHistory40.setId(billHistoryRepository.save(billHistory40).getId());
        //billhistory

        //cart
        Cart cart1 = Cart.builder().customer(customer1).createAt(Calendar.getInstance().getTimeInMillis()).build();
        cart1.setId(cartRepository.save(cart1).getId());

        Cart cart2 = Cart.builder().customer(customer2).createAt(Calendar.getInstance().getTimeInMillis()).build();
        cart2.setId(cartRepository.save(cart2).getId());

        Cart cart3 = Cart.builder().customer(customer3).createAt(Calendar.getInstance().getTimeInMillis()).build();
        cart3.setId(cartRepository.save(cart3).getId());

        Cart cart4 = Cart.builder().customer(customer4).createAt(Calendar.getInstance().getTimeInMillis()).build();
        cart4.setId(cartRepository.save(cart4).getId());

        Cart cart5 = Cart.builder().customer(customer5).createAt(Calendar.getInstance().getTimeInMillis()).build();
        cart5.setId(cartRepository.save(cart5).getId());
        //cart

        //CartDetail
        CartDetail cartDetail1 = CartDetail.builder().quantity(1).cart(cart1).productDetail(productDetail1).build();
        cartDetailRepository.save(cartDetail1);
        cartDetail1.setId(cartDetailRepository.save(cartDetail1).getId());

        CartDetail cartDetail2 = CartDetail.builder().quantity(2).cart(cart1).productDetail(productDetail2).build();
        cartDetailRepository.save(cartDetail2);
        cartDetail2.setId(cartDetailRepository.save(cartDetail2).getId());

        CartDetail cartDetail3 = CartDetail.builder().quantity(3).cart(cart1).productDetail(productDetail3).build();
        cartDetailRepository.save(cartDetail3);
        cartDetail3.setId(cartDetailRepository.save(cartDetail3).getId());

        CartDetail cartDetail4 = CartDetail.builder().quantity(4).cart(cart1).productDetail(productDetail4).build();
        cartDetailRepository.save(cartDetail4);
        cartDetail4.setId(cartDetailRepository.save(cartDetail4).getId());

        CartDetail cartDetail5 = CartDetail.builder().quantity(5).cart(cart1).productDetail(productDetail5).build();
        cartDetailRepository.save(cartDetail5);
        cartDetail5.setId(cartDetailRepository.save(cartDetail5).getId());

        CartDetail cartDetail6 = CartDetail.builder().quantity(6).cart(cart2).productDetail(productDetail6).build();
        cartDetailRepository.save(cartDetail6);
        cartDetail6.setId(cartDetailRepository.save(cartDetail6).getId());

        CartDetail cartDetail7 = CartDetail.builder().quantity(7).cart(cart2).productDetail(productDetail7).build();
        cartDetailRepository.save(cartDetail7);
        cartDetail7.setId(cartDetailRepository.save(cartDetail7).getId());

        CartDetail cartDetail8 = CartDetail.builder().quantity(8).cart(cart2).productDetail(productDetail8).build();
        cartDetailRepository.save(cartDetail8);
        cartDetail8.setId(cartDetailRepository.save(cartDetail8).getId());

        CartDetail cartDetail9 = CartDetail.builder().quantity(9).cart(cart2).productDetail(productDetail9).build();
        cartDetailRepository.save(cartDetail9);
        cartDetail9.setId(cartDetailRepository.save(cartDetail9).getId());

        CartDetail cartDetail10 = CartDetail.builder().quantity(10).cart(cart2).productDetail(productDetail10).build();
        cartDetailRepository.save(cartDetail10);
        cartDetail10.setId(cartDetailRepository.save(cartDetail10).getId());

        CartDetail cartDetail11 = CartDetail.builder().quantity(11).cart(cart3).productDetail(productDetail11).build();
        cartDetail11.setId(cartDetailRepository.save(cartDetail11).getId());

        CartDetail cartDetail12 = CartDetail.builder().quantity(12).cart(cart3).productDetail(productDetail12).build();
        cartDetail12.setId(cartDetailRepository.save(cartDetail12).getId());

        CartDetail cartDetail13 = CartDetail.builder().quantity(13).cart(cart3).productDetail(productDetail13).build();
        cartDetail13.setId(cartDetailRepository.save(cartDetail13).getId());

        CartDetail cartDetail14 = CartDetail.builder().quantity(14).cart(cart3).productDetail(productDetail14).build();
        cartDetail14.setId(cartDetailRepository.save(cartDetail14).getId());

        CartDetail cartDetail15 = CartDetail.builder().quantity(15).cart(cart3).productDetail(productDetail15).build();
        cartDetail15.setId(cartDetailRepository.save(cartDetail15).getId());

        CartDetail cartDetail16 = CartDetail.builder().quantity(16).cart(cart4).productDetail(productDetail16).build();
        cartDetail16.setId(cartDetailRepository.save(cartDetail16).getId());

        CartDetail cartDetail17 = CartDetail.builder().quantity(17).cart(cart4).productDetail(productDetail17).build();
        cartDetail17.setId(cartDetailRepository.save(cartDetail17).getId());

        CartDetail cartDetail18 = CartDetail.builder().quantity(18).cart(cart4).productDetail(productDetail18).build();
        cartDetail18.setId(cartDetailRepository.save(cartDetail18).getId());

        CartDetail cartDetail19 = CartDetail.builder().quantity(19).cart(cart4).productDetail(productDetail19).build();
        cartDetail19.setId(cartDetailRepository.save(cartDetail19).getId());

        CartDetail cartDetail20 = CartDetail.builder().quantity(20).cart(cart4).productDetail(productDetail20).build();
        cartDetail20.setId(cartDetailRepository.save(cartDetail20).getId());

        CartDetail cartDetail21 = CartDetail.builder().quantity(21).cart(cart5).productDetail(productDetail21).build();
        cartDetail21.setId(cartDetailRepository.save(cartDetail21).getId());

        CartDetail cartDetail22 = CartDetail.builder().quantity(22).cart(cart5).productDetail(productDetail22).build();
        cartDetail22.setId(cartDetailRepository.save(cartDetail22).getId());

        CartDetail cartDetail23 = CartDetail.builder().quantity(23).cart(cart5).productDetail(productDetail23).build();
        cartDetail23.setId(cartDetailRepository.save(cartDetail23).getId());

        CartDetail cartDetail24 = CartDetail.builder().quantity(24).cart(cart5).productDetail(productDetail24).build();
        cartDetail24.setId(cartDetailRepository.save(cartDetail24).getId());

        CartDetail cartDetail25 = CartDetail.builder().quantity(25).cart(cart5).productDetail(productDetail25).build();
        cartDetail25.setId(cartDetailRepository.save(cartDetail25).getId());
        //CartDetail
    }
}
