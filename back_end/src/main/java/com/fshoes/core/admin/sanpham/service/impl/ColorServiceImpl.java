package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.repository.AdColorRepository;
import com.fshoes.core.admin.sanpham.service.ColorService;
import com.fshoes.entity.Color;
import com.fshoes.infrastructure.constant.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorServiceImpl implements ColorService {

    @Autowired
    private AdColorRepository colorRepository;
  
    public List<Color> findAll() {
        return colorRepository.findAll();
    }

    @Override
    public List<Color> getListColor() {
        return colorRepository.findAllByDeleted(Status.HOAT_DONG);
    }
}
