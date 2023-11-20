package com.fshoes.core.admin.returns.service.impl;

import com.fshoes.core.admin.returns.model.request.GetBillRequest;
import com.fshoes.core.admin.returns.model.request.GetReturnRequest;
import com.fshoes.core.admin.returns.model.request.ReturnDetailRequest;
import com.fshoes.core.admin.returns.model.request.ReturnRequest;
import com.fshoes.core.admin.returns.model.response.BillDetailReturnResponse;
import com.fshoes.core.admin.returns.model.response.GetBillResponse;
import com.fshoes.core.admin.returns.model.response.GetReturnDetailResponse;
import com.fshoes.core.admin.returns.model.response.GetReturnResponse;
import com.fshoes.core.admin.returns.repository.AdminReturnDetailRepository;
import com.fshoes.core.admin.returns.repository.AdminReturnsRepository;
import com.fshoes.core.admin.returns.repository.BillDetailReturnRepository;
import com.fshoes.core.admin.returns.repository.BillReturnRepository;
import com.fshoes.core.admin.returns.service.ReturnService;
import com.fshoes.core.common.PageReponse;
import com.fshoes.core.common.UserLogin;
import com.fshoes.entity.*;
import com.fshoes.infrastructure.exception.RestApiException;
import com.fshoes.repository.BillHistoryRepository;
import com.fshoes.repository.ProductDetailRepository;
import com.fshoes.repository.TransactionRepository;
import com.fshoes.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReturnServiceImpl implements ReturnService {
    @Autowired
    private BillReturnRepository billRepository;
    @Autowired
    private BillDetailReturnRepository billDetailRepository;
    @Autowired
    private AdminReturnsRepository returnsRepository;
    @Autowired
    private AdminReturnDetailRepository returnDetailRepository;
    @Autowired
    private BillHistoryRepository billHistoryRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private UserLogin userLogin;
    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Override
    public PageReponse<GetBillResponse> getBill(GetBillRequest request) {
        Long currentDate = Calendar.getInstance().getTimeInMillis();
        Calendar sevenDaysAgo = Calendar.getInstance();
        sevenDaysAgo.setTimeInMillis(currentDate);
        sevenDaysAgo.add(Calendar.DAY_OF_YEAR, -7);
        Long sevenDaysAgoTimestamp = sevenDaysAgo.getTimeInMillis();

        Pageable pageable = PageRequest.of(request.getPage(), 5);
        return new PageReponse<>(billRepository.getBillReturn(request.getCodeBill(), sevenDaysAgoTimestamp, pageable));
    }

    @Override
    public Bill getBillId(String id) {
        return billRepository.findById(id).orElse(null);
    }

    @Override
    public List<BillDetailReturnResponse> getBillDetail(String id) {
        return billDetailRepository.getBillDetailReturn(id);
    }

    @Override
    public Boolean acceptReturn(ReturnRequest request) {
        try {
            Bill bill = billRepository.findById(request.getIdBill()).orElseThrow(() -> new RestApiException("Hóa đơn không tồn tại"));
            BigDecimal returnMoney = new BigDecimal(request.getReturnMoney());

            int percent = Integer.parseInt(request.getFee());
            BigDecimal increasedReturnMoney = returnMoney.multiply(BigDecimal.valueOf(1 + percent / 100.0));
            bill.setTotalMoney(bill.getTotalMoney().subtract(increasedReturnMoney));
            bill.setMoneyAfter(bill.getMoneyAfter().subtract(increasedReturnMoney));
            billRepository.save(bill);

            BillHistory billHistory = new BillHistory();
            billHistory.setBill(bill);
            billHistory.setAccount(userLogin.getUserLogin());
            billHistory.setNote("Hoàn sản phẩm: " +
                                request.getListDetail().stream()
                                        .map(e -> "x" + e.getQuantity() + " " + e.getName())
                                        .collect(Collectors.joining(", ")));
            billHistoryRepository.save(billHistory);

            Transaction transaction = new Transaction();
            transaction.setType(1);
            transaction.setStatus(0);
            transaction.setPaymentMethod(request.getType());
            if (request.getType() == 1) {
                transaction.setTransactionCode(request.getCodePayment());
            }
            transaction.setAccount(userLogin.getUserLogin());
            transaction.setBill(bill);
            transaction.setNote("Hoàn trả tiền khách trả hàng");
            transaction.setTotalMoney(BigDecimal.valueOf(Long.parseLong(request.getReturnMoney())));
            transactionRepository.save(transaction);

            Returns returns = new Returns();
            returns.setBill(bill);
            Long dateNow = Calendar.getInstance().getTimeInMillis();
            returns.setCode("HT" + dateNow);
            returns.setReturnAt(dateNow);
            returns.setReturnMoney(BigDecimal.valueOf(Long.parseLong(request.getReturnMoney())));
            returns.setStatus(1);
            returns.setFee(Integer.valueOf(request.getFee()));
            returnsRepository.save(returns);
            List<BillDetail> billDetails = new ArrayList<>();
            List<ReturnDetail> returnDetails = new ArrayList<>();
            for (ReturnDetailRequest req : request.getListDetail()) {
                BillDetail billDetail = billDetailRepository.findById(req.getIdBillDetail()).get();
                billDetail.setQuantity(billDetail.getQuantity() - req.getQuantity());

                ProductDetail productDetail = billDetail.getProductDetail();

                BillDetail newBillDetail = new BillDetail();
                newBillDetail.setQuantity(req.getQuantity());
                newBillDetail.setStatus(1);
                newBillDetail.setBill(billDetail.getBill());
                newBillDetail.setProductDetail(productDetail);
                newBillDetail.setPrice(billDetail.getPrice());
                newBillDetail.setNote(req.getNote());
                billDetails.add(newBillDetail);

                if (billDetail.getQuantity() <= 0) {
                    billDetailRepository.delete(billDetail);
                }else {
                    billDetails.add(billDetail);
                }

                ReturnDetail returnDetail = new ReturnDetail();
                returnDetail.setReturns(returns);
                returnDetail.setNote(req.getNote());
                returnDetail.setProductDetail(productDetail);
                returnDetail.setPrice(new BigDecimal(req.getPrice()));
                returnDetail.setQuantity(req.getQuantity());
                returnDetails.add(returnDetail);

                productDetail.setAmount(productDetail.getAmount() + req.getQuantity());
                productDetailRepository.save(productDetail);
            }
            billDetailRepository.saveAll(billDetails);
            returnDetailRepository.saveAll(returnDetails);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public PageReponse<GetReturnResponse> getReturn(GetReturnRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), 5);
        return new PageReponse<>(returnsRepository.getAllReturn(pageable, request));
    }

    @Override
    public GetReturnDetailResponse getReturnDetail(String id) {
        return returnsRepository.getReturnDetail(id);
    }

    @Override
    public List<BillDetailReturnResponse> getReturnDetail2(String id) {
        return returnDetailRepository.getBillDetailReturn(id);
    }
}
