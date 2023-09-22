package com.fshoes.core.admin.voucher.service.impl;

import com.fshoes.core.admin.khachhang.repository.KhachHangRepository;
import com.fshoes.core.admin.voucher.model.request.AdCustomerVoucherRequest;
import com.fshoes.core.admin.voucher.model.request.AdVoucherRequest;
import com.fshoes.core.admin.voucher.model.request.AdVoucherSearch;
import com.fshoes.core.admin.voucher.model.respone.AdVoucherRespone;
import com.fshoes.core.admin.voucher.repository.AdCustomerVoucherRepository;
import com.fshoes.core.admin.voucher.repository.AdVoucherRepository;
import com.fshoes.core.admin.voucher.service.AdVoucherService;
import com.fshoes.entity.Customer;
import com.fshoes.entity.CustomerVoucher;
import com.fshoes.entity.Voucher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
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
            List<Customer> customerList = khachHangRepository.findAll();
            List<CustomerVoucher> customerVoucherList = new ArrayList<>();
            if (voucherRequest.getType() == 0) {
                for (Customer customer : customerList) {
                    AdCustomerVoucherRequest adCustomerVoucherRequest = new AdCustomerVoucherRequest();
                    adCustomerVoucherRequest.setVoucher(voucher);
                    adCustomerVoucherRequest.setCustomer(customer);
                    CustomerVoucher customerVoucher = adCustomerVoucherRequest.newCustomerVoucher(new CustomerVoucher());
                    customerVoucherList.add(customerVoucher);
                }
            } else {
                for (String idCustomer : voucherRequest.getListIdCustomer()) {
                    Customer customer = khachHangRepository.findById(idCustomer).get();
                    AdCustomerVoucherRequest adCustomerVoucherRequest = new AdCustomerVoucherRequest();
                    adCustomerVoucherRequest.setVoucher(voucher);
                    adCustomerVoucherRequest.setCustomer(customer);
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
    public Boolean updateVoucher(String id, AdVoucherRequest voucherRequest) throws ParseException {
        Optional<Voucher> optionalVoucher = adVoucherRepository.findById(id);
        List<Customer> customerList = khachHangRepository.findAll();
        List<CustomerVoucher> customerVouchers = adCustomerVoucherRepository.getListCustomerVoucherByIdVoucher(id);
        for (CustomerVoucher customerVoucher : customerVouchers) {
            adCustomerVoucherRepository.deleteById(customerVoucher.getId());
        }
        if (optionalVoucher.isPresent()) {
            Voucher voucher = optionalVoucher.get();
            adVoucherRepository.save(voucherRequest.newVoucher(voucher));
            List<CustomerVoucher> customerVoucherList = new ArrayList<>();
            if (voucherRequest.getType().equals(0)) {
                for (Customer customer : customerList) {
                    AdCustomerVoucherRequest adCustomerVoucherRequest = new AdCustomerVoucherRequest();
                    adCustomerVoucherRequest.setVoucher(voucher);
                    adCustomerVoucherRequest.setCustomer(customer);
                    CustomerVoucher customerVoucher = adCustomerVoucherRequest.newCustomerVoucher(new CustomerVoucher());
                    customerVoucherList.add(customerVoucher);
                }
            } else {
                for (String idCustomer : voucherRequest.getListIdCustomer()) {
                    Customer customer = khachHangRepository.findById(idCustomer).get();
                    AdCustomerVoucherRequest adCustomerVoucherRequest = new AdCustomerVoucherRequest();
                    adCustomerVoucherRequest.setVoucher(voucher);
                    adCustomerVoucherRequest.setCustomer(customer);
                    CustomerVoucher customerVoucher = adCustomerVoucherRequest.newCustomerVoucher(new CustomerVoucher());
                    customerVoucherList.add(customerVoucher);
                }
            }
            adCustomerVoucherRepository.saveAll(customerVoucherList);
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
}
