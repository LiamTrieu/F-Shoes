package com.fshoes.core.admin.hoadon.service.impl;

import com.fshoes.core.admin.hoadon.repository.HDTransactionRepository;
import com.fshoes.core.admin.hoadon.service.HDTransactionService;
import com.fshoes.entity.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HDTransactionServiceImpl implements HDTransactionService {

    @Autowired
    private HDTransactionRepository hdTransactionRepository;

    @Override
    public List<Transaction> getTransactionByBillId(Integer idBill) {
        return hdTransactionRepository.getTransactionByBillId(idBill);
    }

}
