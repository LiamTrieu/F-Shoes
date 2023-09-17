package com.fshoes.core.admin.khuyenmai.service.impl;

import com.fshoes.core.admin.khuyenmai.model.request.PromotionRequestAdd;
import com.fshoes.core.admin.khuyenmai.model.request.PromotionSearch;
import com.fshoes.core.admin.khuyenmai.model.respone.PromotionRespone;
import com.fshoes.core.admin.khuyenmai.repository.KMPromotionRepository;
import com.fshoes.core.admin.khuyenmai.service.PromotionService;
import com.fshoes.core.common.PageReponse;
import com.fshoes.entity.Promotion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;

@Service
public class PromotionServiceImpl implements PromotionService {

    @Autowired
    private KMPromotionRepository khuyenMaiRepository;

    public List<PromotionRespone> getAll() {
        return khuyenMaiRepository.getAllKhuyenMai();
    }

    @Override
    public PageReponse<PromotionRespone> getPage(PromotionRequestAdd request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        return new PageReponse<>( khuyenMaiRepository.getPagePromotion(pageable));
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
        }catch (Exception e){
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
        }catch (Exception e){
            return null;
        }

    }



    @Override
    public Page<PromotionRespone> searchByName(Integer page, String Name) {
        return null;
    }
//============================================================================
    @Override
    public Page<PromotionRespone> getAllPromotion(PromotionSearch filter) {
        Pageable pageable = PageRequest.of(filter.getPage() -1, filter.getSize());
        return khuyenMaiRepository.getPromotion(filter,pageable);
    }
//    @Override
//    public PageReponse<PromotionRespone> getSearchPromotion(PromotionSearch request) {
//        Pageable pageable = PageRequest.of(request.getPage(),request.getSize());
//        return new PageReponse<>( khuyenMaiRepository.getPromotion(request,pageable));
//    }
//
//    @Override
//    public PageReponse<PromotionRespone> getPagePromotion(PromotionRequest request) {
//        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
//        return new PageReponse<>( khuyenMaiRepository.getPagePromotion(pageable));
//    }


}
