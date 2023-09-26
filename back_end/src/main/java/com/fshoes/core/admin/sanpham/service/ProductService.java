package com.fshoes.core.admin.sanpham.service;

import com.fshoes.core.admin.sanpham.model.request.PrdDetailFilterRequest;
import com.fshoes.core.admin.sanpham.model.request.ProductDetailRequest;
import com.fshoes.core.admin.sanpham.model.request.ProductFilterRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductDetailResponse;
import com.fshoes.core.admin.sanpham.model.respone.ProductResponse;
import com.fshoes.core.common.PageReponse;
import com.fshoes.entity.Product;
import com.fshoes.entity.ProductDetail;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    Page<ProductResponse> getProduct(ProductFilterRequest filter);

    List<ProductResponse> listProducts();

    List<String> getListImage(String folderName);

    List<String> uploadListImage(String folderName, List<MultipartFile> listImages);

    void addProductDetail(ProductDetailRequest request);

    PageReponse<ProductDetailResponse> getProductDetail(PrdDetailFilterRequest request);
}
