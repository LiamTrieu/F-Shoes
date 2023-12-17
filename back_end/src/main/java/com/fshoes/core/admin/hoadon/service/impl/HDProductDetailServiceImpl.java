package com.fshoes.core.admin.hoadon.service.impl;

import com.fshoes.core.admin.hoadon.model.respone.HDProductDetailResponse;
import com.fshoes.core.admin.hoadon.repository.HDProductDetailRepository;
import com.fshoes.core.admin.hoadon.service.HDProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HDProductDetailServiceImpl implements HDProductDetailService {

    @Autowired
    private HDProductDetailRepository hdProductDetailRepository;

    @Override
    public HDProductDetailResponse getPrdVsMaxKMValue(String id) {
        return hdProductDetailRepository.getPrdVsKM(id);
    }
}
