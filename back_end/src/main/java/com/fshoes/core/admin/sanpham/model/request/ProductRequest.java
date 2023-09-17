package com.fshoes.core.admin.sanpham.model.request;

import com.fshoes.entity.Product;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequest {

    private String name;


    public Product tranProduct(Product product) {
        product.setName(this.name);
        return product;
    }
}
