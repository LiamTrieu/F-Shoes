package com.fshoes.core.client.model.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class ClientProductRequest {
    private String id;
    private String brand;
    private String material;
    private String color;
    private String sole;
    private String category;
    private String nameProductDetail;
}
