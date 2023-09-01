package com.fshoes.core.admin.sanpham.service;

import com.fshoes.core.admin.sanpham.model.request.PrdDetailFilterRequest;
import com.fshoes.core.admin.sanpham.model.request.ProductDetailRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductDetailResponse;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Product_Detail;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductDetailService {

    List<Product_Detail> getAll();

    ProductDetailResponse getById(int id);

    Page<ProductDetailResponse> getPage(PageableRequest pageableRequest, PrdDetailFilterRequest detailFilterReq);

    Product_Detail addProductDetail(ProductDetailRequest productDetailReq);

    Product_Detail updateProductDetail(ProductDetailRequest productDetailReq, int id);
}
