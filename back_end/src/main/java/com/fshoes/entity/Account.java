package com.fshoes.entity;

import com.fshoes.entity.base.PrimaryEntity;
import com.fshoes.infrastructure.constant.EntityProperties;
import com.fshoes.infrastructure.constant.RoleAccount;
import com.fshoes.infrastructure.constant.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "account")
public class Account extends PrimaryEntity  {
    @Column(length = EntityProperties.LENGTH_NAME)
    private String fullName;

    private Long dateBirth;

    @Column(unique = true)
    private String CitizenId;

    @Column(length = EntityProperties.LENGTH_PHONE, unique = true)
    private String phoneNumber;

    @Column(length = EntityProperties.LENGTH_EMAIL, unique = true)
    private String email;

    private Boolean gender;

    @Column(length = EntityProperties.LENGTH_PASSWORD)
    private String password;

    private String avatar;

    private RoleAccount role;

    private Status status = Status.HOAT_DONG;

    public Integer getStatus() {
        return status.ordinal();
    }

    public void setStatus(Integer status) {
        this.status = Status.values()[status];
    }

    public Integer getRole() {
        return role.ordinal();
    }

    public void setRole(Integer role) {
        this.role = RoleAccount.values()[role];
    }


}
