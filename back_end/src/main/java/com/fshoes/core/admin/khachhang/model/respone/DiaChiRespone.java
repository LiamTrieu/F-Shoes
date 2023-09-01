package com.fshoes.core.admin.khachhang.model.respone;

import com.fshoes.entity.Address;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiaChiRespone {
    Long id;
    String ten;
    String soDienThoai;
    String email;
    String diaChiCuthe;

    public DiaChiRespone(Address address) {
        this.id = address.getId();
        this.ten = address.getName();
        this.soDienThoai = address.getPhoneNumber();
        this.email = address.getEmail();
        this.diaChiCuthe = address.getSpecificAddress();
    }
}
