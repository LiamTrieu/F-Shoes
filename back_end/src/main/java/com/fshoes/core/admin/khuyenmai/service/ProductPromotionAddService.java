package com.fshoes.core.admin.khuyenmai.service;

import com.fshoes.core.admin.khuyenmai.model.request.ProductPromotionRequest;
import com.fshoes.core.admin.khuyenmai.model.respone.AddProductPromotionResponse;

import java.util.List;

public interface ProductPromotionAddService {

    List<AddProductPromotionResponse> getAll();
}
