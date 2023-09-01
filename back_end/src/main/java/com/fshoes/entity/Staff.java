package com.fshoes.entity;

import com.fshoes.entity.base.IntegerEntity;
import com.fshoes.infrastructure.constant.EntityProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "staff")
public class Staff extends IntegerEntity {
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

    private Integer role = 0;

    private Integer status = 1;

}
