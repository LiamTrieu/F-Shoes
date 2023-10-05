package com.fshoes.core.admin.voucher.service.impl;

import com.fshoes.core.admin.khachhang.repository.KhachHangRepository;
import com.fshoes.core.admin.voucher.model.request.AdCustomerVoucherRequest;
import com.fshoes.core.admin.voucher.model.request.AdVoucherRequest;
import com.fshoes.core.admin.voucher.model.request.AdVoucherSearch;
import com.fshoes.core.admin.voucher.model.respone.AdFindCustomerRespone;
import com.fshoes.core.admin.voucher.model.respone.AdVoucherRespone;
import com.fshoes.core.admin.voucher.repository.AdCustomerVoucherRepository;
import com.fshoes.core.admin.voucher.repository.AdVoucherRepository;
import com.fshoes.core.admin.voucher.service.AdVoucherService;
import com.fshoes.entity.Account;
import com.fshoes.entity.CustomerVoucher;
import com.fshoes.entity.Voucher;
import com.fshoes.infrastructure.constant.StatusVoucher;
import com.fshoes.infrastructure.email.Email;
import com.fshoes.infrastructure.email.EmailSender;
import com.fshoes.util.DateUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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

    @Autowired
    private EmailSender emailSender;

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
    public Page<AdFindCustomerRespone> getFindAllCustomer(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return adVoucherRepository.getFindAllCustomer(pageable);
    }

    @Override
    public Voucher addVoucher(AdVoucherRequest voucherRequest) {
        try {
            Voucher voucher = voucherRequest.newVoucher(new Voucher());
            adVoucherRepository.save(voucher);
//            List<Account> accountList = khachHangRepository.findAll();
            List<CustomerVoucher> customerVoucherList = new ArrayList<>();
            if (voucherRequest.getType() == 0) {
//                for (Account account : accountList) {
//                    AdCustomerVoucherRequest adCustomerVoucherRequest = new AdCustomerVoucherRequest();
//                    adCustomerVoucherRequest.setVoucher(voucher);
//                    adCustomerVoucherRequest.setAccount(account);
//                    CustomerVoucher customerVoucher = adCustomerVoucherRequest.newCustomerVoucher(new CustomerVoucher());
//                    customerVoucherList.add(customerVoucher);
//                }
                return voucher;
            } else {
                for (String idCustomer : voucherRequest.getListIdCustomer()) {
                    Account customer = khachHangRepository.findById(idCustomer).get();
                    AdCustomerVoucherRequest adCustomerVoucherRequest = new AdCustomerVoucherRequest();
                    adCustomerVoucherRequest.setVoucher(voucher);
                    adCustomerVoucherRequest.setAccount(customer);
                    CustomerVoucher customerVoucher = adCustomerVoucherRequest.newCustomerVoucher(new CustomerVoucher());
                    customerVoucherList.add(customerVoucher);

                    String[] toMail = {customer.getEmail()};
                    Email email = new Email();
                    email.setBody("<b style=\"text-align: center;\">Hạn sử dụng: </b>" + DateUtil.converDateTimeString(voucher.getStartDate()) + " ---> " + DateUtil.converDateTimeString(voucher.getEndDate()) + "<br/>");
                    email.setToEmail(toMail);
                    email.setSubject("FSHOES WEBSITE BÁN GIÀY THỂ THAO SNEAKER");
                    email.setTitleEmail("<b style=\"text-align: center;\">Bạn đã nhận được khuyễn mãi (voucher): </b><span>" + voucher.getName() + "</span>");
                    emailSender.sendEmail(email);
                }
            }
            adCustomerVoucherRepository.saveAll(customerVoucherList);
//            for (String idCustomer : voucherRequest.getListIdCustomer()) {
//                Account customer = khachHangRepository.findById(idCustomer).get();
//                String[] toMail = {customer.getEmail()};
//                Email email = new Email();
//                email.setBody("<b style=\"text-align: center;\">Bạn đã nhận được khuyễn mãi (voucher): </b><span>" + voucher.getName() + "</span><br/>" +
//                        "<b style=\"text-align: center;\">Hạn sử dụng: </b><span>" + DateUtil.converDateTimeString(voucher.getStartDate()) + " ---> " + DateUtil.converDateTimeString(voucher.getEndDate()) + "</span><br/>");
//                email.setToEmail(toMail);
//                email.setSubject("FSHOES WEBSITE BÁN GIÀY THỂ THAO SNEAKER");
//                email.setTitleEmail("");
//                emailSender.sendEmail(email);
//            }
            return voucher;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    @Transactional
    public Voucher updateVoucher(String id, AdVoucherRequest voucherRequest) throws ParseException {
        Optional<Voucher> optionalVoucher = adVoucherRepository.findById(id);
        List<Account> accountList = khachHangRepository.findAll();
        List<CustomerVoucher> customerVouchers = adCustomerVoucherRepository.getListCustomerVoucherByIdVoucher(id);
        for (CustomerVoucher customerVoucher : customerVouchers) {
            adCustomerVoucherRepository.deleteById(customerVoucher.getId());
        }
        if (optionalVoucher.isPresent()) {
            Voucher voucher = optionalVoucher.get();
            Voucher voucherUpdate = adVoucherRepository.save(voucherRequest.newVoucher(voucher));
            List<CustomerVoucher> customerVoucherList = new ArrayList<>();
            if (voucherRequest.getType() == 0) {
//                for (Account account : accountList) {
//                    AdCustomerVoucherRequest adCustomerVoucherRequest = new AdCustomerVoucherRequest();
//                    adCustomerVoucherRequest.setVoucher(voucherUpdate);
//                    adCustomerVoucherRequest.setAccount(account);
//                    CustomerVoucher customerVoucher = adCustomerVoucherRequest.newCustomerVoucher(new CustomerVoucher());
//                    customerVoucherList.add(customerVoucher);
//                }
                return voucherUpdate;
            } else {
                for (String idCustomer : voucherRequest.getListIdCustomer()) {
                    Account customer = khachHangRepository.findById(idCustomer).get();
                    AdCustomerVoucherRequest adCustomerVoucherRequest = new AdCustomerVoucherRequest();
                    adCustomerVoucherRequest.setVoucher(voucherUpdate);
                    adCustomerVoucherRequest.setAccount(customer);
                    CustomerVoucher customerVoucher = adCustomerVoucherRequest.newCustomerVoucher(new CustomerVoucher());
                    customerVoucherList.add(customerVoucher);

                    String[] toMail = {customer.getEmail()};
                    Email email = new Email();
                    email.setBody("<b style=\"text-align: center;\">Hạn sử dụng: </b>" + DateUtil.converDateTimeString(voucher.getStartDate()) + " ---> " + DateUtil.converDateTimeString(voucher.getEndDate()) + "<br/>");
                    email.setToEmail(toMail);
                    email.setSubject("FSHOES WEBSITE BÁN GIÀY THỂ THAO SNEAKER");
                    email.setTitleEmail("<b style=\"text-align: center;\">Bạn đã nhận được khuyễn mãi (voucher): </b><span>" + voucher.getName() + "</span>");
                    emailSender.sendEmail(email);
                }
            }
            adCustomerVoucherRepository.saveAll(customerVoucherList);
            List<Voucher> listVoucher = new ArrayList<>();
            listVoucher.add(voucherUpdate);
            messagingTemplate.convertAndSend("/topic/voucherUpdates", listVoucher);
            return voucherUpdate;
        } else {
            return null;
        }
    }

    @Override
    public Boolean deleteVoucher(String id) throws ParseException {
        Date currentDate = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        String formattedDate = dateFormat.format(currentDate);
        Long dateUpdate = DateUtil.parseDateTimeLong(formattedDate);
        Optional<Voucher> optionalVoucher = adVoucherRepository.findById(id);
        if (optionalVoucher.isPresent()) {
            Voucher voucher = optionalVoucher.get();
            voucher.setEndDate(dateUpdate);
            voucher.setStatus(2);
            adVoucherRepository.save(voucher);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<String> getAllCodeVoucher() {
        return adVoucherRepository.getAllCodeVoucher();
    }

    @Override
    public List<AdVoucherRespone> getAllVoucherByIdCustomer(String idCutsomer) {
        return adVoucherRepository.getAllVoucherByIdCustomer(idCutsomer);
    }

    @Override
    public List<AdVoucherRespone> getAllVoucherHoatDong() {
        return adVoucherRepository.getAllVoucherHoatDong();
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
