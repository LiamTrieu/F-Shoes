package com.fshoes.core.admin.voucher.service.impl;

import com.fshoes.core.admin.voucher.model.request.AdCustomerVoucherRequest;
import com.fshoes.core.admin.voucher.repository.AdCustomerVoucherRepository;
import com.fshoes.core.admin.voucher.service.AdCustomerVoucherService;
import com.fshoes.entity.CustomerVoucher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdCustomerVoucherServiceImpl implements AdCustomerVoucherService {
    @Autowired
    private AdCustomerVoucherRepository adCustomerVoucherRepository;

    @Override
    public List<CustomerVoucher> getAllCustomerVoucher() {
        return adCustomerVoucherRepository.findAll();
    }

    @Override
    public CustomerVoucher getCustomerVoucherById(Integer id) {
        return adCustomerVoucherRepository.findById(id).orElse(null);
    }

    @Override
    public Page<CustomerVoucher> getPageCustomerVoucher(Integer page) {
        //        Sort sort = Sort.by("id");
//        Pageable pageable = PageRequest.of(page, 5, sort);
        Pageable pageable = PageRequest.of(page, 5);
        return adCustomerVoucherRepository.findAll(pageable);
    }

    @Override
    public CustomerVoucher addCustomerVoucher(AdCustomerVoucherRequest adCustomerVoucherRequest) {
        try {
//            Customer customer = new Customer();
//            Voucher voucher = new Voucher();
//            CustomerVoucher customerVoucher = new CustomerVoucher();
//
//            customer.setId(Integer.valueOf(adCustomerVoucherRequest.getIdCustomer()));
//            voucher.setId(Integer.valueOf(adCustomerVoucherRequest.getIdVoucher()));
//
//            customerVoucher.setCustomer(customer);
//            customerVoucher.setVoucher(voucher);
//            customerVoucher.setStatus(1);

            CustomerVoucher customerVoucher = adCustomerVoucherRequest.newCustomerVoucher(new CustomerVoucher());
            return adCustomerVoucherRepository.save(customerVoucher);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean updateCustomerVoucher(Integer id, AdCustomerVoucherRequest adCustomerVoucherRequest) {
        Optional<CustomerVoucher> optionalCustomerVoucher = adCustomerVoucherRepository.findById(id);
        if (optionalCustomerVoucher.isPresent()) {
            CustomerVoucher customerVoucher = optionalCustomerVoucher.get();
            adCustomerVoucherRepository.save(adCustomerVoucherRequest.newCustomerVoucher(customerVoucher));
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Boolean deleteCustomerVoucher(Integer id) {
        Optional<CustomerVoucher> optionalCustomerVoucher = adCustomerVoucherRepository.findById(id);
        if (optionalCustomerVoucher.isPresent()) {
            CustomerVoucher customerVoucher = optionalCustomerVoucher.get();
            customerVoucher.setStatus(0);
            adCustomerVoucherRepository.save(customerVoucher);
            return true;
        } else {
            return false;
        }
    }
}
