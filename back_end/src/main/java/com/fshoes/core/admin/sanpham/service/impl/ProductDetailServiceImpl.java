package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.model.request.PrdDetailFilterRequest;
import com.fshoes.core.admin.sanpham.model.request.ProductDetailRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductDetailResponse;
import com.fshoes.core.admin.sanpham.repository.SpBrandRepository;
import com.fshoes.core.admin.sanpham.repository.SpCategoryRepository;
import com.fshoes.core.admin.sanpham.repository.SpColorRepository;
import com.fshoes.core.admin.sanpham.repository.SpImageRepository;
import com.fshoes.core.admin.sanpham.repository.SpMaterialRepository;
import com.fshoes.core.admin.sanpham.repository.SpProductDetailRepository;
import com.fshoes.core.admin.sanpham.repository.SpProductRepository;
import com.fshoes.core.admin.sanpham.repository.SpSizeRepository;
import com.fshoes.core.admin.sanpham.repository.SpSoleRepository;
import com.fshoes.core.admin.sanpham.service.ProductDetailService;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Brand;
import com.fshoes.entity.Category;
import com.fshoes.entity.Color;
import com.fshoes.entity.Image;
import com.fshoes.entity.Material;
import com.fshoes.entity.Product;
import com.fshoes.entity.Product_Detail;
import com.fshoes.entity.Size;
import com.fshoes.entity.Sole;
import com.fshoes.infrastructure.cloudinary.CloudinaryImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {

    @Autowired
    private SpProductDetailRepository productDetailRepository;

    @Autowired
    private SpImageRepository imageRepository;

    @Autowired
    private SpBrandRepository brandRepository;

    @Autowired
    private SpCategoryRepository categoryRepository;

    @Autowired
    private SpColorRepository colorRepository;

    @Autowired
    private SpMaterialRepository materialRepository;

    @Autowired
    private SpProductRepository productRepository;

    @Autowired
    private SpSizeRepository sizeRepository;

    @Autowired
    private SpSoleRepository soleRepository;

    @Autowired
    private CloudinaryImage cloudinaryImage;

    @Override
    public List<Product_Detail> getAll() {
        return productDetailRepository.findAll();
    }

    @Override
    public ProductDetailResponse getById(int id) {
        return productDetailRepository.getById(id).orElse(null);
    }

    @Override
    public Page<ProductDetailResponse> getPage(PageableRequest pageReq, PrdDetailFilterRequest filterReq) {
        Sort sort = Sort.by("id");
        Pageable pageable = PageRequest.of(pageReq.getPage() - 1, pageReq.getSize(), sort);
        return productDetailRepository.getAll(pageable, filterReq);
    }


    @Override
    public Product_Detail addProductDetail(ProductDetailRequest detailReq) {
        try {
            String url = cloudinaryImage.uploadImage(detailReq.getImage());
            Image image = imageRepository.save(Image.builder().name(url).build());
            Product_Detail productDetail = new Product_Detail();

            Brand brand = new Brand();
            brand.setId(Integer.valueOf(detailReq.getIdBrand()));
            productDetail.setBrand(brand);

            Sole sole = new Sole();
            sole.setId(Integer.valueOf(detailReq.getIdSole()));
            productDetail.setSole(sole);

            Material material = new Material();
            material.setId(Integer.valueOf(detailReq.getIdMaterial()));
            productDetail.setMaterial(material);

            Category category = new Category();
            category.setId(Integer.valueOf(detailReq.getIdCategory()));
            productDetail.setCategory(category);

            Product product = new Product();
            product.setId(Integer.valueOf(detailReq.getIdProduct()));
            productDetail.setProduct(product);

            Size size = new Size();
            size.setId(Integer.valueOf(detailReq.getIdSize()));
            productDetail.setSize(size);

            Color color = new Color();
            color.setId(Integer.valueOf(detailReq.getIdColor()));
            productDetail.setColor(color);


            productDetail.setCode(detailReq.genCode());
            productDetail.setPrice(BigDecimal.valueOf(Long.parseLong(detailReq.getPrice())));
            productDetail.setAmount(Integer.valueOf(detailReq.getAmount()));
            productDetail.setDeleted(false);
            productDetail.setImage(image);
            Product_Detail detailSave = productDetailRepository.save(productDetail);
            image.setProductDetail(detailSave);
            imageRepository.save(image);
            return productDetail;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Product_Detail updateProductDetail(ProductDetailRequest productDetailReq, int id) {
        try {
            Product_Detail prdById = productDetailRepository.findById(id).orElseThrow();
            String url = cloudinaryImage.uploadImage(productDetailReq.getImage());
            Image image = imageRepository.save(Image.builder().name(url).build());
            Product_Detail productDetail = new Product_Detail();
            productDetail.setImage(image);
            return productDetailRepository.save(productDetail);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
