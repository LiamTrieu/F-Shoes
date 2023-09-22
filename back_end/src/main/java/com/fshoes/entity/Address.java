package com.fshoes.entity;

import com.fshoes.entity.base.PrimaryEntity;
import com.fshoes.infrastructure.constant.EntityProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "address")
public class Address extends PrimaryEntity {


    @Column(length = EntityProperties.LENGTH_NAME)
    private String name;

    @Column(length = EntityProperties.LENGTH_PHONE)
    private String phoneNumber;

    @Column(length = EntityProperties.LENGTH_EMAIL)
    private String email;

    @Column(length = EntityProperties.LENGTH_ID)
    private String provinceId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String districtId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String wardId;

    @Column(length = EntityProperties.LENGTH_ADDRESS)
    private String specificAddress;

    private Boolean type;

    @ManyToOne
    @JoinColumn(name = "id_customer", referencedColumnName = "id")
    private Customer customer;

}
