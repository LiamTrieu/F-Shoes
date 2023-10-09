package com.fshoes.core.admin.sell.service;

import com.fshoes.core.admin.sell.model.request.AdCustomerRequest;
import com.fshoes.core.admin.sell.model.request.AddBillRequest;
import com.fshoes.core.admin.sell.model.request.CreateBillRequest;
import com.fshoes.core.admin.sell.model.request.FilterProductDetailRequest;
import com.fshoes.core.admin.sell.model.response.CartDetailResponse;
import com.fshoes.core.admin.sell.model.response.GetALlCustomerResponse;
import com.fshoes.core.admin.sell.model.response.GetAllProductResponse;
import com.fshoes.core.admin.sell.model.response.GetAmountProductResponse;
import com.fshoes.core.admin.sell.model.response.GetColorResponse;
import com.fshoes.core.admin.sell.model.response.GetProductDetailBillSellResponse;
import com.fshoes.core.admin.sell.model.response.GetSizeResponse;
import com.fshoes.core.common.PageReponse;
import com.fshoes.entity.Bill;
import com.fshoes.entity.BillDetail;
import com.fshoes.entity.Cart;

import java.util.List;

public interface AdminSellService {

    List<Bill> getAllBillTaoDonHang();

    List<GetAllProductResponse> getAllProduct(FilterProductDetailRequest request);
    List<GetAllProductResponse> getAllProductCart();

    PageReponse<GetALlCustomerResponse> getAllCustomer(AdCustomerRequest request);

    List<GetProductDetailBillSellResponse> getProductDetailBillSell(String id);

    Bill createBill();


    Boolean deleteBill(String id);

    Bill addBill(AddBillRequest request, String id);

    BillDetail addBillDetail(CreateBillRequest request, String id);

    List<Cart> getAllCart();

    List<CartDetailResponse> getCartDetail();

    List<GetSizeResponse> getListSize();
    List<GetColorResponse> getListColor();

    GetAmountProductResponse getAmount(String id);

    Boolean updateQuantityProductDetail(String idPrDetail, Integer quantity);

    Boolean rollBackQuantityProductDetail(String idBill, String idPrDetail);
}
