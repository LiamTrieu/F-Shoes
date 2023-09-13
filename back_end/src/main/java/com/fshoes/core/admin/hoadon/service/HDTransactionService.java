package com.fshoes.core.admin.hoadon.service;

import com.fshoes.entity.Transaction;

import java.util.List;

public interface HDTransactionService {

    List<Transaction> getTransactionByBillId(String idBill);

}
