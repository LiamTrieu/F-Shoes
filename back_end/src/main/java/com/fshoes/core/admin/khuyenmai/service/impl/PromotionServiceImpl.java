package com.fshoes.core.admin.khuyenmai.service.impl;

import com.fshoes.core.admin.khuyenmai.model.request.AddProductRequest;
import com.fshoes.core.admin.khuyenmai.model.request.ProductPromotionAddRequest;
import com.fshoes.core.admin.khuyenmai.model.request.ProductPromotionRequest;
import com.fshoes.core.admin.khuyenmai.model.request.PromotionRequestAdd;
import com.fshoes.core.admin.khuyenmai.model.request.PromotionSearch;
import com.fshoes.core.admin.khuyenmai.model.respone.AddProductPromotionResponse;
import com.fshoes.core.admin.khuyenmai.model.respone.PromotionRespone;
import com.fshoes.core.admin.khuyenmai.repository.KMPromotionRepository;
import com.fshoes.core.admin.khuyenmai.repository.ProductPromotionAddRepository;
import com.fshoes.core.admin.khuyenmai.service.PromotionService;
import com.fshoes.core.admin.sanpham.model.respone.ProductResponse;
import com.fshoes.core.common.PageReponse;
import com.fshoes.entity.Product;
import com.fshoes.entity.ProductDetail;
import com.fshoes.entity.ProductPromotion;
import com.fshoes.entity.Promotion;
import com.fshoes.repository.ProductDetailRepository;
import com.fshoes.repository.ProductPromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PromotionServiceImpl implements PromotionService {

    @Autowired
    private KMPromotionRepository khuyenMaiRepository;

    @Autowired
    private ProductPromotionAddRepository promotionAddRepository;

    @Autowired
    private ProductPromotionRepository productPromotionRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    public List<PromotionRespone> getAll() {
        return khuyenMaiRepository.getAllKhuyenMai();
    }

    @Override
    public PageReponse<PromotionRespone> getPage(PromotionRequestAdd request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        return new PageReponse<>(khuyenMaiRepository.getPagePromotion(pageable));
    }

    public Promotion getOne(String id) {
        return khuyenMaiRepository.findById(id).orElse(null);
    }

    //    @Override
    public Promotion deleteKhuyenMai(String id) {
        try {
            Promotion promotion = khuyenMaiRepository.findById(id).orElse(null);
            promotion.setStatus(2);
            return khuyenMaiRepository.save(promotion);
        } catch (Exception e) {
            return null;
        }
    }


    public Promotion addKhuyenMai(PromotionRequestAdd promotionRequest) throws ParseException {

        Promotion promotion = promotionRequest.newPromotion(new Promotion());
        return khuyenMaiRepository.save(promotion);
    }

    public Promotion updateKhuyenMai(PromotionRequestAdd promotionRequest, String id) throws ParseException {
        try {
            Promotion promotion = khuyenMaiRepository.findById(id).orElse(null);
            return khuyenMaiRepository.save(promotionRequest.newPromotion(promotion));
        } catch (Exception e) {
            return null;
        }

    }

    @Override
    public Promotion addKhuyenMaiOnProduct(ProductPromotionAddRequest request) throws ParseException {
        Promotion promotion = request.newPromotionAddProduct(new Promotion());
        khuyenMaiRepository.save(promotion);
        List<ProductDetail> productList = productDetailRepository.findAll();
        List<ProductPromotion> productPromotionList = new ArrayList<>();
        if (request.getType() == false) {
            for (ProductDetail productDetail : productList) {
                AddProductRequest addRequest = new AddProductRequest();
                addRequest.setPromotion(promotion);
                addRequest.setProductDetail(productDetail);
                ProductPromotion productPromotion = addRequest.newProductPromoton(new ProductPromotion());
                productPromotionList.add(productPromotion);
            }
        }else {
            for (String idProductDetail: request.getIdProductDetail()) {
                ProductDetail productDetail = productDetailRepository.findById(idProductDetail).get();
                AddProductRequest addRequest = new AddProductRequest();
                addRequest.setPromotion(promotion);
                addRequest.setProductDetail(productDetail);
                ProductPromotion productPromotion = addRequest.newProductPromoton(new ProductPromotion());
                productPromotionList.add(productPromotion);
            }
        }
        productPromotionRepository.saveAll(productPromotionList);
        return promotion;
    }


    //============================================================================
    @Override
    public Page<PromotionRespone> getAllPromotion(PromotionSearch filter) {
        Pageable pageable = PageRequest.of(filter.getPage() - 1, filter.getSize());
        return khuyenMaiRepository.getPromotion(filter, pageable);
    }


}
