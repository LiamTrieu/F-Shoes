package com.fshoes.core.admin.sanpham.service;

import com.fshoes.core.admin.sanpham.model.request.MaterialRequest;
import com.fshoes.core.admin.sanpham.model.respone.MaterialResponse;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Material;
import org.springframework.data.domain.Page;

import java.util.List;

public interface MaterialService {

    List<MaterialResponse> getAll();

    MaterialResponse getById(String id);

    Page<MaterialResponse> getPage(PageableRequest pageableRequest, String textSearch);

    Material addMaterial(MaterialRequest materialReq);

    Material updateMaterial(MaterialRequest materialReq, String id);

    Material chageDeleted(String id, Integer isDeleted);
}
