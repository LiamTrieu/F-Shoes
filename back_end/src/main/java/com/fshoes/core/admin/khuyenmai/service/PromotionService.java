package com.fshoes.core.admin.khuyenmai.service;

import com.fshoes.core.admin.khuyenmai.model.request.PromotionRequest;
import com.fshoes.core.admin.khuyenmai.model.respone.PromotionRespone;
import com.fshoes.entity.Promotion;
import org.springframework.data.domain.Page;

import java.text.ParseException;
import java.util.List;

public interface PromotionService {


     List<PromotionRespone> getAll() ;


    Promotion getOne(String id);


     Promotion addKhuyenMai(PromotionRequest promotionRequest) throws ParseException;

    Promotion updateKhuyenMai(PromotionRequest promotionRequest, String id) throws ParseException;

     Page<Promotion> KMPage(int page);

     Page<PromotionRespone> searchByName(Integer page,  String Name) ;

     Page<PromotionRespone> searchByStatus(Integer page, Integer pageSize, Integer status);

     Page<PromotionRespone> searchByTime(Integer page, String timeStartSearch, String timeEndSearch);
}
