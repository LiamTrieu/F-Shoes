package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.model.request.PrdDetailFilterRequest;
import com.fshoes.core.admin.sanpham.model.request.ProductDetailRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductDetailResponse;
import com.fshoes.core.admin.sanpham.repository.SpImageRepository;
import com.fshoes.core.admin.sanpham.repository.SpProductDetailRepository;
import com.fshoes.core.admin.sanpham.service.ProductDetailService;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Image;
import com.fshoes.entity.ProductDetail;
import com.fshoes.infrastructure.cloudinary.CloudinaryImage;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

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
    public ProductDetailResponse getById(Long id) {
        return productDetailRepository.getById(id).orElse(null);
    }

    @Override
    public Page<ProductDetailResponse> getPage(PageableRequest pageReq, PrdDetailFilterRequest filterReq) {
        Sort sort = Sort.by("id").reverse();
        Pageable pageable = PageRequest.of(pageReq.getPage() - 1, pageReq.getSize(), sort);
        return productDetailRepository.getAll(pageable, filterReq);
    }


    @Override
    @Transactional
    public ProductDetailResponse addProductDetail(ProductDetailRequest detailReq) {
        try {
            ProductDetail productDetail = detailReq.tranDetail(new ProductDetail());
            productDetailRepository.save(productDetail);

            List<MultipartFile> files = detailReq.getImages();

            // Tai anh len cloundinary va set anh mac dinh cho product detail
            for (int i = 0; i < files.size(); i++) {
                String url = cloudinaryImage.uploadImage(files.get(i));
                Image image = new Image(url, false, productDetail);
                imageRepository.save(image);
                if (i == detailReq.getIndexDefault()) {
                    productDetail.setImage(image);
                }
            }

            //save productdetail da duoc them anh mac dinh
            Long idProduct = productDetailRepository.save(productDetail).getId();

            return productDetailRepository.getById(idProduct).orElseThrow();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    @Transactional
    public ProductDetailResponse updateProductDetail(ProductDetailRequest detailReq, int id) {
        try {
            ProductDetail detailById = productDetailRepository.findById(id).orElseThrow();
            ProductDetail productDetail = detailReq.tranDetail(detailById);

            List<MultipartFile> files = detailReq.getImages();
            List<Integer> listIdImage = detailReq.getIdImage();

            // Tai anh len cloundinary va set anh mac dinh cho product detail
            for (MultipartFile file : files) {
                String url = cloudinaryImage.uploadImage(file);
                Image image = new Image(url, false, productDetail);
                imageRepository.save(image);
                listIdImage.add(image.getId());
            }

            //tim anh duoc dat lam mac dinh va set cho product detail
            for (int i = 0; i < listIdImage.size(); i++) {
                if (i == detailReq.getIndexDefault()){
                    Image image = new Image();
                    image.setId(listIdImage.get(i));
                    productDetail.setImage(image);
                }
            }

            //save product detail da duoc them anh mac dinh
            Long idProduct = productDetailRepository.save(productDetail).getId();

            return productDetailRepository.getById(idProduct).orElseThrow();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
