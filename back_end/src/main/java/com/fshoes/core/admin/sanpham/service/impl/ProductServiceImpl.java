package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.model.request.ProductFilterRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductResponse;
import com.fshoes.core.admin.sanpham.repository.AdProductRepository;
import com.fshoes.core.admin.sanpham.service.ProductService;
import com.fshoes.entity.Product;
import com.fshoes.infrastructure.constant.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private AdProductRepository productRepository;
    @Override
    public Page<ProductResponse> getProduct(ProductFilterRequest filter) {
        Pageable pageable = PageRequest.of(filter.getPage() - 1, filter.getSize());
        return productRepository.getAllProduct(filter, pageable);
    }

    @Override
    public List<Product> listProducts() {
        return productRepository.findAllByDeleted(Status.HOAT_DONG);
    }
}
