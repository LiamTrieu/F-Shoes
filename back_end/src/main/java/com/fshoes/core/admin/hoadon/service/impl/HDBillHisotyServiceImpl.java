package com.fshoes.core.admin.hoadon.service.impl;

import com.fshoes.core.admin.hoadon.model.request.HDBillHistoryRequest;
import com.fshoes.core.admin.hoadon.repository.HDBillHistoryRepository;
import com.fshoes.core.admin.hoadon.service.HDBillHistoryService;
import com.fshoes.entity.Bill_History;
import com.fshoes.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HDBillHisotyServiceImpl implements HDBillHistoryService {

    @Autowired
    private HDBillHistoryRepository hdBillHistoryRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Override
    public List<Bill_History> getBill_HistoriesByBill_Id(Integer idBill) {
        return hdBillHistoryRepository.getBill_HistoriesByBill_Id(idBill);
    }

    @Override
    public Bill_History save(HDBillHistoryRequest hdBillHistoryRequest) {
        return hdBillHistoryRepository.save(Bill_History.builder()
                .bill(hdBillHistoryRequest.getBill())
                .note(hdBillHistoryRequest.getNote())
                .statusBill(hdBillHistoryRequest.getBill().getStatus())
                .staff(staffRepository.findById(hdBillHistoryRequest.getIdStaff()).get())
                .build());
    }


}
