package com.fshoes.core.client.model.request;

import com.fshoes.core.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ClientProductRequest {
    private String id;
    private String brand;
    private String material;
    private String color;
    private String sole;
    private String category;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private String nameProductDetail;
}
