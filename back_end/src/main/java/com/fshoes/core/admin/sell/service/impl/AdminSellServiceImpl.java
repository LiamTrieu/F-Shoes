package com.fshoes.core.admin.sell.service.impl;

import com.fshoes.core.admin.hoadon.repository.HDBillHistoryRepository;
import com.fshoes.core.admin.khachhang.repository.KhachHangRepository;
import com.fshoes.core.admin.sanpham.model.respone.ProductMaxPriceResponse;
import com.fshoes.core.admin.sell.model.request.AdCustomerRequest;
import com.fshoes.core.admin.sell.model.request.AddBillRequest;
import com.fshoes.core.admin.sell.model.request.CreateBillRequest;
import com.fshoes.core.admin.sell.model.request.FilterProductDetailRequest;
import com.fshoes.core.admin.sell.model.response.CartDetailResponse;
import com.fshoes.core.admin.sell.model.response.GetALlCustomerResponse;
import com.fshoes.core.admin.sell.model.response.GetAllProductResponse;
import com.fshoes.core.admin.sell.model.response.GetAmountProductResponse;
import com.fshoes.core.admin.sell.model.response.GetColorResponse;
import com.fshoes.core.admin.sell.model.response.GetProductDetailBillSellResponse;
import com.fshoes.core.admin.sell.model.response.GetSizeResponse;
import com.fshoes.core.admin.sell.repository.AdminBillDetailRepositoty;
import com.fshoes.core.admin.sell.repository.AdminBillRepository;
import com.fshoes.core.admin.sell.repository.AdminCreateCartRepository;
import com.fshoes.core.admin.sell.repository.AdminProductDetailRepository;
import com.fshoes.core.admin.sell.repository.AdminSellGetCustomerRepository;
import com.fshoes.core.admin.sell.repository.AdminSellGetProductRepository;
import com.fshoes.core.admin.sell.service.AdminSellService;
import com.fshoes.core.admin.voucher.repository.AdVoucherRepository;
import com.fshoes.core.common.PageReponse;
import com.fshoes.entity.Account;
import com.fshoes.entity.Bill;
import com.fshoes.entity.BillDetail;
import com.fshoes.entity.BillHistory;
import com.fshoes.entity.Cart;
import com.fshoes.entity.ProductDetail;
import com.fshoes.entity.Voucher;
import com.fshoes.repository.ProductDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class AdminSellServiceImpl implements AdminSellService {

    @Autowired
    private AdminSellGetProductRepository getProductRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private AdminSellGetCustomerRepository getCustomerRepository;
    @Autowired
    private AdminCreateCartRepository cartRepository;

    @Autowired
    private AdminBillDetailRepositoty billDetailRepositoty;

    @Autowired
    private AdminProductDetailRepository getProduct;

    @Autowired
    private AdminBillRepository billRepository;

    @Autowired
    private AdVoucherRepository voucherRepository;

    @Autowired
    private KhachHangRepository khachHangRepository;

    @Autowired
    private HDBillHistoryRepository billHistoryRepository;

    @Override
    public PageReponse<GetALlCustomerResponse> getAllCustomer(AdCustomerRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        return new PageReponse<>(getCustomerRepository.FindKhachHang(pageable, request));
    }

    @Override
    public List<GetProductDetailBillSellResponse> getProductDetailBillSell(String id) {
        return getProduct.getlistProductBilllSell(id);
    }


    @Override
    public Bill createBill() {
        Bill bill = new Bill();
        bill.setCode(generateUniqueBillCode());
        bill.setType(0);
        bill.setStatus(8);
        billRepository.save(bill);

        BillHistory billHistory = new BillHistory();
        billHistory.setBill(bill);
        billHistory.setStatusBill(8);
billHistoryRepository.save(billHistory);
        return bill;
    }


    @Override
    public Boolean deleteBill(String id) {
        try {
            Bill bill = billRepository.findById(id).get();
            List<String> listIdProductDetail = billDetailRepositoty.findByProductDetailBYBillId(id);
            for (String idPd : listIdProductDetail) {
                Optional<ProductDetail> optionalProductDetail = productDetailRepository.findById(idPd);
                if (optionalProductDetail.isPresent()) {
                    ProductDetail productDetail = optionalProductDetail.get();
                    BillDetail billDetail = billDetailRepositoty.findByProductIdAndBillId(productDetail.getId(), id);
                    productDetail.setAmount(productDetail.getAmount() + billDetail.getQuantity());
                } else {
                    continue;
                }
            }
            List<String> billDetail = billDetailRepositoty.findByBillId(id);
            for (String bd : billDetail) {
                billDetailRepositoty.deleteById(bd);
            }

            List<String> billHistory = billHistoryRepository.getIdHistoryByIdBill(id);
            for (String bh : billHistory){
                billHistoryRepository.deleteById(bh);
            }
            billRepository.delete(bill);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Bill addBill(AddBillRequest request, String id) {
        Bill bill = new Bill();
        if(request.getIdVourcher() == null){
            bill.setVoucher(null);
        }else {
            Voucher voucher = voucherRepository.findById(request.getIdVourcher()).orElse(null);
            assert voucher != null;
            voucher.setQuantity(voucher.getQuantity() - 1);
            voucherRepository.save(voucher);
            bill.setVoucher(voucher);
        }

        if(request.getIdCustomer() == null){
            bill.setCustomer(null);
        }else {
            Account account = khachHangRepository.findById(request.getIdCustomer()).orElse(null);
            assert account != null;
            bill.setCustomer(account);
        }


        Bill bill1 = billRepository.findById(id).orElse(null);

        bill.setId(id);
        bill.setCode(bill1.getCode());
        bill.setNote(request.getNote());
        bill.setAddress(request.getAddress());
        bill.setPhoneNumber(request.getPhoneNumber());
        bill.setFullName(request.getFullName());
        bill.setTotalMoney(request.getTotalMoney());
        bill.setMoneyShip(request.getMoneyShip());
        bill.setMoneyReduced(request.getMoneyReduce());
        bill.setMoneyAfter(request.getMoneyAfter());
        bill.setType(request.getType());
        bill.setStatus(2);
        billRepository.save(bill);
        BillHistory billHistory = new BillHistory();
        billHistory.setBill(bill);
        billHistory.setStatusBill(2);
        billHistoryRepository.save(billHistory);
        return bill;
    }


    @Override
    public BillDetail addBillDetail(CreateBillRequest request, String id) {
        BillDetail existingBillDetail = billDetailRepositoty.findByProductIdAndBillId(
                request.getProductDetailId(),
                request.getBillId()
        );

        if (existingBillDetail != null) {
            int newQuantity = existingBillDetail.getQuantity() + request.getQuantity();
            existingBillDetail.setQuantity(newQuantity);
            return billDetailRepositoty.save(existingBillDetail);
        } else {
            ProductDetail productDetail = productDetailRepository.findById(request.getProductDetailId()).orElse(null);
            Bill bill = billRepository.findById(request.getBillId()).orElse(null);

            BillDetail billDetail = new BillDetail();
            billDetail.setQuantity(request.getQuantity());
            billDetail.setProductDetail(productDetail);
            billDetail.setPrice(request.getPrice());
            billDetail.setBill(bill);
            billDetail.setStatus(0);


            return billDetailRepositoty.save(billDetail);
        }


    }

    @Override
    public List<Cart> getAllCart() {
        return cartRepository.getAllCarrt();
    }

    @Override
    public List<CartDetailResponse> getCartDetail() {
        return null;
    }

    @Override
    public List<GetSizeResponse> getListSize() {
        return getProduct.getlistSize();
    }

    @Override
    public List<GetColorResponse> getListColor() {
        return getProduct.getlistColor();
    }

    @Override
    public GetAmountProductResponse getAmount(String id) {
        return getProduct.getAmount(id);
    }

    @Override
    public Boolean updateQuantityProductDetail(String idPrDetail, Integer quantity) {
        Optional<ProductDetail> optionalProductDetail = productDetailRepository.findById(idPrDetail);
        if (optionalProductDetail.isPresent()) {
            ProductDetail productDetail = optionalProductDetail.get();
            productDetail.setAmount(productDetail.getAmount() - quantity);
            productDetailRepository.save(productDetail);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Boolean rollBackQuantityProductDetail(String idBill, String idPrDetail) {
        Optional<ProductDetail> optionalProductDetail = productDetailRepository.findById(idPrDetail);
        if (optionalProductDetail.isPresent()) {
            ProductDetail productDetail = optionalProductDetail.get();
            Integer quantity = billDetailRepositoty.quantityProductDetail(idBill, productDetail.getId());
            productDetail.setAmount(productDetail.getAmount() + quantity);
            productDetailRepository.save(productDetail);
            String idBillDetail = billDetailRepositoty.idBillDetailProductDetail(idBill, productDetail.getId());
            billDetailRepositoty.deleteById(idBillDetail);
            return true;
        } else {
            return false;
        }
    }


    @Override
    public Boolean increaseQuantityBillDetail(String idBillDetail, String idPrDetail) {
        Optional<BillDetail> optionalBillDetail = billDetailRepositoty.findById(idBillDetail);
        if(optionalBillDetail.isPresent()){
            BillDetail billDetail = optionalBillDetail.get();
            billDetail.setQuantity(billDetail.getQuantity()+1);
            billDetailRepositoty.save(billDetail);
            Optional<ProductDetail> optionalProductDetail = productDetailRepository.findById(idPrDetail);
            if(optionalProductDetail.isPresent()){
                ProductDetail productDetail = optionalProductDetail.get();
                productDetail.setAmount(productDetail.getAmount()-1);
                productDetailRepository.save(productDetail);
            }else {
                return false;
            }
            return true;
        }else {
            return false;
        }
    }

    @Override
    public Boolean decreaseQuantityBillDetail(String idBillDetail, String idPrDetail) {
        Optional<BillDetail> optionalBillDetail = billDetailRepositoty.findById(idBillDetail);
        if(optionalBillDetail.isPresent()){
            BillDetail billDetail = optionalBillDetail.get();
            billDetail.setQuantity(billDetail.getQuantity()-1);
            billDetailRepositoty.save(billDetail);
            Optional<ProductDetail> optionalProductDetail = productDetailRepository.findById(idPrDetail);
            if(optionalProductDetail.isPresent()){
                ProductDetail productDetail = optionalProductDetail.get();
                productDetail.setAmount(productDetail.getAmount()+1);
                productDetailRepository.save(productDetail);
            }else {
                return false;
            }
            return true;
        }else {
            return false;
        }
    }

    @Override
    public Boolean inputQuantityBillDetail(String idBillDetail, String idProDetail, Integer quantity) {
        Optional<BillDetail> optionalBillDetail = billDetailRepositoty.findById(idBillDetail);
        if(optionalBillDetail.isPresent()){
            BillDetail billDetail1 = optionalBillDetail.get();
            billDetail1.setQuantity(quantity);
            billDetailRepositoty.save(billDetail1);
            Optional<ProductDetail> optionalProductDetail = productDetailRepository.findById(idProDetail);
            if(optionalProductDetail.isPresent()){
                ProductDetail productDetail = optionalProductDetail.get();
                productDetail.setAmount(productDetail.getAmount() - quantity);
                productDetailRepository.save(productDetail);
            }else {
                return false;
            }
            return true;
        }else {
            return false;
        }
    }

    @Override
    public List<ProductMaxPriceResponse> getMaxPriceProductId() {
        return getProduct.getProductMaxPrice();
    }

    @Override
    public Boolean deleteProductsDetail(String idBill, List<String> idPrDetail) {
        try{
            List<String> listIdProductDetail = billDetailRepositoty.findByProductDetailBYBillId(idBill);
            for (String idPd : listIdProductDetail) {
                Optional<ProductDetail> optionalProductDetail = productDetailRepository.findById(idPd);
                if (optionalProductDetail.isPresent()) {
                    ProductDetail productDetail = optionalProductDetail.get();
                    Integer quantity = billDetailRepositoty.quantityProductDetail(idBill, productDetail.getId());
                    productDetail.setAmount(productDetail.getAmount() + quantity);
                    productDetailRepository.save(productDetail);
                    String idBillDetail = billDetailRepositoty.idBillDetailProductDetail(idBill, productDetail.getId());
                    billDetailRepositoty.deleteById(idBillDetail);
                } else {
                    return false;
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Bill> getAllBillTaoDonHang() {
        return billRepository.getAllBillTaoDonHang();
    }

    @Override
    public List<GetAllProductResponse> getAllProduct(FilterProductDetailRequest request) {
        return getProductRepository.getAllProduct(request);
    }

    @Override
    public List<GetAllProductResponse> getAllProductCart() {
        return getProductRepository.getAllProductCart();
    }

    private String generateUniqueBillCode() {
        String baseCode = "HD";
        int counter = 1;
        String uniqueCode = baseCode + counter;

        while (billRepository.existsByCode(uniqueCode)) {
            counter++;
            uniqueCode = baseCode + counter;
        }

        return uniqueCode;

    }
}
