package com.fshoes.core.admin.khuyenmai.service.impl;

import com.fshoes.core.admin.khuyenmai.model.respone.PromotionRespone;
import com.fshoes.core.admin.khuyenmai.repository.KMPromotionRepository;
import com.fshoes.core.admin.khuyenmai.service.PromotionService;
import com.fshoes.entity.Promotion;
import com.fshoes.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

@Service
public class PromotionServiceImpl implements PromotionService {

    @Autowired
    private KMPromotionRepository khuyenMaiRepository;

    public List<PromotionRespone> getAll() {
        return khuyenMaiRepository.getAllKhuyenMai();
    }

    public Optional<Promotion> getOne(int id) {
        return khuyenMaiRepository.findById(id);
    }

    public Promotion addKhuyenMai(Promotion promotion) {
        return khuyenMaiRepository.save(promotion);
    }

    public Promotion updateKhuyenMai(Promotion promotion, int id) {
        if (khuyenMaiRepository.existsById(id)) {
            promotion.setId(id);
            return khuyenMaiRepository.save(promotion);
        }
        return null;
    }

    public Page<Promotion> KMPage(int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return khuyenMaiRepository.findAll(pageable);
    }

    public Page<PromotionRespone> searchByName(Integer page, Integer pageSize, String Name) {
        Pageable pageable = PageRequest.of(page, pageSize);
        return khuyenMaiRepository.searchByName(pageable, Name);
    }

    public Page<PromotionRespone> searchByStatus(Integer page, Integer pageSize, Integer status) {
        Pageable pageable = PageRequest.of(page, pageSize);
        return khuyenMaiRepository.searchByStatus(pageable, status);
    }

    public Page<PromotionRespone> searchByTime(Integer page, Integer pageSize, String timeStartSearch, String timeEndSearch) {
        try {
            Long timeStart = DateUtil.parseDateLong(timeStartSearch);
            Long timeEnd = DateUtil.parseDateLong(timeEndSearch);
            Pageable pageable = PageRequest.of(page, pageSize);
            if (timeEnd.equals("") && !timeStart.equals("")) {
                return khuyenMaiRepository.searchByTimeStart(pageable, timeStart);
            } else if (!timeEnd.equals("") && timeStart.equals("")) {
                return khuyenMaiRepository.searchByTimeEnd(pageable, timeEnd);
            } else {
                return khuyenMaiRepository.searchPromotionBetweenDate(pageable, timeStart, timeEnd);
            }
        } catch (Exception e) {
            return null;
        }
    }

}
