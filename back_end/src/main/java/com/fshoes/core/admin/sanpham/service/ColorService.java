package com.fshoes.core.admin.sanpham.service;

import com.fshoes.core.admin.sanpham.model.request.ColorRequest;
import com.fshoes.core.admin.sanpham.model.respone.ColorResponse;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Color;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ColorService {

    List<Color> getAll();

    ColorResponse getById(int id);

    Page<ColorResponse> getPage(PageableRequest pageableRequest, String textSearch);

    Color addColor(ColorRequest colorReq);

    Color updateColor(ColorRequest colorReq, int id);
}
