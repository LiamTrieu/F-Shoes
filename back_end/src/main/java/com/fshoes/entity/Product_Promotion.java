package com.fshoes.entity;

import com.fshoes.entity.base.IntegerEntity;
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
@Table(name = "product_promotion")
public class Product_Promotion extends IntegerEntity {
    private Integer status;

    @ManyToOne
    @JoinColumn(name = "id_product_detail", referencedColumnName = "id")
    private Product_Detail productDetail;

    @ManyToOne
    @JoinColumn(name = "id_promotion", referencedColumnName = "id")
    private Promotion promotion;

}
