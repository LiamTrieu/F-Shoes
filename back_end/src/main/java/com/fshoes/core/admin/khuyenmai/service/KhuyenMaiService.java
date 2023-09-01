package com.fshoes.core.admin.khuyenmai.service;

import com.fshoes.core.admin.khuyenmai.model.respone.KhuyenMaiRespone;
import com.fshoes.core.admin.khuyenmai.repository.KhuyenMaiRepository;
import com.fshoes.entity.Promotion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KhuyenMaiService {

    @Autowired
    KhuyenMaiRepository khuyenMaiRepository;

    public List<Promotion> getAll() {
        return khuyenMaiRepository.findAll();
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

    public Page<Promotion> KMPage(int page, int pageSize){
        Pageable pageable = PageRequest.of(page,pageSize);
        return khuyenMaiRepository.findAll(pageable);
    }


}
