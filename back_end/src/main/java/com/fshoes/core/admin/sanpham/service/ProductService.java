package com.fshoes.core.admin.sanpham.service;

import com.fshoes.core.admin.sanpham.model.request.ProductRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductResponse;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    List<ProductResponse> getAll();

    ProductResponse getById(String id);

    Page<ProductResponse> getPage(PageableRequest pageableRequest, String textSearch);

    Product addProduct(ProductRequest productReq);

    Product updateProduct(ProductRequest productReq, String id);

    Product chageDeleted(String id, Integer isDeleted);
}
