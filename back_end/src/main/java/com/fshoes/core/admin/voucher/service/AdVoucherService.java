package com.fshoes.core.admin.voucher.service;

import com.fshoes.core.admin.voucher.model.request.AdVoucherRequest;
import com.fshoes.core.admin.voucher.model.request.AdVoucherSearch;
import com.fshoes.core.admin.voucher.model.respone.AdVoucherRespone;
import com.fshoes.entity.Voucher;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AdVoucherService {
    List<Voucher> getAllVoucher();

    Voucher getVoucherById(Integer id);

    Page<Voucher> getPageVoucher(Integer page);

    Voucher addVoucher(AdVoucherRequest voucherRequest);

    Boolean updateVoucher(Integer id, AdVoucherRequest voucherRequest);

    Boolean deleteVoucher(Integer id);

    Page<AdVoucherRespone> getSearchVoucher(Integer page, AdVoucherSearch adVoucherSearch);
}
