package com.fshoes.core.admin.sell.service.impl;

import com.fshoes.core.admin.sell.model.request.AdCustomerRequest;
import com.fshoes.core.admin.sell.model.request.CreateCartRequest;
import com.fshoes.core.admin.sell.model.request.FilterProductDetailRequest;
import com.fshoes.core.admin.sell.model.response.CartDetailResponse;
import com.fshoes.core.admin.sell.model.response.GetALlCustomerResponse;
import com.fshoes.core.admin.sell.model.response.GetAllProductResponse;
import com.fshoes.core.admin.sell.repository.AdminSellGetCustomerRepository;
import com.fshoes.core.admin.sell.repository.AdminSellGetProductRepository;
import com.fshoes.core.admin.sell.repository.AdminCreateCartRepository;
import com.fshoes.core.admin.sell.service.AdminSellService;
import com.fshoes.core.common.PageReponse;
import com.fshoes.entity.Cart;
import com.fshoes.entity.CartDetail;
import com.fshoes.entity.ProductDetail;
import com.fshoes.repository.CartDetailRepository;
import com.fshoes.repository.ProductDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminSellServiceImpl implements AdminSellService {

    @Autowired
    private AdminSellGetProductRepository getProductRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private AdminSellGetCustomerRepository getCustomerRepository;
    @Autowired
    private AdminCreateCartRepository cartRepository;

    @Autowired
    private CartDetailRepository cartDetailRepository;
    @Override
    public PageReponse<GetALlCustomerResponse> getAllCustomer(AdCustomerRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        return new PageReponse<>(getCustomerRepository.FindKhachHang(pageable, request));
    }

    @Override
    public Cart createCart() {
        return cartRepository.save(new Cart());
    }
    @Override
    public Boolean deleteCart(String id) {
        try {
            Cart cart = cartRepository.findById(id).get();
             cartRepository.delete(cart);
             return true;
        }catch (Exception e) {
            return null;
        }
    }

    @Override
    public CartDetail addCartDetail(CreateCartRequest request) {
        ProductDetail productDetail = productDetailRepository.findById(request.getProductDetailId()).orElse(null);
        Cart cart = cartRepository.findById(request.getCartId()).orElse(null);
        CartDetail cartDetail = new CartDetail();
        cartDetail.setQuantity(request.getQuantity());
        cartDetail.setProductDetail(productDetail);
        cartDetail.setCart(cart);
        return cartDetailRepository.save(cartDetail);
    }

    @Override
    public List<Cart> getAllCart() {
        return cartRepository.getAllCarrt();
    }

    @Override
    public List<CartDetailResponse> getCartDetail() {
        return null;
    }

    @Override
    public List<GetAllProductResponse> getAllProduct(FilterProductDetailRequest request) {
        return getProductRepository.getAllProduct(request);
    }

    @Override
    public List<GetAllProductResponse> getAllProductCart() {
        return getProductRepository.getAllProductCart();
    }

}
