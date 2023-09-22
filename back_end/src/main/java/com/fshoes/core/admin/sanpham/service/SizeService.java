package com.fshoes.core.admin.sanpham.service;

import com.fshoes.entity.Brand;
import com.fshoes.entity.Size;

import java.util.List;

public interface SizeService {
    List<Size> findAll();

    List<Size> getListSize();
}
