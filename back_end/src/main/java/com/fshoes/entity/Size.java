package com.fshoes.entity;

import com.fshoes.entity.base.IntegerEntity;
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
@Table(name = "size")
public class Size extends IntegerEntity {

    private Float size;

    private Boolean deleted = false;
}
