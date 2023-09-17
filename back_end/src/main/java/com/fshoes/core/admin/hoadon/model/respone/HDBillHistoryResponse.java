package com.fshoes.core.admin.hoadon.model.respone;

import com.fshoes.entity.base.IsIdentified;

public interface HDBillHistoryResponse extends IsIdentified {
    Long getCreatedAt();

    Integer getStatusBill();

    String getNote();

    String getCreatedBy();


}
