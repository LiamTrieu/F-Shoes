package com.fshoes.core.admin.nhanvien.model.request;

import com.fshoes.entity.Staff;
import com.fshoes.infrastructure.constant.EntityProperties;
import com.fshoes.infrastructure.constant.Status;
import com.fshoes.util.DateUtil;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;

@Getter
@Setter
public class StaffRequest {
    @NotBlank
    @Column(length = EntityProperties.LENGTH_NAME)
    private String fullName;

    private String dateBirth;

    @NotBlank
    private String phoneNumber;

    private String email;

    private Boolean gender;

    private MultipartFile avatar;

    private String CitizenId;

    private Integer role;

    private Integer status = 0;

    public Staff tranStaff(Staff staff) throws ParseException {
        staff.setFullName(this.getFullName());
        staff.setDateBirth(DateUtil.parseDateLong(this.getDateBirth()));
        staff.setPhoneNumber(this.getPhoneNumber());
        staff.setEmail(this.getEmail());
        staff.setGender(this.getGender());
        staff.setCitizenId(this.getCitizenId());
        staff.setRole(this.getRole());
        staff.setStatus(status);
        return staff;
    }
}
