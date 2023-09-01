package com.fshoes.core.admin.sanpham.model.request;

import com.fshoes.entity.Product;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequest {

    private String name;

    private String deleted = "false";

    public Product tranProduct(Product product) {
        product.setName(this.name);
        product.setDeleted(Boolean.valueOf(this.deleted));
        return product;
    }
}
