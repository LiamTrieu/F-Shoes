package com.fshoes.core.client.service;

import com.fshoes.core.client.model.request.ClientProductDetailRequest;
import com.fshoes.core.client.model.request.ClientProductRequest;
import com.fshoes.core.client.model.response.ClientProductDetailResponse;
import com.fshoes.core.client.model.response.ClientProductResponse;
import com.fshoes.entity.Brand;
import com.fshoes.entity.Category;
import com.fshoes.entity.Color;
import com.fshoes.entity.Material;
import com.fshoes.entity.Size;
import com.fshoes.entity.Sole;

import java.util.List;

public interface ClientProductService {
    List<ClientProductResponse> getProducts(ClientProductRequest request);

    List<ClientProductResponse> getProductsHome(ClientProductRequest request);
    List<ClientProductResponse> getSellingProduct(ClientProductRequest request);

    List<ClientProductDetailResponse> getProductBySize(ClientProductDetailRequest request);

    List<Brand> getAllBrand();
    List<Category> getAllCategory();
    List<Color> getAllColor();
    List<Material> getAllMaterial();
    List<Size> getAllSize();
    List<Sole> getAllSole();
}
