package com.fshoes.core.admin.sanpham.model.request;

import com.fshoes.entity.Brand;
import com.fshoes.entity.Category;
import com.fshoes.entity.Color;
import com.fshoes.entity.Material;
import com.fshoes.entity.Product;
import com.fshoes.entity.ProductDetail;
import com.fshoes.entity.Size;
import com.fshoes.entity.Sole;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
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

    private Integer indexDefault = -1;

    private List<Integer> idImage;

    private List<MultipartFile> images;

    public ProductDetail tranDetail(ProductDetail productDetail){
        Brand brand = new Brand();
        brand.setId(Integer.valueOf(this.getIdBrand()));
        productDetail.setBrand(brand);

        Sole sole = new Sole();
        sole.setId(Integer.valueOf(this.getIdSole()));
        productDetail.setSole(sole);

        Material material = new Material();
        material.setId(Integer.valueOf(this.getIdMaterial()));
        productDetail.setMaterial(material);

        Category category = new Category();
        category.setId(Integer.valueOf(this.getIdCategory()));
        productDetail.setCategory(category);

        Product product = new Product();
        product.setId(Integer.valueOf(this.getIdProduct()));
        productDetail.setProduct(product);

        Size size = new Size();
        size.setId(Integer.valueOf(this.getIdSize()));
        productDetail.setSize(size);

        Color color = new Color();
        color.setId(Integer.valueOf(this.idColor));
        productDetail.setColor(color);

        productDetail.setCode(this.genCode());
        productDetail.setPrice(BigDecimal.valueOf(Long.parseLong(this.price)));
        productDetail.setAmount(Integer.valueOf(this.amount));
        productDetail.setDeleted(Boolean.valueOf(this.deleted));
        return productDetail;
    }


    public String genCode(){
        return new StringBuffer()
                .append(idProduct)
                .append(idBrand)
                .append(idColor)
                .append(idMaterial)
                .append(idSole)
                .append(idCategory)
                .toString();
    }
}
