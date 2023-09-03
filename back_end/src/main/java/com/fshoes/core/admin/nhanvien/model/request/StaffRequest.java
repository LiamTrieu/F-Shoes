package com.fshoes.core.admin.nhanvien.model.request;

import com.fshoes.entity.Staff;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class StaffRequest {
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

    private Integer role;

    public Staff tranStaff(Staff staff) {
        staff.setFullName(this.fullName);
        staff.setDateBirth(this.dateBirth);
        staff.setPhoneNumber(this.phoneNumber);
        staff.setEmail(this.email);
        staff.setGender(this.gender);
        staff.setCitizenId(this.CitizenId);
        staff.setRole(this.role);
        return staff;
    }
}
