package com.fshoes.core.admin.khachhang.model.respone;

import com.fshoes.entity.base.IsIdentified;

public interface DiaChiRespone extends IsIdentified {
    String getName();

    String getPhoneNumber();
    String getEmail();
    String getSpecificAddress();
    Boolean getType();

}
