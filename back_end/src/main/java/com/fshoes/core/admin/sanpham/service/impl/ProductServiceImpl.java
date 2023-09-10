package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.model.request.ProductRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductResponse;
import com.fshoes.core.admin.sanpham.repository.SpProductRepository;
import com.fshoes.core.admin.sanpham.service.ProductService;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Product;
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
    public ProductResponse getById(int id) {
        return productRepository.getById(id).orElse(null);
    }

    @Override
    public Page<ProductResponse> getPage(PageableRequest pageReq, String textSearch) {
        Sort sort = Sort.by("id").reverse();
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
    public Product updateProduct(ProductRequest productReq, int id) {
        try {
            Product product = productRepository.findById(id).orElseThrow();
            return productRepository.save(productReq.tranProduct(product));
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Product chageDeleted(int id, boolean isDeleted) {
        try {
            Product product = productRepository.findById(id).orElseThrow();
            product.setDeleted(isDeleted);
            return productRepository.save(product);
        } catch (Exception e) {
            return null;
        }
    }
}
