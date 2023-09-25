package com.fshoes.core.admin.khuyenmai.service.impl;

import com.fshoes.core.admin.khuyenmai.model.request.AddProductRequest;
import com.fshoes.core.admin.khuyenmai.model.request.ProductPromotionAddRequest;
import com.fshoes.core.admin.khuyenmai.model.request.PromotionSearch;
import com.fshoes.core.admin.khuyenmai.model.respone.PromotionRespone;
import com.fshoes.core.admin.khuyenmai.repository.KMPromotionRepository;
import com.fshoes.core.admin.khuyenmai.service.PromotionService;
import com.fshoes.entity.ProductDetail;
import com.fshoes.entity.ProductPromotion;
import com.fshoes.entity.Promotion;
import com.fshoes.infrastructure.constant.StatusVoucher;
import com.fshoes.repository.ProductDetailRepository;
import com.fshoes.repository.ProductPromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
public class PromotionServiceImpl implements PromotionService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private KMPromotionRepository khuyenMaiRepository;

    @Autowired
    private ProductPromotionRepository productPromotionRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

//    @Scheduled(cron = "0 * * * * ?")
    @Transactional
    public void cronJobCheckPromotion(){
        boolean flag = true;
        long dateNow = Calendar.getInstance().getTimeInMillis();
        List<Promotion> promotionList = khuyenMaiRepository.getAllPromotionWrong(dateNow);
        for (Promotion promotion: promotionList){
            if(promotion.getTimeStart() >dateNow && promotion.getStatus() != StatusVoucher.SAP_DIEN_RA.ordinal()){
                promotion.setStatus((StatusVoucher.SAP_DIEN_RA.ordinal()));
                flag = true;
            }else if(promotion.getTimeEnd() < dateNow && promotion.getStatus() != StatusVoucher.DA_KET_THUC.ordinal()){
                promotion.setStatus(StatusVoucher.DA_KET_THUC.ordinal());
                flag = true;
            } else if (promotion.getTimeStart() <= dateNow && promotion.getTimeEnd() > dateNow
                      && promotion.getStatus() != StatusVoucher.DANG_DIEN_RA.ordinal()) {
                promotion.setStatus(StatusVoucher.DANG_DIEN_RA.ordinal());
                flag= true;
            }
        }
        if(flag){
            messagingTemplate.convertAndSend("/topic/promotionUpdates",khuyenMaiRepository.saveAll(promotionList));
        }
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

    @Override
    @Transactional
    public Promotion updateKhuyenMai(ProductPromotionAddRequest request, String id) throws ParseException {
        Promotion getOnePromotion = khuyenMaiRepository.findById(id).orElse(null);
        List<ProductDetail> productList = productDetailRepository.findAll();
        List<ProductPromotion> productPromotions = productPromotionRepository.getListProductPromotionByIdPromotion(id);
        for (ProductPromotion productPromotion : productPromotions) {
            productPromotionRepository.deleteById(productPromotion.getId());
        }
        Promotion promotionUpdate = new Promotion();
        if(getOnePromotion != null){
            Promotion promotion = getOnePromotion;
//            khuyenMaiRepository.save(request.newPromotionAddProduct(promotion));
            promotionUpdate = khuyenMaiRepository.save(request.newPromotionAddProduct(promotion));
            List<ProductPromotion> productPromotionList1 = new ArrayList<>();
            if (request.getType() == false) {
                for (ProductDetail productDetail : productList) {
                    AddProductRequest addRequest = new AddProductRequest();
                    addRequest.setPromotion(promotion);
                    addRequest.setProductDetail(productDetail);
                    ProductPromotion productPromotion = addRequest.newProductPromoton(new ProductPromotion());
                    productPromotionList1.add(productPromotion);
                }
            }else {
                for (String idProductDetail: request.getIdProductDetail()) {
                    ProductDetail productDetail = productDetailRepository.findById(idProductDetail).get();
                    AddProductRequest addRequest = new AddProductRequest();
                    addRequest.setPromotion(promotion);
                    addRequest.setProductDetail(productDetail);
                    ProductPromotion productPromotion = addRequest.newProductPromoton(new ProductPromotion());
                    productPromotionList1.add(productPromotion);
                }
            }
            productPromotionRepository.saveAll(productPromotionList1);
            List<Promotion> promotionList = new ArrayList<>();
            promotionList.add(promotionUpdate);
            messagingTemplate.convertAndSend("/topic/promotionUpdates",promotionList);
            return promotion;
        }

            return null;

    }

    @Override
    @Transactional
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
