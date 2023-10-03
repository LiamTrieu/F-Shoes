package com.fshoes.core.admin.sell.service.impl;

import com.fshoes.core.admin.sell.model.request.AdCustomerRequest;
import com.fshoes.core.admin.sell.model.request.CreateCartRequest;
import com.fshoes.core.admin.sell.model.request.FilterProductDetailRequest;
import com.fshoes.core.admin.sell.model.response.CartDetailResponse;
import com.fshoes.core.admin.sell.model.response.GetALlCustomerResponse;
import com.fshoes.core.admin.sell.model.response.GetAllProductResponse;
import com.fshoes.core.admin.sell.model.response.GetAmountProductResponse;
import com.fshoes.core.admin.sell.model.response.GetColorResponse;
import com.fshoes.core.admin.sell.model.response.GetProductDetailCartSellResponse;
import com.fshoes.core.admin.sell.model.response.GetSizeResponse;
import com.fshoes.core.admin.sell.repository.AdminCartDetailRepositoty;
import com.fshoes.core.admin.sell.repository.AdminProductDetailRepository;
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
    private AdminCartDetailRepositoty cartDetailRepository;

    @Autowired
    private AdminProductDetailRepository getProduct;
    @Override
    public PageReponse<GetALlCustomerResponse> getAllCustomer(AdCustomerRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        return new PageReponse<>(getCustomerRepository.FindKhachHang(pageable, request));
    }

    @Override
    public List<GetProductDetailCartSellResponse> getProductDetailCartSell(String id) {
        return getProduct.getlistProductCarlSell(id);
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
        CartDetail existingCartDetail = cartDetailRepository.findByProductIdAndCartId(
                request.getProductDetailId(),
                request.getCartId()
        );

        if(existingCartDetail != null){
            int newQuantity = existingCartDetail.getQuantity() + request.getQuantity();
            existingCartDetail.setQuantity(newQuantity);
            return cartDetailRepository.save(existingCartDetail);
        }else {
            ProductDetail productDetail = productDetailRepository.findById(request.getProductDetailId()).orElse(null);
            Cart cart = cartRepository.findById(request.getCartId()).orElse(null);
            CartDetail cartDetail = new CartDetail();
            cartDetail.setQuantity(request.getQuantity());
            cartDetail.setProductDetail(productDetail);
            cartDetail.setCart(cart);
            return cartDetailRepository.save(cartDetail);
        }




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
    public List<GetSizeResponse> getListSize() {
        return getProduct.getlistSize();
    }

    @Override
    public List<GetColorResponse> getListColor() {
        return getProduct.getlistColor();
    }

    @Override
    public GetAmountProductResponse getAmount(String id) {
        return getProduct.getAmount(id);
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
