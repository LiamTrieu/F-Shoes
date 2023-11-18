package com.fshoes.core.admin.returns.model.response;

import com.fshoes.entity.base.IsIdentified;

public interface GetBillResponse extends IsIdentified {
    Integer getStt();
    String getCode();
    String getName();
    String getPhone();
    String getTotal();
}
