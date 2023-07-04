package com.fshoes.core.admin.khachhang.model.respone;

import com.fshoes.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public interface KhachHangRespone {
    Integer getId();
    String getAvatar();
    String getEmail();
    String getFullName();
    Long getDateBirth();
    String getPhoneNumber();
    Long getCreatedAt();
    Integer getStatus();

}
