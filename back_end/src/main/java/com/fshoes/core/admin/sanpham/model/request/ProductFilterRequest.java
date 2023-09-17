package com.fshoes.core.admin.sanpham.model.request;

import com.fshoes.core.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductFilterRequest extends PageableRequest {
    private String name;

    private String category;

    private String brand;

    private String status;
}
