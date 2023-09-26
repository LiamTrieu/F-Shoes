package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.model.request.PrdDetailFilterRequest;
import com.fshoes.core.admin.sanpham.model.request.ProductDetailRequest;
import com.fshoes.core.admin.sanpham.model.request.ProductFilterRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductDetailResponse;
import com.fshoes.core.admin.sanpham.model.respone.ProductResponse;
import com.fshoes.core.admin.sanpham.repository.AdImageRepository;
import com.fshoes.core.admin.sanpham.repository.AdProductDetailRepository;
import com.fshoes.core.admin.sanpham.repository.AdProductRepository;
import com.fshoes.core.admin.sanpham.service.ProductService;
import com.fshoes.core.common.PageReponse;
import com.fshoes.entity.Image;
import com.fshoes.entity.ProductDetail;
import com.fshoes.infrastructure.cloudinary.CloudinaryImage;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private AdProductRepository productRepository;
    @Autowired
    private AdProductDetailRepository productDetailRepository;
    @Autowired
    private AdImageRepository imageRepository;
    @Autowired
    private CloudinaryImage cloudinaryImage;
    @Override
    public Page<ProductResponse> getProduct(ProductFilterRequest filter) {
        Pageable pageable = PageRequest.of(filter.getPage() - 1, filter.getSize());
        return productRepository.getAllProduct(filter, pageable);
    }

    @Override
    public List<ProductResponse> listProducts() {
        return productRepository.getListProduct();
    }

    @Override
    public List<String> getListImage(String folderName) {
        return cloudinaryImage.listImagesInFolder(folderName);
    }

    @Override
    public List<String> uploadListImage(String folderName,
                                        @ModelAttribute List<MultipartFile> listImage) {
        List<String> listUrlUpload = new ArrayList<>();
        for (MultipartFile image : listImage) {
            listUrlUpload.add(cloudinaryImage.uploadImage(image, folderName));
        }
        return listUrlUpload;
    }

    @Override
    @Transactional
    @Async
    public void addProductDetail(ProductDetailRequest request) {
        ProductDetail productDetail = productDetailRepository.save(request.tranDetail(new ProductDetail()));
        request.getListImage().forEach(i -> {
            Image image = new Image();
            image.setProductDetail(productDetail);
            image.setUrl(i);
            imageRepository.save(image);
        });
    }

    @Override
    public PageReponse<ProductDetailResponse> getProductDetail(PrdDetailFilterRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        return new PageReponse<>(productDetailRepository.getAllProductDetail(request, pageable));
    }
}
