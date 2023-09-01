package com.fshoes.core.admin.voucher.service.impl;

import com.fshoes.core.admin.voucher.model.request.VoucherRequest;
import com.fshoes.core.admin.voucher.repository.VoucherRepositoryAdmin;
import com.fshoes.core.admin.voucher.service.VoucherServiceAdmin;
import com.fshoes.entity.Voucher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoucherServiceAdminImpl implements VoucherServiceAdmin {
    @Autowired
    VoucherRepositoryAdmin voucherRepositoryAdmin;

    @Override
    public List<Voucher> getAllVoucher() {
        return voucherRepositoryAdmin.findAll();
    }

    @Override
    public Page<Voucher> getpageVoucher(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return voucherRepositoryAdmin.findAll(pageable);
    }

    @Override
    public Voucher addVoucher(VoucherRequest voucherRequest) {
        Voucher voucher = voucherRequest.newVoucher(new Voucher());
        return voucherRepositoryAdmin.save(voucher);
    }

    @Override
    public Boolean updateVoucher(Integer id, VoucherRequest voucherRequest) {
        Optional<Voucher> optionalVoucher = voucherRepositoryAdmin.findById(id);
        if (optionalVoucher.isPresent()) {
            Voucher voucher = optionalVoucher.get();
            voucher.setCode(voucherRequest.getCode());
            voucher.setValue(voucherRequest.getValue());
            voucher.setName(voucherRequest.getName());
            voucher.setMaximumValue(voucherRequest.getMaximumValue());
            voucher.setType(voucherRequest.getType());
            voucher.setMinimumAmount(voucherRequest.getMinimumAmount());
            voucher.setQuantity(voucherRequest.getQuantity());
            voucher.setStartDate(voucherRequest.getStartDate());
            voucher.setEndDate(voucherRequest.getEndDate());
            voucher.setStatus(voucherRequest.getStatus());
            voucherRepositoryAdmin.save(voucher);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Boolean deleteVoucher(Integer id) {
        Optional<Voucher> optionalVoucher = voucherRepositoryAdmin.findById(id);
        if (optionalVoucher.isPresent()) {
            Voucher voucher = optionalVoucher.get();
            voucher.setStatus(0);
            voucherRepositoryAdmin.save(voucher);
            return true;
        } else {
            return false;
        }
    }
}
