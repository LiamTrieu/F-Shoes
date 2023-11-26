package com.fshoes.entity;

import com.fshoes.entity.base.PrimaryEntity;
import com.fshoes.infrastructure.constant.EntityProperties;
import com.fshoes.infrastructure.constant.StatusBillDetail;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "return_detail")
public class ReturnDetail extends PrimaryEntity {
    private Integer quantity;

    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "id_return", referencedColumnName = "id")
    private Returns returns;

    @ManyToOne
    @JoinColumn(name = "id_product_detail", referencedColumnName = "id")
    private ProductDetail productDetail;

    @ManyToOne
    @JoinColumn(name = "id_bill_detail", referencedColumnName = "id")
    private BillDetail billDetail;

    @Column(columnDefinition = EntityProperties.DEFINITION_DESCRIPTION)
    private String note;
}
