package com.fshoes.core.admin.sanpham.service;

import com.fshoes.core.admin.sanpham.model.respone.ColorResponse;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Color;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ColorService {

    List<ColorResponse> getAll();

    Page<ColorResponse> getPage(PageableRequest pageableRequest);

    Color addColor(String code);

    Color updateColor(String code, int id);

    Color chageDeletedColor(boolean deleted, int id);
}
