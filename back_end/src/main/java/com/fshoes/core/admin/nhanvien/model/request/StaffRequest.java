package com.fshoes.core.admin.nhanvien.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.util.Date;

@Getter
@Setter
public  class StaffRequest {
    @NotBlank
    @Length(max = 100)
    private String fullName;

    private Long dateBirth;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    private String email;

    private Boolean gender;

    @NotBlank
    private String password;

    @NotBlank
    private String avatar;

    private String CitizenId;
//    private Integer status;

}
