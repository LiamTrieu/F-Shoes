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

    ProductDetailResponse getById(int id);

    Page<ProductDetailResponse> getPage(PageableRequest pageableRequest, PrdDetailFilterRequest detailFilterReq);

    ProductDetail addProductDetail(ProductDetailRequest productDetailReq);

    ProductDetail updateProductDetail(ProductDetailRequest productDetailReq, int id);
}
