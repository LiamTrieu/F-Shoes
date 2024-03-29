//package com.fshoestool;
//
//import com.fshoes.entity.*;
//import com.fshoes.infrastructure.constant.*;
//import com.fshoes.repository.*;
//import com.fshoes.util.MD5Util;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.ConfigurableApplicationContext;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
//
//import java.math.BigDecimal;
//
//@SpringBootApplication
//@EnableJpaRepositories(basePackages = "com.fshoes.repository")
//public class DBGenerator implements CommandLineRunner {
//
//    @Autowired
//    private CartRepository cartRepository;
//    @Autowired
//    private BillHistoryRepository billHistoryRepository;
//    @Autowired
//    private ProductPromotionRepository productPromotionRepository;
//
//    @Autowired
//    private TransactionRepository transactionRepository;
//    @Autowired
//    private BillDetailRepository billDetailRepository;
//
//    @Autowired
//    private ImageRepository imageRepository;
//    @Autowired
//    private ProductDetailRepository productDetailRepository;
//    @Autowired
//    private CategoryRepository categoryRepository;
//    @Autowired
//    private ColorRepository colorRepository;
//    @Autowired
//    private BrandRepository brandRepository;
//    @Autowired
//    private MaterialRepository materialRepository;
//    @Autowired
//    private ProductRepository productRepository;
//    @Autowired
//    private SizeRepository sizeRepository;
//    @Autowired
//    private SoleRepository soleRepository;
//    @Autowired
//    private BillRepository billRepository;
//    @Autowired
//    private AddressRepository addressRepository;
//    @Autowired
//    private CustomerVoucherRepository customerVoucherRepository;
//    @Autowired
//    private VoucherRepository voucherRepository;
//    @Autowired
//    private AccountRepository accountRepository;
//    @Autowired
//    private PromotionRepository promotionRepository;
//
//    public static void main(String[] args) {
//        ConfigurableApplicationContext ctx = SpringApplication.run(DBGenerator.class);
//        ctx.close();
//
//    }
//
//    public void run(String... args) throws Exception {
//        Account customer1 = Account.builder().code("KH1").role(RoleAccount.KHACH_HANG).fullName("Nguyễn Văn A").dateBirth(System.currentTimeMillis()).phoneNumber("0123456781").email("customer1@example.com").gender(true).password("password1").avatar(null).status(Status.HOAT_DONG).build();
//        customer1.setId(accountRepository.save(customer1).getId());
//
//        Account customer2 = Account.builder().code("KH2").role(RoleAccount.KHACH_HANG).fullName("Nguyễn Văn B").dateBirth(System.currentTimeMillis()).phoneNumber("0234567890").email("customer2@example.com").gender(false).password("password2").avatar(null).status(Status.HOAT_DONG).build();
//        customer2.setId(accountRepository.save(customer2).getId());
//
//        Account customer3 = Account.builder().code("KH3").role(RoleAccount.KHACH_HANG).fullName("Nguyễn Văn C").dateBirth(System.currentTimeMillis()).phoneNumber("0345678901").email("customer3@example.com").gender(true).password("password3").avatar(null).status(Status.HOAT_DONG).build();
//        customer3.setId(accountRepository.save(customer3).getId());
//
//        Account customer4 = Account.builder().code("KH4").role(RoleAccount.KHACH_HANG).fullName("Nguyễn Văn D").dateBirth(System.currentTimeMillis()).phoneNumber("0456789012").email("customer4@example.com").gender(false).password("password4").avatar(null).status(Status.HOAT_DONG).build();
//        customer4.setId(accountRepository.save(customer4).getId());
//
//        Account customer5 = Account.builder().code("KH5").role(RoleAccount.KHACH_HANG).fullName("Nguyễn Văn E").dateBirth(System.currentTimeMillis()).phoneNumber("0567890123").email("customer5@example.com").gender(true).password("password5").avatar(null).status(Status.HOAT_DONG).build();
//        customer5.setId(accountRepository.save(customer5).getId());
//        //Customer
//
//        //Promotion
//        Promotion promotion1 = Promotion.builder().name("Promotion 1").timeStart(System.currentTimeMillis()).timeEnd(System.currentTimeMillis() + 86400000).type(true).value(50).status(StatusVoucher.SAP_DIEN_RA).build();
//        promotion1.setId(promotionRepository.save(promotion1).getId());
//
//        Promotion promotion2 = Promotion.builder().name("Promotion 2").timeStart(System.currentTimeMillis()).timeEnd(System.currentTimeMillis() + 86400000).type(true).value(60).status(StatusVoucher.DANG_DIEN_RA).build();
//        promotion2.setId(promotionRepository.save(promotion2).getId());
//
//        Promotion promotion3 = Promotion.builder().name("Promotion 3").timeStart(System.currentTimeMillis()).timeEnd(System.currentTimeMillis() + 86400000).type(true).value(70).status(StatusVoucher.DA_KET_THUC).build();
//        promotion3.setId(promotionRepository.save(promotion3).getId());
//
//        Promotion promotion4 = Promotion.builder().name("Promotion 4").timeStart(System.currentTimeMillis()).timeEnd(System.currentTimeMillis() + 86400000).type(true).value(80).status(StatusVoucher.DANG_DIEN_RA).build();
//        promotion4.setId(promotionRepository.save(promotion4).getId());
//
//        Promotion promotion5 = Promotion.builder().name("Promotion 5").timeStart(System.currentTimeMillis()).timeEnd(System.currentTimeMillis() + 86400000).type(true).value(90).status(StatusVoucher.DANG_DIEN_RA).build();
//        promotion5.setId(promotionRepository.save(promotion5).getId());
//        //Promotion
//
//        //Staff
//        Account staff1 = Account.builder().code("NV1").role(RoleAccount.NHAN_VIEN).fullName("Lê Thị A").dateBirth(System.currentTimeMillis()).CitizenId("1234567890123456").phoneNumber("0123456789").email("staff1@example.com").gender(true).password("password1").avatar("https://shorturl.at/CDP27").role(RoleAccount.NHAN_VIEN).status(Status.HOAT_DONG).build();
//        staff1.setId(accountRepository.save(staff1).getId());
//
//        Account staff2 = Account.builder().code("NV2").role(RoleAccount.NHAN_VIEN).fullName("Lê Thị B").dateBirth(System.currentTimeMillis()).CitizenId("2345678901234567").phoneNumber("0123456788").email("staff2@example.com").gender(true).password("password2").avatar("https://shorturl.at/eqIR9").role(RoleAccount.NHAN_VIEN).status(Status.HOAT_DONG).build();
//        staff2.setId(accountRepository.save(staff2).getId());
//
//        Account staff3 = Account.builder().code("NV3").role(RoleAccount.NHAN_VIEN).fullName("Lê Thị C").dateBirth(System.currentTimeMillis()).CitizenId("3456789012345678").phoneNumber("0123456787").email("staff3@example.com").gender(true).password("password3").avatar("https://shorturl.at/juFOV").role(RoleAccount.NHAN_VIEN).status(Status.HOAT_DONG).build();
//        staff3.setId(accountRepository.save(staff3).getId());
//
//        Account staff4 = Account.builder().code("NV4").role(RoleAccount.NHAN_VIEN).fullName("Lê Thị D").dateBirth(System.currentTimeMillis()).CitizenId("4567890123456789").phoneNumber("0123456786").email("staff4@example.com").gender(true).password("password4").avatar("https://shorturl.at/pCFQU").role(RoleAccount.NHAN_VIEN).status(Status.HOAT_DONG).build();
//        staff4.setId(accountRepository.save(staff4).getId());
//
//        Account staff5 = Account.builder().code("NV5").role(RoleAccount.NHAN_VIEN).fullName("Lê Thị E").dateBirth(System.currentTimeMillis()).CitizenId("5678901234567890").phoneNumber("0123456785").email("staff5@example.com").gender(true).password("password5").avatar("https://shorturl.at/rAGJV").role(RoleAccount.NHAN_VIEN).status(Status.HOAT_DONG).build();
//        staff5.setId(accountRepository.save(staff5).getId());
//        //Staff
//
//        //Voucher
//        Voucher voucher1 = Voucher.builder().code("VC12345").name("Voucher 1").value(BigDecimal.valueOf(25000)).maximumValue(BigDecimal.valueOf(25000)).type(TypeVoucher.TAT_CA).typeValue(TypeValue.GIA_TIEN).minimumAmount(BigDecimal.valueOf(50000)).quantity(10).startDate(System.currentTimeMillis()).endDate(System.currentTimeMillis() + 604800000).status(StatusVoucher.DANG_DIEN_RA).build();
//        voucher1.setId(voucherRepository.save(voucher1).getId());
//
//        //CustomerVoucher
//        //Cá nhân
////        CustomerVoucher customerVoucher1 = CustomerVoucher.builder().account(customer1).voucher(voucher1).build();
////        customerVoucher1.setId(customerVoucherRepository.save(customerVoucher1).getId());
//
//        //tất cả
////        CustomerVoucher customerVoucher6 = CustomerVoucher.builder().account(customer1).voucher(voucher6).build();
////        customerVoucher6.setId(customerVoucherRepository.save(customerVoucher6).getId());
//
////        CustomerVoucher customerVoucher7 = CustomerVoucher.builder().account(customer1).voucher(voucher7).build();
////        customerVoucher7.setId(customerVoucherRepository.save(customerVoucher7).getId());
////
////        CustomerVoucher customerVoucher8 = CustomerVoucher.builder().account(customer1).voucher(voucher8).build();
////        customerVoucher8.setId(customerVoucherRepository.save(customerVoucher8).getId());
////
////        CustomerVoucher customerVoucher9 = CustomerVoucher.builder().account(customer1).voucher(voucher9).build();
////        customerVoucher9.setId(customerVoucherRepository.save(customerVoucher9).getId());
////
////        CustomerVoucher customerVoucher10 = CustomerVoucher.builder().account(customer1).voucher(voucher10).build();
////        customerVoucher10.setId(customerVoucherRepository.save(customerVoucher10).getId());
////
////        CustomerVoucher customerVoucher11 = CustomerVoucher.builder().account(customer2).voucher(voucher6).build();
////        customerVoucher11.setId(customerVoucherRepository.save(customerVoucher11).getId());
////
////        CustomerVoucher customerVoucher12 = CustomerVoucher.builder().account(customer2).voucher(voucher7).build();
////        customerVoucher12.setId(customerVoucherRepository.save(customerVoucher12).getId());
////
////        CustomerVoucher customerVoucher13 = CustomerVoucher.builder().account(customer2).voucher(voucher8).build();
////        customerVoucher13.setId(customerVoucherRepository.save(customerVoucher13).getId());
////
////        CustomerVoucher customerVoucher14 = CustomerVoucher.builder().account(customer2).voucher(voucher9).build();
////        customerVoucher14.setId(customerVoucherRepository.save(customerVoucher14).getId());
////
////        CustomerVoucher customerVoucher15 = CustomerVoucher.builder().account(customer2).voucher(voucher10).build();
////        customerVoucher15.setId(customerVoucherRepository.save(customerVoucher15).getId());
////
////        CustomerVoucher customerVoucher16 = CustomerVoucher.builder().account(customer3).voucher(voucher6).build();
////        customerVoucher16.setId(customerVoucherRepository.save(customerVoucher16).getId());
////
////        CustomerVoucher customerVoucher17 = CustomerVoucher.builder().account(customer3).voucher(voucher7).build();
////        customerVoucher17.setId(customerVoucherRepository.save(customerVoucher17).getId());
////
////        CustomerVoucher customerVoucher18 = CustomerVoucher.builder().account(customer3).voucher(voucher8).build();
////        customerVoucher18.setId(customerVoucherRepository.save(customerVoucher18).getId());
////
////        CustomerVoucher customerVoucher19 = CustomerVoucher.builder().account(customer3).voucher(voucher9).build();
////        customerVoucher19.setId(customerVoucherRepository.save(customerVoucher19).getId());
////
////        CustomerVoucher customerVoucher20 = CustomerVoucher.builder().account(customer3).voucher(voucher10).build();
////        customerVoucher20.setId(customerVoucherRepository.save(customerVoucher20).getId());
////
////        CustomerVoucher customerVoucher21 = CustomerVoucher.builder().account(customer4).voucher(voucher6).build();
////        customerVoucher21.setId(customerVoucherRepository.save(customerVoucher21).getId());
////
////        CustomerVoucher customerVoucher22 = CustomerVoucher.builder().account(customer4).voucher(voucher7).build();
////        customerVoucher22.setId(customerVoucherRepository.save(customerVoucher22).getId());
////
////        CustomerVoucher customerVoucher23 = CustomerVoucher.builder().account(customer4).voucher(voucher8).build();
////        customerVoucher23.setId(customerVoucherRepository.save(customerVoucher23).getId());
////
////        CustomerVoucher customerVoucher24 = CustomerVoucher.builder().account(customer4).voucher(voucher9).build();
////        customerVoucher24.setId(customerVoucherRepository.save(customerVoucher24).getId());
////
////        CustomerVoucher customerVoucher25 = CustomerVoucher.builder().account(customer4).voucher(voucher10).build();
////        customerVoucher25.setId(customerVoucherRepository.save(customerVoucher25).getId());
////
////        CustomerVoucher customerVoucher26 = CustomerVoucher.builder().account(customer5).voucher(voucher6).build();
////        customerVoucher26.setId(customerVoucherRepository.save(customerVoucher26).getId());
////
////        CustomerVoucher customerVoucher27 = CustomerVoucher.builder().account(customer5).voucher(voucher7).build();
////        customerVoucher27.setId(customerVoucherRepository.save(customerVoucher27).getId());
////
////        CustomerVoucher customerVoucher28 = CustomerVoucher.builder().account(customer5).voucher(voucher8).build();
////        customerVoucher28.setId(customerVoucherRepository.save(customerVoucher28).getId());
////
////        CustomerVoucher customerVoucher29 = CustomerVoucher.builder().account(customer5).voucher(voucher9).build();
////        customerVoucher29.setId(customerVoucherRepository.save(customerVoucher29).getId());
////
////        CustomerVoucher customerVoucher30 = CustomerVoucher.builder().account(customer5).voucher(voucher10).build();
////        customerVoucher30.setId(customerVoucherRepository.save(customerVoucher30).getId());
//        //tất cả
//        //CustomerVoucher
//
//        //Address
//        Address address1 = Address.builder().name("Địa chỉ 1").phoneNumber("0123456789").wardId("140207").districtId("2204").provinceId("266").specificAddress("aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La").type(true).account(customer1).build();
//        address1.setId(addressRepository.save(address1).getId());
//
//        Address address2 = Address.builder().name("Địa chỉ 2").phoneNumber("0234567890").wardId("140207").districtId("2204").provinceId("266").specificAddress("aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La").type(true).account(customer2).build();
//        address2.setId(addressRepository.save(address2).getId());
//
//        Address address3 = Address.builder().name("Địa chỉ 3").phoneNumber("0345678901").wardId("140207").districtId("2204").provinceId("266").specificAddress("aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La").type(true).account(customer3).build();
//        address3.setId(addressRepository.save(address3).getId());
//
//        Address address4 = Address.builder().name("Địa chỉ 4").phoneNumber("0456789012").wardId("140207").districtId("2204").provinceId("266").specificAddress("aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La").type(true).account(customer4).build();
//        address4.setId(addressRepository.save(address4).getId());
//
//        Address address5 = Address.builder().name("Địa chỉ 5").phoneNumber("0567890123").wardId("140207").districtId("2204").provinceId("266").specificAddress("aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La").type(true).account(customer5).build();
//        address5.setId(addressRepository.save(address5).getId());
//
//        Address address6 = Address.builder().name("Địa chỉ 6").phoneNumber("0281372615").wardId("140207").districtId("2204").provinceId("266").specificAddress("aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La").type(true).account(staff1).build();
//        address6.setId(addressRepository.save(address6).getId());
//
//        Address address7 = Address.builder().name("Địa chỉ 7").phoneNumber("0172617261").wardId("140207").districtId("2204").provinceId("266").specificAddress("aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La").type(true).account(staff2).build();
//        address7.setId(addressRepository.save(address7).getId());
//
//        Address address8 = Address.builder().name("Địa chỉ 8").phoneNumber("0675826371").wardId("140207").districtId("2204").provinceId("266").specificAddress("aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La").type(true).account(staff3).build();
//        address8.setId(addressRepository.save(address8).getId());
//
//        Address address9 = Address.builder().name("Địa chỉ 9").phoneNumber("0452619201").wardId("140207").districtId("2204").provinceId("266").specificAddress("aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La").type(true).account(staff4).build();
//        address9.setId(addressRepository.save(address9).getId());
//
//        Address address10 = Address.builder().name("Địa chỉ 10").phoneNumber("0261920192").wardId("140207").districtId("2204").provinceId("266").specificAddress("aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La").type(true).account(staff5).build();
//        address10.setId(addressRepository.save(address10).getId());
//        //Addesss
//
//        //bill
////        Bill bill1 = Bill.builder().code("HD001").fullName("Nguyễn Văn A").phoneNumber("0123456789").address("123 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(12350000.0)).moneyReduced(BigDecimal.valueOf(100000.0)).moneyAfter(BigDecimal.valueOf(12250000.0)).shipDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).receiveDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).moneyShip(BigDecimal.valueOf(30000.0)).confirmationDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).type(TypeBill.DAT_HANG).note("Đặt hành").customerAmount(BigDecimal.valueOf(900.0)).desiredReceiptDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).completeDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).status(StatusBill.HOAN_THANH).customer(customer1).voucher(null).build();
////        bill1.setId(billRepository.save(bill1).getId());
////
////        Bill bill2 = Bill.builder().code("HD002").fullName("Nguyễn Văn B").phoneNumber("0123456789").address("124 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(12500000.0)).moneyReduced(BigDecimal.valueOf(200000.0)).moneyAfter(BigDecimal.valueOf(12300000.0)).shipDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).receiveDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).moneyShip(BigDecimal.valueOf(25000.0)).confirmationDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).type(TypeBill.DAT_HANG).note("Đặt hàng online").customerAmount(BigDecimal.valueOf(12300000.0)).desiredReceiptDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).completeDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).status(StatusBill.HOAN_THANH).customer(customer2).voucher(null).build();
////        bill2.setId(billRepository.save(bill2).getId());
////
////        Bill bill3 = Bill.builder().code("HD003").fullName("Nguyễn Văn C").phoneNumber("0123456789").address("125 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(13000000.0)).moneyReduced(BigDecimal.valueOf(300000.0)).moneyAfter(BigDecimal.valueOf(12700000.0)).shipDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).receiveDate(null).moneyShip(BigDecimal.valueOf(20000.0)).confirmationDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).type(TypeBill.DAT_HANG).note("Đặt hàng online").customerAmount(BigDecimal.valueOf(12700000.0)).desiredReceiptDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).completeDate(null).status(StatusBill.DANG_VAN_CHUYEN).customer(customer3).voucher(null).build();
////        bill3.setId(billRepository.save(bill3).getId());
////
////        Bill bill4 = Bill.builder().code("HD004").fullName("Nguyễn Văn D").phoneNumber("0123456789").address("125 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(15000000.0)).moneyReduced(BigDecimal.valueOf(0.0)).moneyAfter(BigDecimal.valueOf(15000000.0)).shipDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).receiveDate(null).moneyShip(BigDecimal.valueOf(20000.0)).confirmationDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).type(TypeBill.DAT_HANG).note("Đặt hàng online").customerAmount(BigDecimal.valueOf(15000000.0)).desiredReceiptDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).completeDate(null).status(StatusBill.DANG_VAN_CHUYEN).customer(customer3).voucher(null).build();
////        bill4.setId(billRepository.save(bill4).getId());
////
////
////        Bill bill6 = Bill.builder().code("HD006").fullName("Nguyễn Văn F").phoneNumber("0123456789").address("128 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(16000000.0)).moneyReduced(BigDecimal.valueOf(600000.0)).moneyAfter(BigDecimal.valueOf(15400000.0)).shipDate(null).receiveDate(null).moneyShip(BigDecimal.valueOf(0.0)).confirmationDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).type(TypeBill.DAT_HANG).note("Đặt hàng online").customerAmount(BigDecimal.valueOf(15400000.0)).desiredReceiptDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).completeDate(null).status(StatusBill.DA_XAC_NHAN).customer(customer2).voucher(null).build();
////        bill6.setId(billRepository.save(bill6).getId());
////
////        Bill bill7 = Bill.builder().code("HD007").fullName("Nguyễn Văn G").phoneNumber("0123456789").address("129 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(17000000.0)).moneyReduced(BigDecimal.valueOf(700000.0)).moneyAfter(BigDecimal.valueOf(16300000.0)).shipDate(null).receiveDate(null).moneyShip(BigDecimal.valueOf(0.0)).confirmationDate(null).type(TypeBill.DAT_HANG).note("Đặt online").customerAmount(BigDecimal.valueOf(0.0)).desiredReceiptDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).completeDate(null).status(StatusBill.CHO_XAC_NHAN).customer(customer5).voucher(null).build();
////        bill7.setId(billRepository.save(bill7).getId());
////
////        Bill bill8 = Bill.builder().code("HD008").fullName("Nguyễn Văn H").phoneNumber("0123456789").address("130 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(18000000.0)).moneyReduced(BigDecimal.valueOf(800000.0)).moneyAfter(BigDecimal.valueOf(17200000.0)).shipDate(null).receiveDate(null).moneyShip(BigDecimal.valueOf(0.0)).confirmationDate(null).type(TypeBill.DAT_HANG).note("Đặt hàng online").customerAmount(BigDecimal.valueOf(0.0)).desiredReceiptDate(System.currentTimeMillis() + 2 * 24 * 60 * 60 * 1000).completeDate(null).status(StatusBill.CHO_XAC_NHAN).customer(customer1).voucher(null).build();
////        bill8.setId(billRepository.save(bill8).getId());
////
////        Bill bill9 = Bill.builder().code("HD009").fullName("Nguyễn Văn I").phoneNumber("0123456789").address("131 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(19000000.0)).moneyReduced(BigDecimal.valueOf(900000.0)).moneyAfter(BigDecimal.valueOf(18100000.0)).shipDate(null).receiveDate(null).moneyShip(BigDecimal.valueOf(80000.0)).confirmationDate(System.currentTimeMillis() + 30 * 60 * 1000).type(TypeBill.TAI_QUAY).note("Mua tại quầy").customerAmount(BigDecimal.valueOf(0.0)).desiredReceiptDate(System.currentTimeMillis() - (System.currentTimeMillis() % (24 * 60 * 60 * 1000))).completeDate(null).status(StatusBill.CHO_THANH_TOAN).customer(null).voucher(null).build();
////        bill9.setId(billRepository.save(bill9).getId());
////
////        Bill bill10 = Bill.builder().code("HD010").fullName("Nguyễn Văn J").phoneNumber("0123456789").address("142 Đường ABC, Quận XYZ, Thành phố HCM").totalMoney(BigDecimal.valueOf(20000000.0)).moneyReduced(BigDecimal.valueOf(1000000.0)).moneyAfter(BigDecimal.valueOf(19000000.0)).shipDate(null).receiveDate(null).moneyShip(BigDecimal.valueOf(0.0)).confirmationDate(System.currentTimeMillis() + 30 * 60 * 1000).type(TypeBill.TAI_QUAY).note("Mua tại quầy").customerAmount(BigDecimal.valueOf(0.0)).desiredReceiptDate(System.currentTimeMillis() - (System.currentTimeMillis() % (24 * 60 * 60 * 1000))).completeDate(null).status(StatusBill.CHO_THANH_TOAN).customer(null).voucher(null).build();
////        bill10.setId(billRepository.save(bill10).getId());
////
////        Bill bill11 = Bill.builder().code("HD011").fullName("Nguyễn Văn Nam").phoneNumber("0123456789").address("142 Đường ABC, Quận DEF, Thành phố HCM").totalMoney(BigDecimal.valueOf(20000000.0)).moneyReduced(BigDecimal.valueOf(1000000.0)).moneyAfter(BigDecimal.valueOf(19000000.0)).shipDate(null).receiveDate(null).moneyShip(BigDecimal.valueOf(0.0)).confirmationDate(System.currentTimeMillis() + 30 * 60 * 1000).type(TypeBill.TAI_QUAY).note("Mua tại quầy").customerAmount(BigDecimal.valueOf(19000000.0)).desiredReceiptDate(System.currentTimeMillis() - (System.currentTimeMillis() % (24 * 60 * 60 * 1000))).completeDate(null).status(StatusBill.DA_THANH_TOAN).customer(null).voucher(null).build();
////        bill11.setId(billRepository.save(bill11).getId());
////
////        Bill bill12 = Bill.builder().code("HD012").fullName("Nguyễn Văn Nam").phoneNumber("0123456789").address("145 Đường ABC, Quận DEF, Thành phố HN").totalMoney(BigDecimal.valueOf(20000000.0)).moneyReduced(BigDecimal.valueOf(0.0)).moneyAfter(BigDecimal.valueOf(20000000.0)).shipDate(null).receiveDate(null).moneyShip(BigDecimal.valueOf(0.0)).confirmationDate(System.currentTimeMillis() + 30 * 60 * 1000).type(TypeBill.TAI_QUAY).note("Mua tại quầy").customerAmount(BigDecimal.valueOf(20000000.0)).desiredReceiptDate(System.currentTimeMillis() - (System.currentTimeMillis() % (24 * 60 * 60 * 1000))).completeDate(null).status(StatusBill.DA_THANH_TOAN).customer(null).voucher(null).build();
////        bill12.setId(billRepository.save(bill12).getId());
////
////        Bill bill13 = Bill.builder().code("HD013").fullName("Nguyễn Văn B").phoneNumber("0123456789").address("145 Đường ABC, Quận DEF, Thành phố ĐN").totalMoney(BigDecimal.valueOf(20000000.0)).moneyReduced(BigDecimal.valueOf(1000000.0)).moneyAfter(BigDecimal.valueOf(19000000.0)).shipDate(null).receiveDate(null).moneyShip(BigDecimal.valueOf(0.0)).confirmationDate(System.currentTimeMillis() + 30 * 60 * 1000).type(TypeBill.DAT_HANG).note("Đặt online").customerAmount(BigDecimal.valueOf(0.0)).desiredReceiptDate(System.currentTimeMillis() - (System.currentTimeMillis() % (24 * 60 * 60 * 1000))).completeDate(null).status(StatusBill.DA_HUY).customer(customer1).voucher(null).build();
////        bill13.setId(billRepository.save(bill13).getId());
////        //bill
//
//        //Sole
//        Sole sole1 = Sole.builder().name("Đế cao su").deleted(Status.HOAT_DONG).build();
//        sole1.setId(soleRepository.save(sole1).getId());
//        Sole sole2 = Sole.builder().name("Đế da").deleted(Status.HOAT_DONG).build();
//        sole2.setId(soleRepository.save(sole2).getId());
//        Sole sole3 = Sole.builder().name("Đế vàng").deleted(Status.HOAT_DONG).build();
//        sole3.setId(soleRepository.save(sole3).getId());
//        Sole sole4 = Sole.builder().name("Đế sắt").deleted(Status.HOAT_DONG).build();
//        sole4.setId(soleRepository.save(sole4).getId());
//        Sole sole5 = Sole.builder().name("Đế nhựa").deleted(Status.HOAT_DONG).build();
//        sole5.setId(soleRepository.save(sole5).getId());
//        //Sole
//
//        //Size
//        Size size1 = Size.builder().size(36f).deleted(Status.HOAT_DONG).build();
//        size1.setId(sizeRepository.save(size1).getId());
//
//        Size size2 = Size.builder().size(37f).deleted(Status.HOAT_DONG).build();
//        size2.setId(sizeRepository.save(size2).getId());
//
//        Size size3 = Size.builder().size(38f).deleted(Status.HOAT_DONG).build();
//        size3.setId(sizeRepository.save(size3).getId());
//
//        Size size4 = Size.builder().size(39f).deleted(Status.HOAT_DONG).build();
//        size4.setId(sizeRepository.save(size4).getId());
//
//        Size size5 = Size.builder().size(40f).deleted(Status.HOAT_DONG).build();
//        size5.setId(sizeRepository.save(size5).getId());
//        //Size
//
//        //Product
//        Product product1 = Product.builder().name("Adidas Superstar").deleted(Status.HOAT_DONG).build();
//        product1.setId(productRepository.save(product1).getId());
//        Product product2 = Product.builder().name("Nike Air Force 1").deleted(Status.HOAT_DONG).build();
//        product2.setId(productRepository.save(product2).getId());
//        Product product3 = Product.builder().name("Converse Chuck Taylor").deleted(Status.HOAT_DONG).build();
//        product3.setId(productRepository.save(product3).getId());
//        Product product4 = Product.builder().name("Puma Suede").deleted(Status.HOAT_DONG).build();
//        product4.setId(productRepository.save(product4).getId());
//        Product product5 = Product.builder().name("New Balance 990").deleted(Status.HOAT_DONG).build();
//        product5.setId(productRepository.save(product5).getId());
//        //Product
//
//        //material
//        Material material1 = Material.builder().name("Da bò").deleted(Status.HOAT_DONG).build();
//        material1.setId(materialRepository.save(material1).getId());
//
//        Material material2 = Material.builder().name("Da lộn").deleted(Status.HOAT_DONG).build();
//        material2.setId(materialRepository.save(material2).getId());
//
//        Material material3 = Material.builder().name("Vải canvas").deleted(Status.HOAT_DONG).build();
//        material3.setId(materialRepository.save(material3).getId());
//
//        Material material4 = Material.builder().name("Nylon").deleted(Status.HOAT_DONG).build();
//        material4.setId(materialRepository.save(material4).getId());
//
//        Material material5 = Material.builder().name("Suede").deleted(Status.HOAT_DONG).build();
//        material5.setId(materialRepository.save(material5).getId());
//        //material
//
//        //brand
//        Brand brand1 = Brand.builder().name("Nike").deleted(Status.HOAT_DONG).build();
//        brand1.setId(brandRepository.save(brand1).getId());
//
//        Brand brand2 = Brand.builder().name("Adidas").deleted(Status.HOAT_DONG).build();
//        brand2.setId(brandRepository.save(brand2).getId());
//
//        Brand brand3 = Brand.builder().name("Puma").deleted(Status.HOAT_DONG).build();
//        brand3.setId(brandRepository.save(brand3).getId());
//
//        Brand brand4 = Brand.builder().name("Reebok").deleted(Status.HOAT_DONG).build();
//        brand4.setId(brandRepository.save(brand4).getId());
//
//        Brand brand5 = Brand.builder().name("New Balance").deleted(Status.HOAT_DONG).build();
//        brand5.setId(brandRepository.save(brand5).getId());
//        //brand
//
//        //color
//        Color color1 = Color.builder().code("#8B0016").name("Red Devil").deleted(Status.HOAT_DONG).build();
//        color1.setId(colorRepository.save(color1).getId());
//
//        Color color2 = Color.builder().code("#00FF00").name("Green").deleted(Status.HOAT_DONG).build();
//        color2.setId(colorRepository.save(color2).getId());
//
//        Color color3 = Color.builder().code("#0000FF").name("Blue").deleted(Status.HOAT_DONG).build();
//        color3.setId(colorRepository.save(color3).getId());
//
//        Color color4 = Color.builder().code("#FFFF00").name("Yellow").deleted(Status.HOAT_DONG).build();
//        color4.setId(colorRepository.save(color4).getId());
//
//        Color color5 = Color.builder().code("#FFA500").name("Orange").deleted(Status.HOAT_DONG).build();
//        color5.setId(colorRepository.save(color5).getId());
//        //color
//
//        //category
//        Category category1 = Category.builder().name("Giày lười").deleted(Status.HOAT_DONG).build();
//        category1.setId(categoryRepository.save(category1).getId());
//
//        Category category2 = Category.builder().name("Giày thời trang").deleted(Status.HOAT_DONG).build();
//        category2.setId(categoryRepository.save(category2).getId());
//
//        Category category3 = Category.builder().name("Giày nam").deleted(Status.HOAT_DONG).build();
//        category3.setId(categoryRepository.save(category3).getId());
//
//        Category category4 = Category.builder().name("Giày nữ").deleted(Status.HOAT_DONG).build();
//        category4.setId(categoryRepository.save(category4).getId());
//
//        Category category5 = Category.builder().name("Giày thể thao").deleted(Status.HOAT_DONG).build();
//        category5.setId(categoryRepository.save(category5).getId());
//        //Category
//
//        //product detail
//        ProductDetail productDetail1 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD001").price(BigDecimal.valueOf(100000)).deleted(Status.HOAT_DONG).amount(500).description("Mô tả sản phẩm 1").brand(brand1).sole(sole1).size(size1)
//                .product(product1).material(material1).color(color1).category(category1).build();
//        productDetail1.setId(productDetailRepository.save(productDetail1).getId());
//
//        ProductDetail productDetail2 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD002").price(BigDecimal.valueOf(90000)).deleted(Status.HOAT_DONG).amount(450).description("Mô tả sản phẩm 2").brand(brand2).sole(sole2).size(size2).product(product2).material(material2).color(color2).category(category2).build();
//        productDetail2.setId(productDetailRepository.save(productDetail2).getId());
//
//        ProductDetail productDetail3 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD003").price(BigDecimal.valueOf(80000)).deleted(Status.HOAT_DONG).amount(400).description("Mô tả sản phẩm 3").brand(brand3).sole(sole3).size(size3).product(product3).material(material3).color(color3).category(category3).build();
//        productDetail3.setId(productDetailRepository.save(productDetail3).getId());
//
//        ProductDetail productDetail4 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD004").price(BigDecimal.valueOf(70000)).deleted(Status.HOAT_DONG).amount(350).description("Mô tả sản phẩm 4").brand(brand4).sole(sole4).size(size4).product(product4).material(material4).color(color4).category(category4).build();
//        productDetail4.setId(productDetailRepository.save(productDetail4).getId());
//
//        ProductDetail productDetail5 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD005").price(BigDecimal.valueOf(60000)).deleted(Status.HOAT_DONG).amount(300).description("Mô tả sản phẩm 5").brand(brand5).sole(sole5).size(size5).product(product5).material(material5).color(color5).category(category5).build();
//        productDetail5.setId(productDetailRepository.save(productDetail5).getId());
//
//        ProductDetail productDetail6 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD006").price(BigDecimal.valueOf(55000)).deleted(Status.HOAT_DONG).amount(280).description("Mô tả sản phẩm 6").brand(brand1).sole(sole5).size(size1).product(product1).material(material1).color(color1).category(category1).build();
//        productDetail6.setId(productDetailRepository.save(productDetail6).getId());
//
//        ProductDetail productDetail7 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD007").price(BigDecimal.valueOf(48000)).deleted(Status.HOAT_DONG).amount(240).description("Mô tả sản phẩm 7").brand(brand2).sole(sole4).size(size2).product(product2).material(material2).color(color2).category(category2).build();
//        productDetail7.setId(productDetailRepository.save(productDetail7).getId());
//
//        ProductDetail productDetail8 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD008").price(BigDecimal.valueOf(50000)).deleted(Status.HOAT_DONG).amount(250).description("Mô tả sản phẩm 8").brand(brand3).sole(sole3).size(size3).product(product3).material(material3).color(color3).category(category3).build();
//        productDetail8.setId(productDetailRepository.save(productDetail8).getId());
//
//        ProductDetail productDetail9 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD009").price(BigDecimal.valueOf(45000)).deleted(Status.HOAT_DONG).amount(230).description("Mô tả sản phẩm 9").brand(brand4).sole(sole2).size(size4).product(product4).material(material4).color(color4).category(category4).build();
//        productDetail9.setId(productDetailRepository.save(productDetail9).getId());
//
//        ProductDetail productDetail10 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD010").price(BigDecimal.valueOf(40000)).deleted(Status.HOAT_DONG).amount(200).description("Mô tả sản phẩm 10").brand(brand5).sole(sole1).size(size5).product(product5).material(material5).color(color5).category(category5).build();
//        productDetail10.setId(productDetailRepository.save(productDetail10).getId());
//
//        ProductDetail productDetail11 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD011").price(BigDecimal.valueOf(35000)).deleted(Status.HOAT_DONG).amount(180).description("Mô tả sản phẩm 11").brand(brand1).sole(sole1).size(size5).product(product1).material(material1).color(color1).category(category1).build();
//        productDetail11.setId(productDetailRepository.save(productDetail11).getId());
//
//        ProductDetail productDetail12 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD012").price(BigDecimal.valueOf(30000)).deleted(Status.HOAT_DONG).amount(150).description("Mô tả sản phẩm 12").brand(brand2).sole(sole2).size(size4).product(product2).material(material2).color(color2).category(category2).build();
//        productDetail12.setId(productDetailRepository.save(productDetail12).getId());
//
//        ProductDetail productDetail13 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD013").price(BigDecimal.valueOf(25000)).deleted(Status.HOAT_DONG).amount(130).description("Mô tả sản phẩm 13").brand(brand3).sole(sole3).size(size3).product(product3).material(material3).color(color3).category(category3).build();
//        productDetail13.setId(productDetailRepository.save(productDetail13).getId());
//
//        ProductDetail productDetail14 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD014").price(BigDecimal.valueOf(20000)).deleted(Status.HOAT_DONG).amount(100).description("Mô tả sản phẩm 14").brand(brand4).sole(sole4).size(size2).product(product4).material(material4).color(color4).category(category4).build();
//        productDetail14.setId(productDetailRepository.save(productDetail14).getId());
//
//        ProductDetail productDetail15 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD015").price(BigDecimal.valueOf(15000)).deleted(Status.HOAT_DONG).amount(80).description("Mô tả sản phẩm 15").brand(brand5).sole(sole5).size(size1).product(product5).material(material5).color(color5).category(category5).build();
//        productDetail15.setId(productDetailRepository.save(productDetail15).getId());
//
//        ProductDetail productDetail16 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD016").price(BigDecimal.valueOf(12000)).deleted(Status.HOAT_DONG).amount(60).description("Mô tả sản phẩm 16").brand(brand1).sole(sole1).size(size1).product(product1).material(material5).color(color1).category(category1).build();
//        productDetail16.setId(productDetailRepository.save(productDetail16).getId());
//
//        ProductDetail productDetail17 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD017").price(BigDecimal.valueOf(10000)).deleted(Status.HOAT_DONG).amount(50).description("Mô tả sản phẩm 17").brand(brand2).sole(sole2).size(size2).product(product2).material(material4).color(color2).category(category2).build();
//        productDetail17.setId(productDetailRepository.save(productDetail17).getId());
//
//        ProductDetail productDetail18 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD018").price(BigDecimal.valueOf(18000)).deleted(Status.HOAT_DONG).amount(90).description("Mô tả sản phẩm 18").brand(brand1).sole(sole1).size(size1).product(product1).material(material3).color(color1).category(category1).build();
//        productDetail18.setId(productDetailRepository.save(productDetail18).getId());
//
//        ProductDetail productDetail19 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD019").price(BigDecimal.valueOf(19000)).deleted(Status.HOAT_DONG).amount(90).description("Mô tả sản phẩm 19").brand(brand2).sole(sole2).size(size2).product(product2).material(material2).color(color2).category(category2).build();
//        productDetail19.setId(productDetailRepository.save(productDetail19).getId());
//
//        ProductDetail productDetail20 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD020").price(BigDecimal.valueOf(20000)).deleted(Status.HOAT_DONG).amount(100).description("Mô tả sản phẩm 20").brand(brand3).sole(sole3).size(size3).product(product3).material(material1).color(color3).category(category3).build();
//        productDetail20.setId(productDetailRepository.save(productDetail20).getId());
//
//        ProductDetail productDetail21 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD021").price(BigDecimal.valueOf(21000)).deleted(Status.HOAT_DONG).amount(100).description("Mô tả sản phẩm 21").brand(brand4).sole(sole4).size(size4).product(product4).material(material4).color(color1).category(category4).build();
//        productDetail21.setId(productDetailRepository.save(productDetail21).getId());
//
//        ProductDetail productDetail22 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD022").price(BigDecimal.valueOf(22000)).deleted(Status.HOAT_DONG).amount(110).description("Mô tả sản phẩm 22").brand(brand5).sole(sole5).size(size5).product(product5).material(material5).color(color2).category(category5).build();
//        productDetail22.setId(productDetailRepository.save(productDetail22).getId());
//
//        ProductDetail productDetail23 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD023").price(BigDecimal.valueOf(23000)).deleted(Status.HOAT_DONG).amount(110).description("Mô tả sản phẩm 23").brand(brand1).sole(sole1).size(size1).product(product1).material(material1).color(color3).category(category1).build();
//        productDetail23.setId(productDetailRepository.save(productDetail23).getId());
//
//        ProductDetail productDetail24 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD024").price(BigDecimal.valueOf(24000)).deleted(Status.HOAT_DONG).amount(120).description("Mô tả sản phẩm 24").brand(brand2).sole(sole2).size(size2).product(product2).material(material2).color(color1).category(category2).build();
//        productDetail24.setId(productDetailRepository.save(productDetail24).getId());
//
//        ProductDetail productDetail25 = ProductDetail.builder().weight(1000).quantityReturn(0).code("PD025").price(BigDecimal.valueOf(25000)).deleted(Status.HOAT_DONG).amount(120).description("Mô tả sản phẩm 25").brand(brand3).sole(sole3).size(size3).product(product3).material(material3).color(color1).category(category3).build();
//        productDetail25.setId(productDetailRepository.save(productDetail25).getId());
//        //product detail
//
//        //Image
//        Image image1 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail1).build();
//        image1.setId(imageRepository.save(image1).getId());
//
//        Image image2 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail2).build();
//        image2.setId(imageRepository.save(image2).getId());
//
//        Image image3 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail3).build();
//        image3.setId(imageRepository.save(image3).getId());
//
//        Image image4 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail4).build();
//        image4.setId(imageRepository.save(image4).getId());
//
//        Image image5 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail5).build();
//        image5.setId(imageRepository.save(image5).getId());
//
//        Image image6 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail6).build();
//        image6.setId(imageRepository.save(image6).getId());
//
//        Image image7 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail7).build();
//        image7.setId(imageRepository.save(image7).getId());
//
//        Image image8 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail8).build();
//        image8.setId(imageRepository.save(image8).getId());
//
//        Image image9 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail9).build();
//        image9.setId(imageRepository.save(image9).getId());
//
//        Image image10 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail10).build();
//        image10.setId(imageRepository.save(image10).getId());
//
//        Image image11 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail11).build();
//        image11.setId(imageRepository.save(image11).getId());
//
//        Image image12 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail12).build();
//        image12.setId(imageRepository.save(image12).getId());
//
//        Image image13 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail13).build();
//        image13.setId(imageRepository.save(image13).getId());
//
//        Image image14 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail14).build();
//        image14.setId(imageRepository.save(image14).getId());
//
//        Image image15 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail15).build();
//        image15.setId(imageRepository.save(image15).getId());
//
//        Image image16 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail16).build();
//        image16.setId(imageRepository.save(image16).getId());
//
//        Image image17 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail17).build();
//        image17.setId(imageRepository.save(image17).getId());
//
//        Image image18 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail18).build();
//        image18.setId(imageRepository.save(image18).getId());
//
//        Image image19 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail19).build();
//        image19.setId(imageRepository.save(image19).getId());
//
//        Image image20 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail20).build();
//        image20.setId(imageRepository.save(image20).getId());
//
//        Image image21 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail21).build();
//        image21.setId(imageRepository.save(image21).getId());
//
//        Image image22 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail22).build();
//        image22.setId(imageRepository.save(image22).getId());
//
//        Image image23 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail23).build();
//        image23.setId(imageRepository.save(image23).getId());
//
//        Image image24 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail24).build();
//        image24.setId(imageRepository.save(image24).getId());
//
//        Image image25 = Image.builder().url("https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg").deleted(Status.HOAT_DONG).defaultImage(true).productDetail(productDetail25).build();
//        image25.setId(imageRepository.save(image25).getId());
//        //Image
//
////        //billDetail
////        BillDetail billDetail1 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(200000)).status(StatusBillDetail.TON_TAI).bill(bill1).productDetail(productDetail1).build();
////        billDetail1.setId(billDetailRepository.save(billDetail1).getId());
////
////        BillDetail billDetail2 = BillDetail.builder().quantity(3).price(BigDecimal.valueOf(270000)).status(StatusBillDetail.TON_TAI).bill(bill2).productDetail(productDetail2).build();
////        billDetail2.setId(billDetailRepository.save(billDetail2).getId());
////
////        BillDetail billDetail3 = BillDetail.builder().quantity(1).price(BigDecimal.valueOf(80000)).status(StatusBillDetail.TON_TAI).bill(bill3).productDetail(productDetail3).build();
////        billDetail3.setId(billDetailRepository.save(billDetail3).getId());
////
////        BillDetail billDetail4 = BillDetail.builder().quantity(4).price(BigDecimal.valueOf(280000)).status(StatusBillDetail.TON_TAI).bill(bill4).productDetail(productDetail4).build();
////        billDetail4.setId(billDetailRepository.save(billDetail4).getId());
////
////
////        BillDetail billDetail6 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(200000)).status(StatusBillDetail.TON_TAI).bill(bill6).productDetail(productDetail6).build();
////        billDetail6.setId(billDetailRepository.save(billDetail6).getId());
////
////        BillDetail billDetail7 = BillDetail.builder().quantity(3).price(BigDecimal.valueOf(270000)).status(StatusBillDetail.TON_TAI).bill(bill7).productDetail(productDetail7).build();
////        billDetail7.setId(billDetailRepository.save(billDetail7).getId());
////
////        BillDetail billDetail8 = BillDetail.builder().quantity(1).price(BigDecimal.valueOf(80000)).status(StatusBillDetail.TON_TAI).bill(bill8).productDetail(productDetail8).build();
////        billDetail8.setId(billDetailRepository.save(billDetail8).getId());
////
////        BillDetail billDetail9 = BillDetail.builder().quantity(4).price(BigDecimal.valueOf(280000)).status(StatusBillDetail.TON_TAI).bill(bill9).productDetail(productDetail9).build();
////        billDetail9.setId(billDetailRepository.save(billDetail9).getId());
////
////        BillDetail billDetail10 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(120000)).status(StatusBillDetail.TON_TAI).bill(bill10).productDetail(productDetail10).build();
////        billDetail10.setId(billDetailRepository.save(billDetail10).getId());
////
////        BillDetail billDetail11 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(200000)).status(StatusBillDetail.TON_TAI).bill(bill11).productDetail(productDetail1).build();
////        billDetail11.setId(billDetailRepository.save(billDetail11).getId());
////
////        BillDetail billDetail12 = BillDetail.builder().quantity(3).price(BigDecimal.valueOf(270000)).status(StatusBillDetail.TON_TAI).bill(bill12).productDetail(productDetail2).build();
////        billDetail12.setId(billDetailRepository.save(billDetail12).getId());
////
////        BillDetail billDetail13 = BillDetail.builder().quantity(1).price(BigDecimal.valueOf(80000)).status(StatusBillDetail.TON_TAI).bill(bill13).productDetail(productDetail3).build();
////        billDetail13.setId(billDetailRepository.save(billDetail13).getId());
////
////        BillDetail billDetail14 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(200000)).status(StatusBillDetail.TON_TAI).bill(bill1).productDetail(productDetail14).build();
////        billDetail14.setId(billDetailRepository.save(billDetail14).getId());
////
////        BillDetail billDetail15 = BillDetail.builder().quantity(3).price(BigDecimal.valueOf(270000)).status(StatusBillDetail.TON_TAI).bill(bill2).productDetail(productDetail15).build();
////        billDetail15.setId(billDetailRepository.save(billDetail15).getId());
////
////        BillDetail billDetail16 = BillDetail.builder().quantity(1).price(BigDecimal.valueOf(80000)).status(StatusBillDetail.TON_TAI).bill(bill3).productDetail(productDetail16).build();
////        billDetail16.setId(billDetailRepository.save(billDetail16).getId());
////
////        BillDetail billDetail17 = BillDetail.builder().quantity(4).price(BigDecimal.valueOf(280000)).status(StatusBillDetail.TON_TAI).bill(bill4).productDetail(productDetail17).build();
////        billDetail17.setId(billDetailRepository.save(billDetail17).getId());
////
////
////        BillDetail billDetail19 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(200000)).status(StatusBillDetail.TON_TAI).bill(bill6).productDetail(productDetail19).build();
////        billDetail19.setId(billDetailRepository.save(billDetail19).getId());
////
////        BillDetail billDetail20 = BillDetail.builder().quantity(3).price(BigDecimal.valueOf(270000)).status(StatusBillDetail.TON_TAI).bill(bill7).productDetail(productDetail20).build();
////        billDetail20.setId(billDetailRepository.save(billDetail20).getId());
////
////        BillDetail billDetail21 = BillDetail.builder().quantity(1).price(BigDecimal.valueOf(80000)).status(StatusBillDetail.TON_TAI).bill(bill8).productDetail(productDetail21).build();
////        billDetail21.setId(billDetailRepository.save(billDetail21).getId());
////
////        BillDetail billDetail22 = BillDetail.builder().quantity(4).price(BigDecimal.valueOf(280000)).status(StatusBillDetail.TON_TAI).bill(bill9).productDetail(productDetail22).build();
////        billDetail22.setId(billDetailRepository.save(billDetail22).getId());
////
////        BillDetail billDetail23 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(120000)).status(StatusBillDetail.TON_TAI).bill(bill10).productDetail(productDetail23).build();
////        billDetail23.setId(billDetailRepository.save(billDetail23).getId());
////
////        BillDetail billDetail24 = BillDetail.builder().quantity(2).price(BigDecimal.valueOf(200000)).status(StatusBillDetail.TON_TAI).bill(bill11).productDetail(productDetail24).build();
////        billDetail24.setId(billDetailRepository.save(billDetail24).getId());
////
////        BillDetail billDetail25 = BillDetail.builder().quantity(3).price(BigDecimal.valueOf(270000)).status(StatusBillDetail.TON_TAI).bill(bill12).productDetail(productDetail25).build();
////        billDetail25.setId(billDetailRepository.save(billDetail25).getId());
////
////        BillDetail billDetail26 = BillDetail.builder().quantity(1).price(BigDecimal.valueOf(80000)).status(StatusBillDetail.TON_TAI).bill(bill13).productDetail(productDetail1).build();
////        billDetail26.setId(billDetailRepository.save(billDetail26).getId());
////
////        //billDetail
////
////        //transaction
////        Transaction transaction1 = Transaction.builder().type(TypeTransaction.THANH_TOAN).totalMoney(BigDecimal.valueOf(500000.0)).paymentMethod(PaymentMethod.TIEN_MAT).note("Payment for Order #HD1").status(Status.HOAT_DONG).bill(bill1).account(staff1).build();
////        transaction1.setId(transactionRepository.save(transaction1).getId());
////
////        Transaction transaction2 = Transaction.builder().type(TypeTransaction.THANH_TOAN).totalMoney(BigDecimal.valueOf(600000)).paymentMethod(PaymentMethod.TIEN_MAT).note("Payment for Order #HD2").status(Status.HOAT_DONG).bill(bill2).account(staff2).build();
////        transaction2.setId(transactionRepository.save(transaction2).getId());
////
////        Transaction transaction3 = Transaction.builder().type(TypeTransaction.THANH_TOAN).totalMoney(BigDecimal.valueOf(700000)).paymentMethod(PaymentMethod.TIEN_MAT).note("Payment for Order #HD3").status(Status.HOAT_DONG).bill(bill3).account(staff3).build();
////        transaction3.setId(transactionRepository.save(transaction3).getId());
////
////        Transaction transaction4 = Transaction.builder().type(TypeTransaction.THANH_TOAN).totalMoney(BigDecimal.valueOf(800000)).paymentMethod(PaymentMethod.CHUYEN_KHOAN).note("Payment for Order #HD4").status(Status.HOAT_DONG).bill(bill4).account(staff4).build();
////        transaction4.setId(transactionRepository.save(transaction4).getId());
////
////
////        Transaction transaction6 = Transaction.builder().type(TypeTransaction.THANH_TOAN).totalMoney(BigDecimal.valueOf(1000000)).paymentMethod(PaymentMethod.CHUYEN_KHOAN).note("Payment for Order #HD6").status(Status.HOAT_DONG).bill(bill6).account(staff1).build();
////        transaction6.setId(transactionRepository.save(transaction6).getId());
////
////        Transaction transaction7 = Transaction.builder().type(TypeTransaction.THANH_TOAN).totalMoney(BigDecimal.valueOf(1100000)).paymentMethod(PaymentMethod.CHUYEN_KHOAN).note("Payment for Order #HD11").status(Status.HOAT_DONG).bill(bill11).account(staff4).build();
////
////        transaction7.setId(transactionRepository.save(transaction7).getId());
////
////        Transaction transaction8 = Transaction.builder().type(TypeTransaction.THANH_TOAN).totalMoney(BigDecimal.valueOf(1200000)).paymentMethod(PaymentMethod.TIEN_MAT).note("Payment for Order #HD12").status(Status.HOAT_DONG).bill(bill12).account(staff2).build();
////        transaction8.setId(transactionRepository.save(transaction8).getId());
//        //transaction
//
//        //ProductPromotion
//        ProductPromotion productPromotion1 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(50)).productDetail(productDetail1).promotion(promotion1).build();
//        productPromotion1.setId(productPromotionRepository.save(productPromotion1).getId());
//
//        ProductPromotion productPromotion2 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(55)).productDetail(productDetail2).promotion(promotion1).build();
//        productPromotion2.setId(productPromotionRepository.save(productPromotion2).getId());
//
//        ProductPromotion productPromotion3 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(60)).productDetail(productDetail3).promotion(promotion1).build();
//        productPromotion3.setId(productPromotionRepository.save(productPromotion3).getId());
//
//        ProductPromotion productPromotion4 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(65)).productDetail(productDetail4).promotion(promotion1).build();
//        productPromotion4.setId(productPromotionRepository.save(productPromotion4).getId());
//
//        ProductPromotion productPromotion5 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(70)).productDetail(productDetail5).promotion(promotion1).build();
//        productPromotion5.setId(productPromotionRepository.save(productPromotion5).getId());
//
//        ProductPromotion productPromotion6 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(75)).productDetail(productDetail6).promotion(promotion2).build();
//        productPromotion6.setId(productPromotionRepository.save(productPromotion6).getId());
//
//        ProductPromotion productPromotion7 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(80)).productDetail(productDetail7).promotion(promotion2).build();
//        productPromotion7.setId(productPromotionRepository.save(productPromotion7).getId());
//
//        ProductPromotion productPromotion8 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(85)).productDetail(productDetail8).promotion(promotion3).build();
//        productPromotion8.setId(productPromotionRepository.save(productPromotion8).getId());
//
//        ProductPromotion productPromotion9 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(90)).productDetail(productDetail9).promotion(promotion4).build();
//        productPromotion9.setId(productPromotionRepository.save(productPromotion9).getId());
//
//        ProductPromotion productPromotion10 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(95)).productDetail(productDetail10).promotion(promotion5).build();
//        productPromotion10.setId(productPromotionRepository.save(productPromotion10).getId());
//
//        ProductPromotion productPromotion11 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(100)).productDetail(productDetail11).promotion(promotion3).build();
//        productPromotion11.setId(productPromotionRepository.save(productPromotion11).getId());
//
//        ProductPromotion productPromotion12 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(105)).productDetail(productDetail12).promotion(promotion3).build();
//        productPromotion12.setId(productPromotionRepository.save(productPromotion12).getId());
//
//        ProductPromotion productPromotion13 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(110)).productDetail(productDetail13).promotion(promotion3).build();
//        productPromotion13.setId(productPromotionRepository.save(productPromotion13).getId());
//
//        ProductPromotion productPromotion14 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(115)).productDetail(productDetail14).promotion(promotion3).build();
//        productPromotion14.setId(productPromotionRepository.save(productPromotion14).getId());// ProductPromotion 15
//        ProductPromotion productPromotion15 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(120)).productDetail(productDetail15).promotion(promotion3).build();
//        productPromotion15.setId(productPromotionRepository.save(productPromotion15).getId());
//
//        ProductPromotion productPromotion16 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(125)).productDetail(productDetail16).promotion(promotion4).build();
//        productPromotion16.setId(productPromotionRepository.save(productPromotion16).getId());
//
//        ProductPromotion productPromotion17 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(130)).productDetail(productDetail17).promotion(promotion4).build();
//        productPromotion17.setId(productPromotionRepository.save(productPromotion17).getId());
//
//        ProductPromotion productPromotion18 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(135)).productDetail(productDetail18).promotion(promotion4).build();
//        productPromotion18.setId(productPromotionRepository.save(productPromotion18).getId());
//
//        ProductPromotion productPromotion19 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(140)).productDetail(productDetail19).promotion(promotion4).build();
//        productPromotion19.setId(productPromotionRepository.save(productPromotion19).getId());
//
//        ProductPromotion productPromotion20 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(145)).productDetail(productDetail20).promotion(promotion4).build();
//        productPromotion20.setId(productPromotionRepository.save(productPromotion20).getId());
//
//        ProductPromotion productPromotion21 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(150)).productDetail(productDetail21).promotion(promotion5).build();
//        productPromotion21.setId(productPromotionRepository.save(productPromotion21).getId());
//
//        ProductPromotion productPromotion22 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(155)).productDetail(productDetail22).promotion(promotion5).build();
//        productPromotion22.setId(productPromotionRepository.save(productPromotion22).getId());
//
//        ProductPromotion productPromotion23 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(160)).productDetail(productDetail23).promotion(promotion5).build();
//        productPromotion23.setId(productPromotionRepository.save(productPromotion23).getId());
//
//        ProductPromotion productPromotion24 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(165)).productDetail(productDetail24).promotion(promotion5).build();
//        productPromotion24.setId(productPromotionRepository.save(productPromotion24).getId());
//
//        ProductPromotion productPromotion25 = ProductPromotion.builder().pricePromotion(BigDecimal.valueOf(170)).productDetail(productDetail25).promotion(promotion5).build();
//        productPromotion25.setId(productPromotionRepository.save(productPromotion25).getId());
//        //ProductPromotion
//
////        //billhistory
////
////        BillHistory billHistory1 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tạo đơn hàng").bill(bill1).account(null).build();
////        billHistory1.setId(billHistoryRepository.save(billHistory1).getId());
////
////        BillHistory billHistory2 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Xac nhan don hang").bill(bill1).account(staff1).build();
////        billHistory2.setId(billHistoryRepository.save(billHistory2).getId());
////
////        BillHistory billHistory3 = BillHistory.builder().statusBill(StatusBill.DANG_VAN_CHUYEN).note("Don hang dang giao den ban").bill(bill1).account(staff1).build();
////        billHistory3.setId(billHistoryRepository.save(billHistory3).getId());
////
////        BillHistory billHistory4 = BillHistory.builder().statusBill(StatusBill.DA_GIAO_HANG).note("Da giao hang").bill(bill1).account(staff1).build();
////        billHistory4.setId(billHistoryRepository.save(billHistory4).getId());
////
////        BillHistory billHistory5 = BillHistory.builder().statusBill(StatusBill.DA_THANH_TOAN).note("Da thanh toan").bill(bill1).account(staff1).build();
////        billHistory5.setId(billHistoryRepository.save(billHistory5).getId());
////
////        BillHistory billHistory6 = BillHistory.builder().statusBill(StatusBill.HOAN_THANH).note("Hoan thanh").bill(bill1).account(staff1).build();
////        billHistory6.setId(billHistoryRepository.save(billHistory6).getId());
////
////        BillHistory billHistory7 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tạo đơn hàng").bill(bill2).account(null).build();
////        billHistory7.setId(billHistoryRepository.save(billHistory7).getId());
////
////        BillHistory billHistory8 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Da thanh toan").bill(bill2).account(null).build();
////        billHistory8.setId(billHistoryRepository.save(billHistory8).getId());
////
////        BillHistory billHistory9 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Xac nhan don hang").bill(bill2).account(staff1).build();
////        billHistory9.setId(billHistoryRepository.save(billHistory9).getId());
////
////        BillHistory billHistory10 = BillHistory.builder().statusBill(StatusBill.DANG_VAN_CHUYEN).note("Don hang dang giao den ban").bill(bill2).account(staff1).build();
////        billHistory10.setId(billHistoryRepository.save(billHistory10).getId());
////
////        BillHistory billHistory11 = BillHistory.builder().statusBill(StatusBill.DA_GIAO_HANG).note("Da giao hang").bill(bill2).account(staff1).build();
////        billHistory11.setId(billHistoryRepository.save(billHistory11).getId());
////
////        BillHistory billHistory12 = BillHistory.builder().statusBill(StatusBill.HOAN_THANH).note("Hoan thanh").bill(bill2).account(staff1).build();
////        billHistory12.setId(billHistoryRepository.save(billHistory12).getId());
//////bill 3:
////        BillHistory billHistory13 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tạo đơn hàng").bill(bill3).account(null).build();
////        billHistory13.setId(billHistoryRepository.save(billHistory13).getId());
////
////        BillHistory billHistory14 = BillHistory.builder().statusBill(StatusBill.DA_THANH_TOAN).note("Thanh toan").bill(bill3).account(null).build();
////        billHistory14.setId(billHistoryRepository.save(billHistory14).getId());
////
////        BillHistory billHistory15 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Xac nhan don hang").bill(bill3).account(staff1).build();
////        billHistory15.setId(billHistoryRepository.save(billHistory15).getId());
////
////        BillHistory billHistory16 = BillHistory.builder().statusBill(StatusBill.DANG_VAN_CHUYEN).note("Don hang dang giao den ban").bill(bill3).account(staff1).build();
////        billHistory16.setId(billHistoryRepository.save(billHistory16).getId());
////
////        //bill 4:
////        BillHistory billHistory17 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tạo đơn hàng").bill(bill4).account(null).build();
////        billHistory17.setId(billHistoryRepository.save(billHistory17).getId());
////
////        BillHistory billHistory18 = BillHistory.builder().statusBill(StatusBill.DA_THANH_TOAN).note("Thanh toan").bill(bill4).account(null).build();
////        billHistory18.setId(billHistoryRepository.save(billHistory18).getId());
////
////        BillHistory billHistory19 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Xac nhan don hang").bill(bill4).account(staff1).build();
////        billHistory19.setId(billHistoryRepository.save(billHistory19).getId());
////
////        BillHistory billHistory20 = BillHistory.builder().statusBill(StatusBill.DANG_VAN_CHUYEN).note("Don hang dang giao den ban").bill(bill4).account(staff1).build();
////        billHistory20.setId(billHistoryRepository.save(billHistory20).getId());
////
////        //bill 6:
////        BillHistory billHistory24 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tạo đơn hàng").bill(bill6).account(null).build();
////        billHistory24.setId(billHistoryRepository.save(billHistory24).getId());
////
////        BillHistory billHistory25 = BillHistory.builder().statusBill(StatusBill.DA_THANH_TOAN).note("Thanh toan").bill(bill6).account(null).build();
////        billHistory25.setId(billHistoryRepository.save(billHistory25).getId());
////
////        BillHistory billHistory26 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Xac nhan don hang").bill(bill6).account(staff1).build();
////        billHistory26.setId(billHistoryRepository.save(billHistory26).getId());
////
////        //bill 7:
////        BillHistory billHistory27 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tao don hang").bill(bill7).account(null).build();
////        billHistory27.setId(billHistoryRepository.save(billHistory27).getId());
////
////        //bill8:
////        BillHistory billHistory28 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tao don hang").bill(bill8).account(null).build();
////        billHistory28.setId(billHistoryRepository.save(billHistory28).getId());
////
////        //bill9:
////        BillHistory billHistory29 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tao don").bill(bill9).account(staff1).build();
////        billHistory29.setId(billHistoryRepository.save(billHistory29).getId());
////
////        BillHistory billHistory30 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Da xac nhan").bill(bill9).account(staff1).build();
////        billHistory30.setId(billHistoryRepository.save(billHistory29).getId());
////        //bill10:
////        BillHistory billHistory31 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tao don").bill(bill10).account(staff1).build();
////        billHistory31.setId(billHistoryRepository.save(billHistory31).getId());
////
////        BillHistory billHistory32 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Da xac nhan").bill(bill10).account(staff1).build();
////        billHistory32.setId(billHistoryRepository.save(billHistory32).getId());
////
////        //bill11:
////        BillHistory billHistory33 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tao don").bill(bill11).account(staff1).build();
////        billHistory33.setId(billHistoryRepository.save(billHistory33).getId());
////
////        BillHistory billHistory34 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Da xac nhan").bill(bill11).account(staff1).build();
////        billHistory34.setId(billHistoryRepository.save(billHistory34).getId());
////
////        BillHistory billHistory35 = BillHistory.builder().statusBill(StatusBill.DA_THANH_TOAN).note("Da thanh toan").bill(bill11).account(staff1).build();
////        billHistory35.setId(billHistoryRepository.save(billHistory35).getId());
////
////        //bill12:
////        BillHistory billHistory36 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tao don").bill(bill12).account(staff1).build();
////        billHistory36.setId(billHistoryRepository.save(billHistory36).getId());
////
////        BillHistory billHistory37 = BillHistory.builder().statusBill(StatusBill.DA_XAC_NHAN).note("Da xac nhan").bill(bill12).account(staff1).build();
////        billHistory37.setId(billHistoryRepository.save(billHistory37).getId());
////
////        BillHistory billHistory38 = BillHistory.builder().statusBill(StatusBill.DA_THANH_TOAN).note("Da thanh toan").bill(bill12).account(staff1).build();
////        billHistory38.setId(billHistoryRepository.save(billHistory38).getId());
////
////        //bill 13:
////        BillHistory billHistory39 = BillHistory.builder().statusBill(StatusBill.CHO_XAC_NHAN).note("Tao don").bill(bill13).account(null).build();
////        billHistory39.setId(billHistoryRepository.save(billHistory39).getId());
////
////        BillHistory billHistory40 = BillHistory.builder().statusBill(StatusBill.DA_HUY).note("Huy don").bill(bill13).account(null).build();
////        billHistory40.setId(billHistoryRepository.save(billHistory40).getId());
//////        //billhistory
//        Account accountAdmin = Account.builder().role(RoleAccount.QUAN_LY)
//                .code("NV6")
//                .fullName("Nguyễn Văn Nhật")
//                .dateBirth(System.currentTimeMillis())
//                .CitizenId("1234999890123456")
//                .phoneNumber("0987656412")
//                .email("admin@gmail.com")
//                .gender(true)
//                .password(MD5Util.getMD5("admin"))
//                .avatar("https://res.cloudinary.com/dioxktgsm/image/upload/v1699145685/hz5f5miaqvpxyewazije.png")
//                .status(Status.HOAT_DONG)
//                .build();
//        Account accountClient = Account.builder().role(RoleAccount.KHACH_HANG)
//                .code("KH6")
//                .fullName("Nguyễn Thị Thùy Dương")
//                .dateBirth(System.currentTimeMillis())
//                .CitizenId("077564778753")
//                .phoneNumber("0647536475")
//                .email("nguyenthithuyduong948@gmail.com")
//                .gender(true)
//                .password(MD5Util.getMD5("thuyduongxih"))
//                .avatar("https://res.cloudinary.com/dioxktgsm/image/upload/v1699145591/vfitrqzsyeueqpiioguz.jpg")
//                .status(Status.HOAT_DONG)
//                .build();
//        accountRepository.save(accountAdmin);
//        accountRepository.save(accountClient);
//        Address address11 = Address.builder().name("Địa chỉ 11").phoneNumber("0563728192").wardId("140207").districtId("2204").provinceId("266").specificAddress("aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La").type(true).account(accountAdmin).build();
//        address11.setId(addressRepository.save(address11).getId());
//        Address address12 = Address.builder().name("Địa chỉ 12").phoneNumber("0473029182").wardId("140207").districtId("2204").provinceId("266").specificAddress("aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La").type(true).account(accountClient).build();
//        address12.setId(addressRepository.save(address12).getId());
//    }
//}
