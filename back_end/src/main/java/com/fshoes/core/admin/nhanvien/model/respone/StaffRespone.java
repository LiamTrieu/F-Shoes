package com.fshoes.core.admin.nhanvien.model.respone;

import org.springframework.beans.factory.annotation.Value;

public interface StaffRespone {
    @Value("#{target.id}")
    Integer getId();

    @Value("#{target.full_name}")
    String getfullName();

    @Value("#{target.date_birth}")
    Long getdateBirth();

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

    @Value("#{target.citizen_id}")
    String getCitizenId();

    @Value("#{target.role}")
    String getRole();
}
