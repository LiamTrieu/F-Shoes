package com.fshoes.core.admin.voucher.service;

import com.fshoes.core.admin.voucher.model.request.VoucherRequest;
import com.fshoes.entity.Voucher;
import org.springframework.data.domain.Page;

import java.util.List;

public interface VoucherServiceAdmin {
    List<Voucher> getAllVoucher();

    Page<Voucher> getpageVoucher(Integer page);

    Voucher addVoucher(VoucherRequest voucherRequest);

    Boolean updateVoucher(Integer id,VoucherRequest voucherRequest);

    Boolean deleteVoucher(Integer id);
}
