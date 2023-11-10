package com.fshoes.core.client.service.impl;

import com.fshoes.core.client.model.request.ClientProductCungLoaiRequest;
import com.fshoes.core.client.model.request.ClientProductDetailRequest;
import com.fshoes.core.client.model.request.ClientProductRequest;
import com.fshoes.core.client.model.response.ClientProductDetailResponse;
import com.fshoes.core.client.model.response.ClientProductResponse;
import com.fshoes.core.client.repository.ClientBrandRepository;
import com.fshoes.core.client.repository.ClientCategoryRepository;
import com.fshoes.core.client.repository.ClientColorRepository;
import com.fshoes.core.client.repository.ClientMaterialRepository;
import com.fshoes.core.client.repository.ClientProductDetailRepository;
import com.fshoes.core.client.repository.ClientSizeRepository;
import com.fshoes.core.client.repository.ClientSoleRepository;
import com.fshoes.core.client.service.ClientProductService;
import com.fshoes.entity.Brand;
import com.fshoes.entity.Category;
import com.fshoes.entity.Color;
import com.fshoes.entity.Material;
import com.fshoes.entity.Size;
import com.fshoes.entity.Sole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientProductServiceImpl implements ClientProductService {

    @Autowired
    private ClientProductDetailRepository clientProductDetailRepository;

    @Autowired
    private ClientBrandRepository clientBrandRepository;

    @Autowired
    private ClientCategoryRepository clientCategoryRepository;

    @Autowired
    private ClientColorRepository clientColorRepository;

    @Autowired
    private ClientMaterialRepository clientMaterialRepository;

    @Autowired
    private ClientSizeRepository clientSizeRepository;

    @Autowired
    private ClientSoleRepository clientSoleRepository;

    @Override
    public List<ClientProductResponse> getProducts(ClientProductRequest request) {
        return clientProductDetailRepository.getProducts(request);
    }

    @Override
    public List<ClientProductResponse> getProductCungLoai(ClientProductCungLoaiRequest request) {
        Pageable pageable = PageRequest.of(0, 8);
        return clientProductDetailRepository.getProductCungLoai(request, pageable).getContent();
    }
    @Override
    public List<ClientProductResponse> getProductsHome(ClientProductRequest request) {
        return clientProductDetailRepository.getProductsHome(request);
    }

    @Override
    public List<ClientProductResponse> getSellingProduct(ClientProductRequest request) {
        return clientProductDetailRepository.getSellingProduct(request);
    }

    @Override
    public List<ClientProductDetailResponse> getProductBySize(ClientProductDetailRequest request) {
        return clientProductDetailRepository.getAllSize(request);
    }

    @Override
    public List<Brand> getAllBrand() {
        return clientBrandRepository.findAll();
    }

    @Override
    public List<Category> getAllCategory() {
        return clientCategoryRepository.findAll();
    }

    @Override
    public List<Color> getAllColor() {
        return clientColorRepository.findAll();
    }

    @Override
    public List<Material> getAllMaterial() {
        return clientMaterialRepository.findAll();
    }

    @Override
    public List<Size> getAllSize() {
        return clientSizeRepository.findAll();
    }

    @Override
    public List<Sole> getAllSole() {
        return clientSoleRepository.findAll();
    }


}
