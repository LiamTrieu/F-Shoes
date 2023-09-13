package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.model.request.PrdDetailFilterRequest;
import com.fshoes.core.admin.sanpham.model.request.ProductDetailRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductDetailResponse;
import com.fshoes.core.admin.sanpham.repository.SpImageRepository;
import com.fshoes.core.admin.sanpham.repository.SpProductDetailRepository;
import com.fshoes.core.admin.sanpham.service.ProductDetailService;
import com.fshoes.entity.Image;
import com.fshoes.entity.ProductDetail;
import com.fshoes.infrastructure.cloudinary.CloudinaryImage;
import com.fshoes.infrastructure.constant.Status;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {

    @Autowired
    private SpProductDetailRepository productDetailRepository;

    @Autowired
    private SpImageRepository imageRepository;

    @Autowired
    private CloudinaryImage cloudinaryImage;

    @Override
    public List<ProductDetail> getAll() {
        return productDetailRepository.findAll();
    }

    @Override
    public ProductDetailResponse getById(String id) {
        return productDetailRepository.getDetailResponse(id).orElse(null);
    }

    @Override
    public Page<ProductDetailResponse> getPage(String id,
                                               PrdDetailFilterRequest filterReq) {
        Sort sort = Sort.by("id").reverse();
        Pageable pageable = PageRequest.of(filterReq.getPage() - 1, filterReq.getSize(), sort);
        return productDetailRepository.getAllByIdProduct(id,pageable, filterReq);
    }


    @Override
    public ProductDetailResponse addProductDetail(ProductDetailRequest detailReq) {
        try {
            ProductDetail productDetail = detailReq.tranDetail(new ProductDetail());
            productDetailRepository.save(productDetail);

            List<MultipartFile> files = detailReq.getImages();

            // Tai anh len cloundinary va set anh mac dinh cho product detail
            for (int i = 0; i < files.size(); i++) {
                String url = cloudinaryImage.uploadImage(files.get(i));
                Image image = new Image(url, Status.HOAT_DONG, false, productDetail);
                if (i == detailReq.getIndexDefault()) {
                    image.setDefaultImage(true);
                }
                imageRepository.save(image);
            }
            String idProduct = productDetail.getId();

            return productDetailRepository.getDetailResponse(idProduct).orElseThrow();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    @Transactional
    public ProductDetailResponse updateProductDetail(ProductDetailRequest detailReq,
                                                     String id) {
        try {
            ProductDetail detailById = productDetailRepository.findById(id).orElseThrow();
            ProductDetail productDetail = detailReq.tranDetail(detailById);

            List<MultipartFile> files = detailReq.getImages();
            List<String> listIdImage = detailReq.getIdImage();

            for (MultipartFile file : files) {
                String url = cloudinaryImage.uploadImage(file);
                Image image = new Image(url, Status.HOAT_DONG, false, productDetail);
                imageRepository.save(image);
                listIdImage.add(image.getId());
            }

            //tim anh duoc dat lam mac dinh va set cho product detail
            for (int i = 0; i < listIdImage.size(); i++) {
                if (i == detailReq.getIndexDefault()){
                    Image image = new Image();
                    image.setId(listIdImage.get(i));
                }
            }

            //save product detail da duoc them anh mac dinh
            String idProduct = productDetailRepository.save(productDetail).getId();

            return productDetailRepository.getDetailResponse(idProduct).orElseThrow();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
