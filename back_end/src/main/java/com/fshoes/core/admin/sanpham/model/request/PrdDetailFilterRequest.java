package com.fshoes.core.admin.sanpham.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrdDetailFilterRequest {
    private String idBrand;

    private String idSole;

    private String idMaterial;

    private String idCategory;

    private String idSize;

    private String idColor;
}
