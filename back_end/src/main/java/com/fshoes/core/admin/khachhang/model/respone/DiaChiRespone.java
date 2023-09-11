package com.fshoes.core.admin.khachhang.model.respone;

import com.fshoes.entity.Address;
import com.fshoes.entity.Customer;
import lombok.Getter;
import lombok.Setter;

public interface DiaChiRespone {
    Long getId();
    String getName();

    String getPhoneNumber();
    String getEmail();
    String getSpecificAddress();
    Boolean getType();

}
