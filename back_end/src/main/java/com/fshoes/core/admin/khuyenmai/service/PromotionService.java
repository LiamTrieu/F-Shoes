package com.fshoes.core.admin.khuyenmai.service;

import com.fshoes.core.admin.khuyenmai.model.request.ProductPromotionAddRequest;
import com.fshoes.core.admin.khuyenmai.model.request.ProductPromotionRequest;
import com.fshoes.core.admin.khuyenmai.model.request.PromotionRequestAdd;
import com.fshoes.core.admin.khuyenmai.model.request.PromotionSearch;
import com.fshoes.core.admin.khuyenmai.model.respone.PromotionRespone;
import com.fshoes.core.common.PageReponse;
import com.fshoes.entity.Promotion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.text.ParseException;
import java.util.List;

public interface PromotionService {


     List<PromotionRespone> getAll() ;

    PageReponse<PromotionRespone> getPage(PromotionRequestAdd request);
    Promotion getOne(String id);

    Promotion deleteKhuyenMai( String id);

     Promotion addKhuyenMai(PromotionRequestAdd promotionRequest) throws ParseException;

    Promotion updateKhuyenMai(PromotionRequestAdd promotionRequest, String id) throws ParseException;

    Promotion addKhuyenMaiOnProduct(ProductPromotionAddRequest request) throws ParseException;

     //=======================================================================

    Page<PromotionRespone> getAllPromotion(PromotionSearch filter);


}
