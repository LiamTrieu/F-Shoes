package com.fshoes.core.admin.voucher.service.impl;

import com.fshoes.core.admin.khachhang.repository.KhachHangRepository;
import com.fshoes.core.admin.voucher.model.request.AdCustomerVoucherRequest;
import com.fshoes.core.admin.voucher.model.request.AdVoucherRequest;
import com.fshoes.core.admin.voucher.model.request.AdVoucherSearch;
import com.fshoes.core.admin.voucher.model.respone.AdVoucherRespone;
import com.fshoes.core.admin.voucher.repository.AdCustomerVoucherRepository;
import com.fshoes.core.admin.voucher.repository.AdVoucherRepository;
import com.fshoes.core.admin.voucher.service.AdVoucherService;
import com.fshoes.entity.Account;
import com.fshoes.entity.CustomerVoucher;
import com.fshoes.entity.Voucher;
import com.fshoes.infrastructure.constant.StatusVoucher;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@Service
public class AdVoucherServiceImpl implements AdVoucherService {
    @Autowired
    private AdVoucherRepository adVoucherRepository;

    @Autowired
    private KhachHangRepository khachHangRepository;

    @Autowired
    private AdCustomerVoucherRepository adCustomerVoucherRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Override
    public List<Voucher> getAllVoucher() {
        return adVoucherRepository.findAll();
    }

    @Override
    public AdVoucherRespone getVoucherById(String id) {
        return adVoucherRepository.getVoucherById(id).orElse(null);
    }

    @Override
    public Page<AdVoucherRespone> getPageVoucher(Integer page) {
        Sort sort = Sort.by("code");
        Pageable pageable = PageRequest.of(page - 1, 5, sort);
        return adVoucherRepository.getPageVoucher(pageable);
    }

    @Override
    public Voucher addVoucher(AdVoucherRequest voucherRequest) {
        try {
            Voucher voucher = voucherRequest.newVoucher(new Voucher());
            adVoucherRepository.save(voucher);
            List<Account> customerList = khachHangRepository.findAll();
            List<CustomerVoucher> customerVoucherList = new ArrayList<>();
            if (voucherRequest.getType() == 0) {
                for (Account customer : customerList) {
                    AdCustomerVoucherRequest adCustomerVoucherRequest = new AdCustomerVoucherRequest();
                    adCustomerVoucherRequest.setVoucher(voucher);
                    adCustomerVoucherRequest.setAccount(customer);
                    CustomerVoucher customerVoucher = adCustomerVoucherRequest.newCustomerVoucher(new CustomerVoucher());
                    customerVoucherList.add(customerVoucher);
                }
            } else {
                for (String idCustomer : voucherRequest.getListIdCustomer()) {
                    Account customer = khachHangRepository.findById(idCustomer).get();
                    AdCustomerVoucherRequest adCustomerVoucherRequest = new AdCustomerVoucherRequest();
                    adCustomerVoucherRequest.setVoucher(voucher);
                    adCustomerVoucherRequest.setAccount(customer);
                    CustomerVoucher customerVoucher = adCustomerVoucherRequest.newCustomerVoucher(new CustomerVoucher());
                    customerVoucherList.add(customerVoucher);
                }
            }
            adCustomerVoucherRepository.saveAll(customerVoucherList);
            return voucher;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    @Transactional
    public Boolean updateVoucher(String id, AdVoucherRequest voucherRequest) throws ParseException {
        Optional<Voucher> optionalVoucher = adVoucherRepository.findById(id);
        List<Account> customerList = khachHangRepository.findAll();
        List<CustomerVoucher> customerVouchers = adCustomerVoucherRepository.getListCustomerVoucherByIdVoucher(id);
        for (CustomerVoucher customerVoucher : customerVouchers) {
            adCustomerVoucherRepository.deleteById(customerVoucher.getId());
        }
        Voucher voucherUpdate = new Voucher();
        if (optionalVoucher.isPresent()) {
            Voucher voucher = optionalVoucher.get();
            voucherUpdate = adVoucherRepository.save(voucherRequest.newVoucher(voucher));
            List<CustomerVoucher> customerVoucherList = new ArrayList<>();
            if (voucherRequest.getType().equals(0)) {
                for (Account customer : customerList) {
                    AdCustomerVoucherRequest adCustomerVoucherRequest = new AdCustomerVoucherRequest();
                    adCustomerVoucherRequest.setVoucher(voucher);
                    adCustomerVoucherRequest.setAccount(customer);
                    CustomerVoucher customerVoucher = adCustomerVoucherRequest.newCustomerVoucher(new CustomerVoucher());
                    customerVoucherList.add(customerVoucher);
                }
            } else {
                for (String idCustomer : voucherRequest.getListIdCustomer()) {
                    Account customer = khachHangRepository.findById(idCustomer).get();
                    AdCustomerVoucherRequest adCustomerVoucherRequest = new AdCustomerVoucherRequest();
                    adCustomerVoucherRequest.setVoucher(voucher);
                    adCustomerVoucherRequest.setAccount(customer);
                    CustomerVoucher customerVoucher = adCustomerVoucherRequest.newCustomerVoucher(new CustomerVoucher());
                    customerVoucherList.add(customerVoucher);
                }
            }
            List<Voucher> listVoucher = new ArrayList<>();
            listVoucher.add(voucherUpdate);
            messagingTemplate.convertAndSend("/topic/voucherUpdates",listVoucher);
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
            voucher.setStatus(2);
            adVoucherRepository.save(voucher);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Page<AdVoucherRespone> getSearchVoucher(AdVoucherSearch voucherSearch) {
        Sort sort = Sort.by("code");
        Pageable pageable = PageRequest.of(voucherSearch.getPage() - 1, voucherSearch.getSize(), sort);
        return adVoucherRepository.pageSearchVoucher(pageable, voucherSearch);
    }

//    @Scheduled(cron = "0 * * * * ?")
    @Transactional
    public void cornJobCheckVoucher() {
        boolean flag = true;
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        List<Voucher> voucherList = adVoucherRepository.getAllVoucherWrong(dateNow);

        for (Voucher voucher : voucherList) {
            if (voucher.getStartDate() > dateNow
                    && voucher.getStatus() != StatusVoucher.SAP_DIEN_RA.ordinal()) {
                voucher.setStatus(StatusVoucher.SAP_DIEN_RA.ordinal());
                flag = true;
            } else if (voucher.getEndDate() <= dateNow
                    && voucher.getStatus() != StatusVoucher.DA_KET_THUC.ordinal()) {
                voucher.setStatus(StatusVoucher.DA_KET_THUC.ordinal());
                flag = true;
            } else if (voucher.getStartDate() <= dateNow
                    && voucher.getEndDate() > dateNow
                    && voucher.getStatus() != StatusVoucher.DANG_DIEN_RA.ordinal()) {
                voucher.setStatus(StatusVoucher.DANG_DIEN_RA.ordinal());
                flag = true;
            }
        }
        if (flag) {
            messagingTemplate.convertAndSend("/topic/voucherUpdates",
                    adVoucherRepository.saveAll(voucherList));
        }
    }
}
