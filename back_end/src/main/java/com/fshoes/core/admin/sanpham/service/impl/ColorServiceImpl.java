package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.model.respone.ColorResponse;
import com.fshoes.core.admin.sanpham.repository.SPColorRepository;
import com.fshoes.core.admin.sanpham.service.ColorService;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Color;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ColorServiceImpl implements ColorService {

    @Autowired
    private SPColorRepository colorRepository;

    @Override
    public List<ColorResponse> getAll() {
        return colorRepository.getAllColor();
    }

    @Override
    public Page<ColorResponse> getPage(PageableRequest pageReq) {
        Sort sort = Sort.by("id");
        Pageable pageable = PageRequest.of(pageReq.getPage()-1, pageReq.getSize(), sort);
        return colorRepository.getPageColor(pageable);
    }


    @Override
    @Transactional
    public Color addColor(String code) {
        return colorRepository.save(Color.builder().code(code).build());
    }

    @Override
    @Transactional
    public Color updateColor(String code, int id) {
        Color color = colorRepository.findById(id).orElseThrow();
        color.setCode(code);
        return colorRepository.save(color);
    }

    @Override
    @Transactional
    public Color chageDeletedColor(boolean deleted, int id) {
        Color color = colorRepository.findById(id).orElseThrow();
        color.setDeleted(deleted);
        return colorRepository.save(color);
    }
}
