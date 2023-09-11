package com.fshoes.core.admin.nhanvien.model.request;

import com.fshoes.entity.Staff;
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

    private Integer status;

    public Staff tranStaff(Staff staff) throws ParseException {
        try {
            staff.setFullName(this.fullName);
            staff.setDateBirth(DateUtil.parseDateLong(this.dateBirth));
            staff.setPhoneNumber(this.phoneNumber);
            staff.setEmail(this.email);
            staff.setGender(this.gender);
            staff.setCitizenId(this.CitizenId);
            staff.setRole(this.role);
            System.out.println(this.status);
            staff.setStatus(this.status);
            return staff;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
