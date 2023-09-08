package com.fshoes.core.admin.khachhang.model.request;

import com.fshoes.entity.Customer;
import com.fshoes.infrastructure.constant.EntityProperties;
import com.fshoes.util.DateUtil;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.text.ParseException;

@Getter
@Setter
public class KhachHangRequest {
    @Column(length = EntityProperties.LENGTH_NAME)
    private String fullName;

    private String dateBirth;

    private String phoneNumber;

    private String email;

    private Boolean gender;

    private String password;

    private String avatar;

    private Integer status = 1 ;

   public Customer newCustomer(Customer customer) throws ParseException {
        customer.setAvatar(this.getAvatar());
        customer.setEmail(this.getEmail());
        customer.setFullName(this.getFullName());
        customer.setDateBirth(DateUtil.parseDateLong(this.getDateBirth()));
        customer.setPhoneNumber(this.getPhoneNumber());
        customer.setGender(this.getGender());
        customer.setPassword(this.getPassword());
        customer.setStatus(this.getStatus());
        return customer;
   }
}
