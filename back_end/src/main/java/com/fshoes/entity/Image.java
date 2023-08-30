package com.fshoes.entity;

import com.fshoes.entity.base.IntegerEntity;
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
@Table(name = "image")
public class Image extends IntegerEntity {
    @Column(length = EntityProperties.LENGTH_NAME)
    private String name;

    private Boolean deleted;

    @ManyToOne
    @JoinColumn(name = "id_product_detail", referencedColumnName = "id")
    private Product_Detail productDetail;
}
