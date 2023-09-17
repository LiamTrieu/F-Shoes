package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.model.request.ColorRequest;
import com.fshoes.core.admin.sanpham.model.respone.ColorResponse;
import com.fshoes.core.admin.sanpham.repository.SpColorRepository;
import com.fshoes.core.admin.sanpham.service.ColorService;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Color;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorServiceImpl implements ColorService {

    @Autowired
    private SpColorRepository colorRepository;

    @Override
    public List<ColorResponse> getAll() {
        return colorRepository.getAll();
    }

    @Override
    public ColorResponse getById(String id) {
        return colorRepository.getColorById(id).orElse(null);
    }

    @Override
    public Page<ColorResponse> getPage(PageableRequest pageReq, String textSearch) {
        Sort sort = Sort.by("create_at");
        Pageable pageable = PageRequest.of(pageReq.getPage() - 1, pageReq.getSize(), sort);
        return colorRepository.getPageColor(pageable, textSearch);
    }


    @Override
    public Color addColor(ColorRequest colorReq) {
        try {
            Color color = colorReq.tranColor(new Color());
            return colorRepository.save(color);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Color updateColor(ColorRequest colorReq, String id) {
        try {
            Color color = colorRepository.findById(id).orElseThrow();
            return colorRepository.save(colorReq.tranColor(color));
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Color chageDeleted(String id, Integer isDeleted) {
        try {
            Color color = colorRepository.findById(id).orElseThrow();
            color.setDeleted(isDeleted);
            return colorRepository.save(color);
        } catch (Exception e) {
            return null;
        }
    }
}
