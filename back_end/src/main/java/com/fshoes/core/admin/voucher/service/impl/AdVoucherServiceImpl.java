package com.fshoes.core.admin.voucher.service.impl;

import com.fshoes.core.admin.voucher.model.request.AdVoucherRequest;
import com.fshoes.core.admin.voucher.model.request.AdVoucherSearch;
import com.fshoes.core.admin.voucher.model.respone.AdVoucherRespone;
import com.fshoes.core.admin.voucher.repository.AdVoucherRepository;
import com.fshoes.core.admin.voucher.service.AdVoucherService;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Voucher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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
    public Voucher getVoucherById(Integer id) {
        return adVoucherRepository.findById(id).orElse(null);
    }

    @Override
    public Page<Voucher> getPageVoucher(Integer page) {
//        Sort sort = Sort.by("id");
//        Pageable pageable = PageRequest.of(page, 5, sort);
        Pageable pageable = PageRequest.of(page, 5);
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
    public Boolean updateVoucher(Integer id, AdVoucherRequest voucherRequest) {
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
    public Boolean deleteVoucher(Integer id) {
        Optional<Voucher> optionalVoucher = adVoucherRepository.findById(id);
        if (optionalVoucher.isPresent()) {
            Voucher voucher = optionalVoucher.get();
            voucher.setStatus(0);
            adVoucherRepository.save(voucher);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Page<AdVoucherRespone> getSearchVoucher(PageableRequest pageableRequest, AdVoucherSearch voucherSearch) {
        Sort sort = Sort.by("id");
        Pageable pageable = PageRequest.of(pageableRequest.getPage() - 1, pageableRequest.getSize(), sort);
        return adVoucherRepository.pageSearchVoucher(pageable, voucherSearch);
    }
}
