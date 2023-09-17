package com.fshoes.core.admin.voucher.service;

import com.fshoes.core.admin.voucher.model.request.AdVoucherRequest;
import com.fshoes.core.admin.voucher.model.request.AdVoucherSearch;
import com.fshoes.core.admin.voucher.model.respone.AdVoucherRespone;
import com.fshoes.entity.Voucher;
import org.springframework.data.domain.Page;

import java.text.ParseException;
import java.util.List;

public interface AdVoucherService {
    List<Voucher> getAllVoucher();

    AdVoucherRespone getVoucherById(String id);

    Page<AdVoucherRespone> getPageVoucher(Integer page);

    Voucher addVoucher(AdVoucherRequest voucherRequest);

    Boolean updateVoucher(String id, AdVoucherRequest voucherRequest) throws ParseException;

    Boolean deleteVoucher(String id);

    Page<AdVoucherRespone> getSearchVoucher(AdVoucherSearch adVoucherSearch);
}
