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
    public List<Color> getAll() {
        return colorRepository.findAll();
    }

    @Override
    public ColorResponse getById(int id) {
        return colorRepository.getById(id).orElse(null);
    }

    @Override
    public Page<ColorResponse> getPage(PageableRequest pageReq, String textSearch) {
        Sort sort = Sort.by("id");
        Pageable pageable = PageRequest.of(pageReq.getPage() - 1, pageReq.getSize(), sort);
        return colorRepository.getPageColor(pageable, textSearch);
    }


    @Override
    public Color addColor(ColorRequest colorReq) {
        try {
            Color color = colorReq.tranColor(new Color());
            color.setDeleted(false);
            return colorRepository.save(color);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Color updateColor(ColorRequest colorReq, int id) {
        try {
            Color color = colorRepository.findById(id).orElseThrow();
            return colorRepository.save(colorReq.tranColor(color));
        } catch (Exception e) {
            return null;
        }
    }
}