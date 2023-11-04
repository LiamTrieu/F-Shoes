package com.fshoes.core.client.model.request;

import com.fshoes.core.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientProductRequest {
    private String id;
    private String color;
    private String material;
    private String sole;
    private String category;
    private String brand;
    private String nameProductDetail;

}
