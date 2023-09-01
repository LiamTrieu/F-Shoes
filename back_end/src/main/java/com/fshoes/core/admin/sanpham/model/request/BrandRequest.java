package com.fshoes.core.admin.sanpham.model.request;

import com.fshoes.entity.Brand;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BrandRequest {

    private String name;

    private String deleted = "false";

    public Brand tranBrand(Brand brand) {
        brand.setName(this.name);
        brand.setDeleted(Boolean.valueOf(this.deleted));
        return brand;
    }
}
