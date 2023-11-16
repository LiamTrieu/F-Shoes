package com.fshoes.core.client.service;

import com.fshoes.core.admin.khachhang.model.request.KhachHangRequest;
import com.fshoes.core.client.model.request.ClientAccountRequest;
import com.fshoes.core.client.model.request.ClientBillAccountRequest;
import com.fshoes.core.client.model.response.*;
import com.fshoes.core.common.UserLogin;
import com.fshoes.entity.Account;

import java.text.ParseException;
import java.util.List;

public interface ClientAccountService {

    Account getOneCustomerClient(UserLogin userLogin);

    Boolean update(UserLogin userLogin, ClientAccountRequest request) throws ParseException;

    List<ClientCustomerResponse> getAll();

    List<ClientBillAccountResponse> getALlBill(ClientBillAccountRequest status);

    List<ClientBillDetailResponse> getBillDetailsByBillId(String idBill);

    List<CLientBillHistoryResponse> getListBillHistoryByIdBill(String idBill);

    List<ClientTransactionResponse> getListTransactionByIdBill(String idBill);

    List<ClientBillDetailResponse> getBillDetailsByCode(String code);

    List<CLientBillHistoryResponse> getListBillHistoryByCode(String code);

    ClientBillResponse getClientBillResponse(String id);
    
}
