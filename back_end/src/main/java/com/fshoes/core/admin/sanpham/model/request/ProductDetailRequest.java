package com.fshoes.core.admin.sanpham.model.request;

import com.fshoes.entity.Brand;
import com.fshoes.entity.Product_Detail;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductDetailRequest {

    private String idBrand;

    private String idSole;

    private String idMaterial;

    private String idCategory;

    private String idProduct;

    private String idSize;

    private String idColor;

    private String price;

    private String amount;

    private String deleted = "false";

    private MultipartFile image;

    public Product_Detail tranDetail(Product_Detail productDetail){
        productDetail.getBrand().setId(Integer.valueOf(idBrand));
        productDetail.getSole().setId(Integer.valueOf(idSole));
        productDetail.getMaterial().setId(Integer.valueOf(idMaterial));
        productDetail.getCategory().setId(Integer.valueOf(idCategory));
        productDetail.getProduct().setId(Integer.valueOf(idProduct));
        productDetail.getSize().setId(Integer.valueOf(idSize));
        productDetail.getColor().setId(Integer.valueOf(idColor));
        productDetail.setPrice(BigDecimal.valueOf(Long.parseLong(price)));
        productDetail.setAmount(Integer.valueOf(amount));
        productDetail.setDeleted(Boolean.valueOf(deleted));
        return productDetail;
    }

    public String genCode(){
        return new StringBuffer()
                .append(idProduct)
                .append(idBrand)
                .append(idSize)
                .append(idColor)
                .append(idMaterial)
                .append(idSole)
                .append(idCategory)
                .toString();
    }
}
