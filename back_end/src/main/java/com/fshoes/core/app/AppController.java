package com.fshoes.core.app;

import com.fshoes.core.admin.sell.service.AdminSellService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.entity.Account;
import com.fshoes.entity.Bill;
import com.fshoes.infrastructure.constant.StatusBill;
import com.fshoes.infrastructure.exception.RestApiException;
import com.fshoes.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/app")
public class AppController {

    @Autowired
    private AppBillOrderRepository billOrderRepository;
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AdminSellService getSell;
    
    @GetMapping("/get-order/{text}")
    public String getBillOrder(@PathVariable("text") String text) {

        Account account = accountRepository.findByPhoneNumber(text).orElse(null);
        if (account == null) {
            Bill bill = billOrderRepository.findBillByStatusAndCode(StatusBill.TAO_DON_HANG, text)
                    .orElseThrow(() -> new RestApiException("Hóa đơn không tồn tại!"));
            return bill.getId();
        } else {
            Bill bill = billOrderRepository
                    .findBillByStatusAndCustomerId(StatusBill.TAO_DON_HANG, account.getId())
                    .orElseThrow(() -> new RestApiException("Hóa đơn không tồn tại!"));
            return bill.getId();
        }
    }

    @GetMapping("/get-product-detail-bill/{id}")
    public ObjectRespone getAllProductDetailBill(@PathVariable String id) {
        return new ObjectRespone(getSell.getProductDetailBillSell(id));
    }
}
