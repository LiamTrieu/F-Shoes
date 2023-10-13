package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.model.request.PrdDetailFilterRequest;
import com.fshoes.core.admin.sanpham.model.request.ProductDetailRequest;
import com.fshoes.core.admin.sanpham.model.request.ProductFilterRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductDetailResponse;
import com.fshoes.core.admin.sanpham.model.respone.ProductMaxPriceResponse;
import com.fshoes.core.admin.sanpham.model.respone.ProductResponse;
import com.fshoes.core.admin.sanpham.repository.AdImageRepository;
import com.fshoes.core.admin.sanpham.repository.AdProductDetailRepository;
import com.fshoes.core.admin.sanpham.repository.AdProductRepository;
import com.fshoes.core.admin.sanpham.service.ProductService;
import com.fshoes.core.common.PageReponse;
import com.fshoes.entity.Image;
import com.fshoes.entity.Product;
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
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.IntStream;

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
    public void addProductDetail(List<ProductDetailRequest> request) {
        Product product = new Product();
        if (!Objects.equals(request.get(0).getIdProduct(), "")) {
            product.setId(request.get(0).getIdProduct());
        } else {
            product.setName(request.get(0).getNameProduct());
            productRepository.save(product);
        }

        AtomicLong maxLength = new AtomicLong(productDetailRepository.count() + 1);
        List<ProductDetail> newProductDetail = request.stream().map(productDetailRequest -> {
            ProductDetail productDetail = new ProductDetail();
            productDetail.setProduct(product);
            productDetail.setCode("PD" + maxLength.getAndIncrement());
            return productDetailRequest.tranDetail(productDetail);
        }).toList();
        List<Image> newImages = new ArrayList<>();
        for (ProductDetail productDetail : productDetailRepository.saveAll(newProductDetail)) {
            newImages.addAll(request.get(0).getListImage().stream().map(img -> {
                Image image = new Image();
                image.setUrl(img);
                image.setProductDetail(productDetail);
                return image;
            }).toList());
        }
        imageRepository.saveAll(newImages);
    }

    @Override
    public PageReponse<ProductDetailResponse> getProductDetail(PrdDetailFilterRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        return new PageReponse<>(productDetailRepository.getAllProductDetail(request, pageable));
    }

    @Override
    public ProductMaxPriceResponse getMaxPriceProductId(String productId) {
        return productDetailRepository.getProductMaxPrice(productId);
    }

    @Override
    public Boolean changeProduct(String id) {
        Product product = productRepository.getReferenceById(id);
        product.setDeleted(product.getDeleted() == 0 ? 1 : 0);
        productRepository.save(product);
        return true;
    }

    @Override
    public ProductDetail details(String id) {
        return productDetailRepository.findById(id).orElseThrow();
    }

    @Override
    public List<Image> getImageProduct(String id) {
        return imageRepository.getImageByProductDetailId(id);
    }

    @Override
    @Transactional
    public void updateProductDetail(String id, ProductDetailRequest request) {
        ProductDetail productDetail = productDetailRepository.findById(id).orElseThrow();
        List<Image> images = imageRepository.getImageByProductDetailId(id);
        IntStream.range(0, images.size())
                .forEach(index -> images.get(index).setUrl(request.getListImage().get(index)));
        imageRepository.saveAll(images);
        productDetailRepository.save(request.tranDetail(productDetail));
    }

    @Override
    public Boolean changeStatusProduct(String id) {
        ProductDetail product = productDetailRepository.getReferenceById(id);
        product.setDeleted(product.getDeleted() == 0 ? 1 : 0);
        productDetailRepository.save(product);
        return true;
    }

    @Override
    public Product updateNameProduct(String idProduct, String nameProduct) {
        try {
            Optional<Product> optionalProduct = productRepository.findById(idProduct);
            if (optionalProduct.isPresent()) {
                Product product = optionalProduct.get();
                product.setName(nameProduct);
                productRepository.save(product);
                return product;
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
