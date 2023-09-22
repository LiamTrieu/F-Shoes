package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.repository.AdSizeRepository;
import com.fshoes.core.admin.sanpham.service.SizeService;
import com.fshoes.entity.Size;
import com.fshoes.infrastructure.constant.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeServiceImpl implements SizeService {

    @Autowired
    private AdSizeRepository sizeRepository;
  
    public List<Size> findAll() {
        return sizeRepository.findAll();
    }

    @Override
    public List<Size> getListSize() {
        return sizeRepository.findAllByDeleted(Status.HOAT_DONG);
    }
}
