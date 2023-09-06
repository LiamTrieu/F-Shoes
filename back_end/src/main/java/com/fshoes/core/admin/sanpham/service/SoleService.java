package com.fshoes.core.admin.sanpham.service;

import com.fshoes.core.admin.sanpham.model.request.SoleRequest;
import com.fshoes.core.admin.sanpham.model.respone.SoleResponse;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Sole;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SoleService {

    List<SoleResponse> getAll();

    SoleResponse getById(int id);

    Page<SoleResponse> getPage(PageableRequest pageableRequest, String textSearch);

    Sole addSole(SoleRequest soleReq);

    Sole updateSole(SoleRequest soleReq, int id);
}
