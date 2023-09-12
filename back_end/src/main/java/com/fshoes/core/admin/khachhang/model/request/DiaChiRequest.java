package com.fshoes.core.admin.khachhang.model.request;

import com.fshoes.entity.Address;
import com.fshoes.entity.Customer;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiaChiRequest {
   private String name;

    private String phoneNumber;

    private String email;

    private String specificAddress;

    private Boolean type = false;

    private String idCustomer;


    public Address newAddress (Address address) {
        address.setName(this.name);
        address.setPhoneNumber(this.phoneNumber);
        address.setEmail(this.email);
        address.setSpecificAddress(this.specificAddress);
        address.setType(this.getType());
        return address;
    }
}
