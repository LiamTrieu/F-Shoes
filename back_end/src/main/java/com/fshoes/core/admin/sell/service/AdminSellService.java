package com.fshoes.core.admin.sell.service;

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
import com.fshoes.core.common.PageReponse;
import com.fshoes.entity.Cart;
import com.fshoes.entity.CartDetail;
import com.fshoes.entity.ProductDetail;

import java.util.List;

public interface AdminSellService {

    List<GetAllProductResponse> getAllProduct(FilterProductDetailRequest request);
    List<GetAllProductResponse> getAllProductCart();

    PageReponse<GetALlCustomerResponse> getAllCustomer(AdCustomerRequest request);

    List<GetProductDetailCartSellResponse> getProductDetailCartSell(String id);
    Cart createCart();

    Boolean deleteCart(String id);

    CartDetail addCartDetail(CreateCartRequest request);

    List<Cart> getAllCart();

    List<CartDetailResponse> getCartDetail();

    List<GetSizeResponse> getListSize();
    List<GetColorResponse> getListColor();

    GetAmountProductResponse getAmount(String id);
}
