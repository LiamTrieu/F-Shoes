package com.fshoes.core.client.model.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class ClientProductRequest {
    private String id;
    private List<String> brand;
    private List<String> material;
    private List<String> color;
    private List<String> sole;
    private List<String> category;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private String nameProductDetail;
}
