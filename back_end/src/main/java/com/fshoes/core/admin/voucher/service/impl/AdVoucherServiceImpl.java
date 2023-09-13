package com.fshoes.core.admin.voucher.service.impl;

import com.fshoes.core.admin.voucher.model.request.AdVoucherRequest;
import com.fshoes.core.admin.voucher.model.request.AdVoucherSearch;
import com.fshoes.core.admin.voucher.model.respone.AdVoucherRespone;
import com.fshoes.core.admin.voucher.repository.AdVoucherRepository;
import com.fshoes.core.admin.voucher.service.AdVoucherService;
import com.fshoes.entity.Voucher;
import com.fshoes.infrastructure.constant.StatusVoucher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

@Service
public class AdVoucherServiceImpl implements AdVoucherService {
    @Autowired
    private AdVoucherRepository adVoucherRepository;

    @Override
    public List<Voucher> getAllVoucher() {
        return adVoucherRepository.findAll();
    }

    @Override
    public AdVoucherRespone getVoucherById(String id) {
        return adVoucherRepository.getVoucherById(id).orElse(null);
    }

    @Override
    public Page<Voucher> getPageVoucher(Integer page) {
        Sort sort = Sort.by("id");
        Pageable pageable = PageRequest.of(page, 5, sort);
        return adVoucherRepository.findAll(pageable);
    }

    @Override
    public Voucher addVoucher(AdVoucherRequest voucherRequest) {
        try {
            Voucher voucher = voucherRequest.newVoucher(new Voucher());
            return adVoucherRepository.save(voucher);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean updateVoucher(String id, AdVoucherRequest voucherRequest) throws ParseException {
        Optional<Voucher> optionalVoucher = adVoucherRepository.findById(id);
        if (optionalVoucher.isPresent()) {
            Voucher voucher = optionalVoucher.get();
            adVoucherRepository.save(voucherRequest.newVoucher(voucher));
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Boolean deleteVoucher(String id) {
        Optional<Voucher> optionalVoucher = adVoucherRepository.findById(id);
        if (optionalVoucher.isPresent()) {
            Voucher voucher = optionalVoucher.get();
            voucher.setStatus(StatusVoucher.DA_KET_THUC);
            adVoucherRepository.save(voucher);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Page<AdVoucherRespone> getSearchVoucher(Integer page, AdVoucherSearch voucherSearch) {
        Sort sort = Sort.by("id");
        Pageable pageable = PageRequest.of(page, 5, sort);
        return adVoucherRepository.pageSearchVoucher(pageable, voucherSearch);
    }
}
