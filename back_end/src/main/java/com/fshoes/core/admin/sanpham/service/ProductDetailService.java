package com.fshoes.core.admin.sanpham.service;

import com.fshoes.core.admin.sanpham.model.request.PrdDetailFilterRequest;
import com.fshoes.core.admin.sanpham.model.request.ProductDetailRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductDetailResponse;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.ProductDetail;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductDetailService {

    List<ProductDetail> getAll();

    ProductDetailResponse getById(Long id);

    Page<ProductDetailResponse> getPage(int id,PageableRequest pageableRequest, PrdDetailFilterRequest detailFilterReq);

    ProductDetailResponse addProductDetail(ProductDetailRequest productDetailReq);

    ProductDetailResponse updateProductDetail(ProductDetailRequest productDetailReq, int id);
}
