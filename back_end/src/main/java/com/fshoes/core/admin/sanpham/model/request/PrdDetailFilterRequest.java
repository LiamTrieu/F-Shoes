package com.fshoes.core.admin.sanpham.model.request;

import com.fshoes.core.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrdDetailFilterRequest extends PageableRequest {
    private String idBrand;

    private String idSole;

    private String idMaterial;

    private String idCategory;

    private String idSize;

    private String idColor;
}
