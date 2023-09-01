package com.fshoes.entity;

import com.fshoes.entity.base.IntegerEntity;
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
@Table(name = "color")
public class Color extends IntegerEntity {

    @Column(length = 20, unique = true)
    private String code;

    private Boolean deleted = false;
}
