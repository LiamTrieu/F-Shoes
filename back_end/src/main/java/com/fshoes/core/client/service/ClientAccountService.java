package com.fshoes.core.client.service;

import com.fshoes.core.client.model.request.ClientAccountRequest;
import com.fshoes.core.client.model.request.ClientBillAccountRequest;
import com.fshoes.core.client.model.request.ClientBillDetailRequest;
import com.fshoes.core.client.model.request.ClientBillRequest;
import com.fshoes.core.client.model.request.ClientCancelBillRequest;
import com.fshoes.core.client.model.response.CLientBillHistoryResponse;
import com.fshoes.core.client.model.response.ClientBillAccountResponse;
import com.fshoes.core.client.model.response.ClientBillDetailResponse;
import com.fshoes.core.client.model.response.ClientBillResponse;
import com.fshoes.core.client.model.response.ClientCustomerResponse;
import com.fshoes.core.client.model.response.ClientGetAllBillTableResponse;
import com.fshoes.core.client.model.response.ClientProfileBillDetailResponse;
import com.fshoes.core.client.model.response.ClientTransactionResponse;
import com.fshoes.core.common.UserLogin;
import com.fshoes.entity.Account;
import com.fshoes.entity.Bill;
import com.fshoes.entity.BillDetail;

import java.text.ParseException;
import java.util.List;

public interface ClientAccountService {

    Account getOneCustomerClient(UserLogin userLogin);

    Boolean update(UserLogin userLogin, ClientAccountRequest request) throws ParseException;

    List<ClientCustomerResponse> getAll();

    List<ClientBillAccountResponse> getALlBill(ClientBillAccountRequest status);

    List<ClientGetAllBillTableResponse> getALlBillTable(ClientBillAccountRequest status);

    List<ClientBillDetailResponse> getBillDetailsByBillId(String idBill);

    List<CLientBillHistoryResponse> getListBillHistoryByIdBill(String idBill);

    List<ClientTransactionResponse> getListTransactionByIdBill(String idBill);

    List<ClientBillDetailResponse> getBillDetailsByCode(String code);

    List<CLientBillHistoryResponse> getListBillHistoryByCode(String code);

    ClientBillResponse getClientBillResponse(String id);

    Bill updateBill(String idBill, ClientBillRequest hdBillRequest);

    BillDetail saveBillDetail(ClientBillDetailRequest clientBillDetailRequest);

    Boolean delete(String id);

    Boolean cancelBill(String idBill, ClientCancelBillRequest clientCancelBillRequest);

    List<ClientProfileBillDetailResponse> getBillDetailsByBillIdAndStatus(String idBill, Integer status);


}
