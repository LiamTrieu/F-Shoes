package com.fshoes.core.admin.hoadon.service;

import com.fshoes.core.admin.hoadon.model.request.BillConfirmRequest;
import com.fshoes.core.admin.hoadon.model.request.BillFilterRequest;
import com.fshoes.core.admin.hoadon.model.request.HDBillRequest;
import com.fshoes.core.admin.hoadon.model.respone.HDBillResponse;
import com.fshoes.entity.Bill;
import org.springframework.data.domain.Page;

public interface HDBillService {
    Page<HDBillResponse> filterBill(BillFilterRequest billFilterRequest);

    Bill createBill();

    Bill updateBill(String idBill, HDBillRequest hdBillRequest);

    Bill cancelOrder(String idBill, HDBillRequest hdBillRequest);

    Bill confirmOrder(String idBill, BillConfirmRequest billConfirmRequest);

    HDBillResponse getOne(String id);

}
