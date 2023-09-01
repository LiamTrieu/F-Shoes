package com.fshoes.core.admin.nhanvien.model.respone;

import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

public interface StaffRespone {
    @Value("#{target.id}")
    Integer getId();

    @Value("#{target.full_name}")
    String getfullName();

    @Value("#{target.date_birth}")
    Date getdateBirth();

    @Value("#{target.phone_number}")
    String getphoneNumber();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.gender}")
    String getGender();

    @Value("#{target.password}")
    String getPassword();

    @Value("#{target.avatar}")
    String getAvatar();

//    @Value("#{target.created_at}")
//    Long getCreateAt();

//    @Value("#{target.status}")
//    String getStatus();
}
