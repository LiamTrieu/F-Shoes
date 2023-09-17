package com.fshoes.core.admin.sanpham.service;

import com.fshoes.core.admin.sanpham.model.request.ProductFilterRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductResponse;
import org.springframework.data.domain.Page;

public interface ProductService {

    Page<ProductResponse> getProduct(ProductFilterRequest filter);
}
