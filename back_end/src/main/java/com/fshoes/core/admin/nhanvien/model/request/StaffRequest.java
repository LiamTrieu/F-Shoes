package com.fshoes.core.admin.nhanvien.model.request;

import com.fshoes.entity.Staff;
import com.fshoes.infrastructure.constant.Status;
import com.fshoes.util.DateUtil;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.text.ParseException;

@Getter
@Setter
public class StaffRequest {
    @NotBlank
    @Length(max = 100)
    private String fullName;

    private String dateBirth;

    @NotBlank
    private String phoneNumber;

    private String email;

    private Boolean gender;

    private String password;

    private String avatar;

    private String CitizenId;

    private Integer role;

    private Integer status = 1;

    public Staff tranStaff(Staff staff) throws ParseException {
        staff.setFullName(this.getFullName());
        staff.setAvatar(this.getAvatar());
        staff.setDateBirth(DateUtil.parseDateLong(this.getDateBirth()));
        staff.setPhoneNumber(this.getPhoneNumber());
        staff.setEmail(this.getEmail());
        staff.setGender(this.getGender());
        staff.setCitizenId(this.getCitizenId());
        staff.setRole(this.getRole());
        System.out.println(this.status);
        staff.setStatus(Status.values()[status]);
        return staff;
    }
}
