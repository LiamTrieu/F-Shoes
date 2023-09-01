package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.model.request.SizeRequest;
import com.fshoes.core.admin.sanpham.model.respone.SizeResponse;
import com.fshoes.core.admin.sanpham.repository.SpSizeRepository;
import com.fshoes.core.admin.sanpham.service.SizeService;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeServiceImpl implements SizeService {

    @Autowired
    private SpSizeRepository sizeRepository;

    @Override
    public List<Size> getAll() {
        return sizeRepository.findAll();
    }

    @Override
    public SizeResponse getById(int id) {
        return sizeRepository.getById(id).orElse(null);
    }

    @Override
    public Page<SizeResponse> getPage(PageableRequest pageReq, String textSearch) {
        Sort sort = Sort.by("id");
        Pageable pageable = PageRequest.of(pageReq.getPage() - 1, pageReq.getSize(), sort);
        return sizeRepository.getPageSize(pageable, textSearch);
    }


    @Override
    public Size addSize(SizeRequest sizeReq) {
        try {
            Size size = sizeReq.tranSize(new Size());
            return sizeRepository.save(size);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Size updateSize(SizeRequest sizeReq, int id) {
        try {
            Size size = sizeRepository.findById(id).orElseThrow();
            return sizeRepository.save(sizeReq.tranSize(size));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
