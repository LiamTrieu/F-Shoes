package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.model.request.SoleRequest;
import com.fshoes.core.admin.sanpham.model.respone.SoleResponse;
import com.fshoes.core.admin.sanpham.repository.SpSoleRepository;
import com.fshoes.core.admin.sanpham.service.SoleService;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Sole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SoleServiceImpl implements SoleService {

    @Autowired
    private SpSoleRepository soleRepository;

    @Override
    public List<SoleResponse> getAll() {
        return soleRepository.getAll();
    }

    @Override
    public SoleResponse getById(int id) {
        return soleRepository.getById(id).orElse(null);
    }

    @Override
    public Page<SoleResponse> getPage(PageableRequest pageReq, String textSearch) {
        Sort sort = Sort.by("id");
        Pageable pageable = PageRequest.of(pageReq.getPage() - 1, pageReq.getSize(), sort);
        return soleRepository.getPageSole(pageable, textSearch);
    }


    @Override
    public Sole addSole(SoleRequest soleReq) {
        try {
            Sole sole = soleReq.tranSole(new Sole());
            return soleRepository.save(sole);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Sole updateSole(SoleRequest soleReq, int id) {
        try {
            Sole sole = soleRepository.findById(id).orElseThrow();
            return soleRepository.save(soleReq.tranSole(sole));
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Sole chageDeleted(int id, boolean isDeleted) {
        try {
            Sole sole = soleRepository.findById(id).orElseThrow();
            sole.setDeleted(isDeleted);
            return soleRepository.save(sole);
        } catch (Exception e) {
            return null;
        }
    }
}
