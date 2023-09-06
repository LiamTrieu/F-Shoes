package com.fshoes.core.admin.sanpham.service;

import com.fshoes.core.admin.sanpham.model.request.SizeRequest;
import com.fshoes.core.admin.sanpham.model.respone.SizeResponse;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Size;
import org.springframework.data.domain.Page;

import java.util.List;

public interface SizeService {

    List<SizeResponse> getAll();

    SizeResponse getById(int id);

    Page<SizeResponse> getPage(PageableRequest pageableRequest, String textSearch);

    Size addSize(SizeRequest sizeReq);

    Size updateSize(SizeRequest sizeReq, int id);
}
