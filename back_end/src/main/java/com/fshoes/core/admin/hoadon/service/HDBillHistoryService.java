package com.fshoes.core.admin.hoadon.service;

import com.fshoes.core.admin.hoadon.model.request.HDBillHistoryRequest;
import com.fshoes.entity.Bill_History;

import java.util.List;

public interface HDBillHistoryService {
    List<Bill_History> getBill_HistoriesByBill_Id(Integer idBill);

    Bill_History save(HDBillHistoryRequest hdBillHistoryRequest);

}
