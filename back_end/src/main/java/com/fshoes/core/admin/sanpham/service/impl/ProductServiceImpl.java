package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.model.request.ProductRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductResponse;
import com.fshoes.core.admin.sanpham.repository.SpProductRepository;
import com.fshoes.core.admin.sanpham.service.ProductService;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Product;
import com.fshoes.infrastructure.constant.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private SpProductRepository productRepository;

    @Override
    public List<ProductResponse> getAll() {
        return productRepository.getAll();
    }

    @Override
    public ProductResponse getById(String id) {
        return productRepository.productById(id).orElse(null);
    }

    @Override
    public Page<ProductResponse> getPage(PageableRequest pageReq, String textSearch) {
        Sort sort = Sort.by("create_at").reverse();
        Pageable pageable = PageRequest.of(pageReq.getPage() - 1, pageReq.getSize(), sort);
        Page<ProductResponse> page = productRepository.getPageProduct(pageable, textSearch);
        if (pageReq.getPage() > page.getTotalPages() && page.getTotalPages() > 0) {
            pageReq.setPage(page.getTotalPages());
            pageable = PageRequest.of(pageReq.getPage() - 1, pageReq.getSize(), sort);
            page = productRepository.getPageProduct(pageable, textSearch);
        }

        return page;
    }



    @Override
    public Product addProduct(ProductRequest productReq) {
        try {
            Product product = productReq.tranProduct(new Product());
            return productRepository.save(product);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Product updateProduct(ProductRequest productReq, String id) {
        try {
            Product product = productRepository.findById(id).orElseThrow();
            return productRepository.save(productReq.tranProduct(product));
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Product chageDeleted(String id, Integer isDeleted) {
        try {
            Product product = productRepository.findById(id).orElseThrow();
            product.setDeleted(Status.values()[isDeleted]);
            return productRepository.save(product);
        } catch (Exception e) {
            return null;
        }
    }
}
