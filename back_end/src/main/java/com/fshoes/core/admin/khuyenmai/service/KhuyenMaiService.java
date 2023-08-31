package com.fshoes.core.admin.khuyenmai.service;

import com.fshoes.core.admin.khuyenmai.repository.KhuyenMaiRepository;
import com.fshoes.core.admin.khuyenmai.service.impl.KhuyenMaiServiceImpl;
import com.fshoes.entity.Promotion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KhuyenMaiService implements KhuyenMaiServiceImpl {

    @Autowired
   static KhuyenMaiRepository khuyenMaiRepository;
    @Override
    public List<Promotion> getAll() {
        return khuyenMaiRepository.findAll();
    }
}
