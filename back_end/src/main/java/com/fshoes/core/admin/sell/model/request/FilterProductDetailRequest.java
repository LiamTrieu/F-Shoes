package com.fshoes.core.admin.sell.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FilterProductDetailRequest {

    private String color;
    private String material;
    private String size;
    private String sole;
    private String category;
    private String brand;
    private String nameProductDetail;
    private String codeProductDetail;
}
