package com.fshoes.core.admin.sell.service;

import com.fshoes.core.admin.sell.model.request.AdCustomerRequest;
import com.fshoes.core.admin.sell.model.request.CreateCartRequest;
import com.fshoes.core.admin.sell.model.request.FilterProductDetailRequest;
import com.fshoes.core.admin.sell.model.response.GetALlCustomerResponse;
import com.fshoes.core.admin.sell.model.response.GetAllProductResponse;
import com.fshoes.core.common.PageReponse;
import com.fshoes.entity.Cart;
import com.fshoes.entity.CartDetail;

import java.util.List;

public interface AdminSellService {

    List<GetAllProductResponse> getAllProduct(FilterProductDetailRequest request);
    List<GetAllProductResponse> getAllProductCart();

    PageReponse<GetALlCustomerResponse> getAllCustomer(AdCustomerRequest request);

    Cart createCart(Cart cart);

    CartDetail addCartDetail(CreateCartRequest request);

    List<Cart> getAllCart();
}
