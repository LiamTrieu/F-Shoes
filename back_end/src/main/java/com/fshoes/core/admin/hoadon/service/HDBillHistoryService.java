package com.fshoes.core.admin.hoadon.service;

import com.fshoes.core.admin.hoadon.model.request.HDBillHistoryRequest;
import com.fshoes.entity.BillHistory;

import java.util.List;

public interface HDBillHistoryService {
    List<BillHistory> getBillHistoriesByBillId(Integer idBill);

    BillHistory save(HDBillHistoryRequest hdBillHistoryRequest);

}
