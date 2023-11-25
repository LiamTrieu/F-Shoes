package com.fshoes.core.client.service.impl;

import com.fshoes.core.admin.returns.model.request.GetReturnRequest;
import com.fshoes.core.admin.returns.model.request.ReturnDetailRequest;
import com.fshoes.core.admin.returns.model.request.ReturnRequest;
import com.fshoes.core.admin.returns.model.response.GetReturnResponse;
import com.fshoes.core.client.repository.*;
import com.fshoes.core.client.service.ClientReturnService;
import com.fshoes.core.common.PageReponse;
import com.fshoes.core.common.UserLogin;
import com.fshoes.entity.*;
import com.fshoes.infrastructure.constant.Message;
import com.fshoes.infrastructure.exception.RestApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientReturnServiceImpl implements ClientReturnService {

    @Autowired
    private ClientBillRepository billRepository;
    @Autowired
    private ClientBillHistoryRepository billHistoryRepository;
    @Autowired
    private ClientReturnsRepository returnsRepository;
    @Autowired
    private ClientBillDetailRepository billDetailRepository;
    @Autowired
    private ClientReturnDetailRepository returnDetailRepository;
    @Autowired
    private UserLogin userLogin;
    @Override
    public Boolean requestReturn(ReturnRequest request) {
        try {
            Bill bill = billRepository.findById(request.getIdBill()).orElseThrow(() -> new RestApiException("Hóa đơn không tồn tại"));

            BillHistory billHistory = new BillHistory();
            billHistory.setBill(bill);
            billHistory.setAccount(userLogin.getUserLogin());
            billHistory.setNote("Gửi yêu cầu trả hàng: " +
                                request.getListDetail().stream()
                                        .map(e -> "x" + e.getQuantity() + " " + e.getName())
                                        .collect(Collectors.joining(", ")));
            billHistoryRepository.save(billHistory);

            Returns returns = new Returns();
            returns.setBill(bill);
            long dateNow = Calendar.getInstance().getTimeInMillis();
            returns.setCode("HT" + dateNow);
            returns.setStatus(0);
            returns.setReturnAt(dateNow);
            returns.setReturnMoney(BigDecimal.valueOf(Long.parseLong(request.getReturnMoney())));
            returns.setFee(0);
            returnsRepository.save(returns);
            List<BillDetail> billDetails = new ArrayList<>();
            List<ReturnDetail> returnDetails = new ArrayList<>();
            for (ReturnDetailRequest req : request.getListDetail()) {
                BillDetail billDetail = billDetailRepository.findById(req.getIdBillDetail()).get();
                billDetail.setQuantity(billDetail.getQuantity() - req.getQuantity());

                ProductDetail productDetail = billDetail.getProductDetail();

                BillDetail newBillDetail = new BillDetail();
                newBillDetail.setQuantity(req.getQuantity());
                newBillDetail.setStatus(2);
                newBillDetail.setBill(billDetail.getBill());
                newBillDetail.setProductDetail(productDetail);
                newBillDetail.setPrice(billDetail.getPrice());
                newBillDetail.setNote(req.getNote());
                billDetailRepository.save(newBillDetail);

                if (billDetail.getQuantity() <= 0) {
                    billDetailRepository.delete(billDetail);
                }else {
                    billDetails.add(billDetail);
                }

                ReturnDetail returnDetail = new ReturnDetail();
                returnDetail.setReturns(returns);
                returnDetail.setNote(req.getNote());
                returnDetail.setBillDetail(newBillDetail);
                returnDetail.setProductDetail(productDetail);
                returnDetail.setPrice(new BigDecimal(req.getPrice()));
                returnDetail.setQuantity(req.getQuantity());
                returnDetails.add(returnDetail);
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
        return new PageReponse<>(returnsRepository.getAllReturn(pageable, userLogin.getUserLogin().getId(), request));
    }
}
