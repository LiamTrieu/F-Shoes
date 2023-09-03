package com.fshoes.core.admin.voucher.service;

import com.fshoes.core.admin.voucher.model.request.AdCustomerVoucherRequest;
import com.fshoes.core.admin.voucher.model.respone.AdCustomerVoucherRespone;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.CustomerVoucher;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AdCustomerVoucherService {
    List<AdCustomerVoucherRespone> getAllCustomerVoucher();

    AdCustomerVoucherRespone getCustomerVoucherById(Integer id);

    Page<AdCustomerVoucherRespone> getPageCustomerVoucher(PageableRequest pageableRequest);

    CustomerVoucher addCustomerVoucher(AdCustomerVoucherRequest adCustomerVoucherRequest);

    Boolean deleteCustomerVoucher(Integer id);
}
