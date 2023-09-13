package com.fshoes.core.admin.sanpham.service;

import com.fshoes.core.admin.sanpham.model.request.BrandRequest;
import com.fshoes.core.admin.sanpham.model.respone.BrandResponse;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Brand;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BrandService {

    List<BrandResponse> getAll();

    BrandResponse getById(String id);

    Page<BrandResponse> getPage(PageableRequest pageableRequest, String textSearch);

    Brand addBrand(BrandRequest brandReq);

    Brand updateBrand(BrandRequest brandReq, String id);

    Brand chageDeleted(String id, Integer isDeleted);
}
