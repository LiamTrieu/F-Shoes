package com.fshoes.core.admin.khachhang.model.respone;

import com.fshoes.entity.base.IsIdentified;


public interface KhachHangRespone extends IsIdentified {
    String getAvatar();
    String getEmail();
    String getFullName();
    Long getDateBirth();
    String getPhoneNumber();
    Long getCreatedAt();
    Integer getStatus();

}
