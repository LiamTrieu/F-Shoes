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
import org.springframework.data.domain.PageRequest;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
public class ProductDetailRequest {

    private String idBrand;

    private String idSole;

    private String description;

    private String idMaterial;

    private String idCategory;

    private String idProduct;

    private String idSize;

    private String idColor;

    private String price;

    private String amount;

    private String weight;

    private List<String> listImage;



    public ProductDetail tranDetail(ProductDetail productDetail){
        Brand brand = new Brand();
        brand.setId(this.getIdBrand());
        productDetail.setBrand(brand);

        Sole sole = new Sole();
        sole.setId(this.getIdSole());
        productDetail.setSole(sole);

        Material material = new Material();
        material.setId(this.getIdMaterial());
        productDetail.setMaterial(material);

        Category category = new Category();
        category.setId(this.getIdCategory());
        productDetail.setCategory(category);

        Product product = new Product();
        product.setId(this.getIdProduct());
        productDetail.setProduct(product);

        Size size = new Size();
        size.setId(this.getIdSize());
        productDetail.setSize(size);

        Color color = new Color();
        color.setId(this.idColor);
        productDetail.setColor(color);

        productDetail.setDescription(description);

        productDetail.setPrice(BigDecimal.valueOf(Long.parseLong(this.price)));

        productDetail.setWeight(Integer.parseInt(this.weight));

        productDetail.setAmount(Integer.valueOf(this.amount));
        return productDetail;
    }

}
