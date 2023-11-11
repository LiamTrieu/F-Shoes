package com.fshoes.core.client.model.response;

import com.fshoes.entity.base.IsIdentified;


public interface CLientBillHistoryResponse extends IsIdentified {

    Long getCreatedAt();

    Integer getStatusBill();

    String getNote();

    String getCreatedBy();
}
