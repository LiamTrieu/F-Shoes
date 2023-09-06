package com.fshoes.entity;

import com.fshoes.entity.base.LongEntity;
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

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "product_detail")
public class ProductDetail extends LongEntity {
    @Column(length = EntityProperties.LENGTH_CODE)
    private String code;

    private BigDecimal price;

    private Boolean deleted = false;

    private Integer amount;

    private String description;

    @ManyToOne
    @JoinColumn(name = "id_brand", referencedColumnName = "id")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "id_sole", referencedColumnName = "id")
    private Sole sole;

    @ManyToOne
    @JoinColumn(name = "id_material", referencedColumnName = "id")
    private Material material;

    @ManyToOne
    @JoinColumn(name = "id_category", referencedColumnName = "id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "id_product", referencedColumnName = "id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "id_size", referencedColumnName = "id")
    private Size size;

    @ManyToOne
    @JoinColumn(name = "id_color", referencedColumnName = "id")
    private Color color;

    @ManyToOne
    @JoinColumn(name = "id_image", referencedColumnName = "id")
    private Image image;
}
