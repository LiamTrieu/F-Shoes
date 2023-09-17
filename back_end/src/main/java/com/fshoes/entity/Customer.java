package com.fshoes.entity;

import com.fshoes.entity.base.PrimaryEntity;
import com.fshoes.infrastructure.constant.EntityProperties;
import com.fshoes.infrastructure.constant.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "customer")
public class Customer extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_NAME)
    private String fullName;

    private Long dateBirth;

    @Column(length = EntityProperties.LENGTH_PHONE, unique = true)
    private String phoneNumber;

    @Column(length = EntityProperties.LENGTH_EMAIL, unique = true)
    private String email;

    private Boolean gender;

    @Column(length = EntityProperties.LENGTH_PASSWORD)
    private String password;

    @Column(length = EntityProperties.LENGTH_NAME)
    private String avatar;

    private Status status;

    public Integer getStatus() {
        return status.ordinal();
    }

    public void setStatus(Integer status) {
        this.status = Status.values()[status];
    }
}
