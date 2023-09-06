package com.fshoes.core.admin.khuyenmai.service;

import com.fshoes.core.admin.khuyenmai.model.request.PromotionRequest;
import com.fshoes.core.admin.khuyenmai.model.respone.PromotionRespone;
import com.fshoes.core.admin.khuyenmai.repository.KMPromotionRepository;
import com.fshoes.entity.Promotion;
import com.fshoes.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

public interface PromotionService {


     List<PromotionRespone> getAll() ;


     Promotion getOne(int id);


     Promotion addKhuyenMai(PromotionRequest promotionRequest) throws ParseException;
     Promotion updateKhuyenMai(PromotionRequest promotionRequest, int id) throws ParseException;

     Page<Promotion> KMPage(int page);

     Page<PromotionRespone> searchByName(Integer page,  String Name) ;

     Page<PromotionRespone> searchByStatus(Integer page, Integer pageSize, Integer status);

     Page<PromotionRespone> searchByTime(Integer page, String timeStartSearch, String timeEndSearch);
}
