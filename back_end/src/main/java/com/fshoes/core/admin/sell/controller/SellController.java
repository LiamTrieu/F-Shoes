package com.fshoes.core.admin.sell.controller;

import com.fshoes.core.admin.sell.model.request.AdCustomerRequest;
import com.fshoes.core.admin.sell.model.request.AddBillRequest;
import com.fshoes.core.admin.sell.model.request.CreateBillRequest;
import com.fshoes.core.admin.sell.model.request.FilterProductDetailRequest;
import com.fshoes.core.admin.sell.service.AdminSellService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sell")
public class SellController {

    @Autowired
    private AdminSellService getSell;

    @GetMapping("/get-all-bill-tao-don-hang")
    public ObjectRespone getAllBillTaoDonHang() {
        return new ObjectRespone(getSell.getAllBillTaoDonHang());
    }

    @GetMapping("/getProduct")
    public ObjectRespone getAllProduct(FilterProductDetailRequest request) {
        return new ObjectRespone(getSell.getAllProduct(request));
    }

    @GetMapping("/get-size")
    public ObjectRespone getAllSize() {
        return new ObjectRespone(getSell.getListSize());
    }

    @GetMapping("/get-color")
    public ObjectRespone getAllColor() {
        return new ObjectRespone(getSell.getListColor());
    }

    @GetMapping("/get-amount/{id}")
    public ObjectRespone getAmount(@PathVariable String id) {
        return new ObjectRespone(getSell.getAmount(id));
    }

    @GetMapping("/get-product-detail-bill/{id}")
    public ObjectRespone getAllProductDetailBill(@PathVariable String id) {
        return new ObjectRespone(getSell.getProductDetailBillSell(id));
    }

    @PostMapping("/create-bill")
    public ObjectRespone createBillSell() {
        return new ObjectRespone(getSell.createBill());
    }

    @DeleteMapping("/delete-bill/{id}")
    public ObjectRespone deleteBillSell(@PathVariable String id) {
        return new ObjectRespone(getSell.deleteBill(id));
    }

    @GetMapping("/get-product-cart")
    public ObjectRespone getAllProductCart() {
        return new ObjectRespone(getSell.getAllProductCart());
    }

    @GetMapping("/getCustomer")
    public ObjectRespone getAllCustomer(AdCustomerRequest request) {

        return new ObjectRespone(getSell.getAllCustomer(request));
    }

    @GetMapping("/get-cart")
    public ObjectRespone getAllCart() {
        return new ObjectRespone(getSell.getAllCart());
    }

    @GetMapping("/get-cart-detail/{idCart}")
    public ObjectRespone getCartDetail(@PathVariable String idCart) {
        return new ObjectRespone(getSell.getCartDetail());
    }

    @PostMapping("/add-product-sell/{id}")
    public ObjectRespone addProductSell(@RequestBody CreateBillRequest request, @PathVariable String id) {
        return new ObjectRespone(getSell.addBillDetail(request, id));
    }

    @PutMapping("/add-bill/{id}")
    public ObjectRespone addBill(@RequestBody AddBillRequest request, @PathVariable String id) {
        return new ObjectRespone(getSell.addBill(request, id));
    }

    @PutMapping("/update-quantity-product-detail/{id}")
    public ObjectRespone updateQuantityProductDetail(@PathVariable String id, @RequestParam("quantity") Integer quantity) {
        return new ObjectRespone(getSell.updateQuantityProductDetail(id, quantity));
    }

    @PutMapping("/roll-back-quantity-product-detail")
    public ObjectRespone rollBackQuantityProductDetail(@RequestParam("idBill") String idBill, @RequestParam("idPrDetail") String idPrDetail) {
        return new ObjectRespone(getSell.rollBackQuantityProductDetail(idBill, idPrDetail));
    }

    @DeleteMapping("/delete-product-detail-by-bill")
    public ObjectRespone deleteProductDetailByBill(@RequestParam("idBill") String idBill, @RequestParam("idPrDetail") List<String> idPrDetail) {
        return new ObjectRespone(getSell.deleteProductsDetail(idBill, idPrDetail));
    }


    @PutMapping("/input-quantity-bill-detail")
    public ObjectRespone inputQuantityBillDetail(@RequestParam("idBillDetail")String idBillDetail, @RequestParam("idPrDetail") String idPrDetail, @RequestParam("quantity") Integer quantity){
        return new ObjectRespone(getSell.inputQuantityBillDetail(idBillDetail, idPrDetail, quantity));
    }

    @PutMapping("/increase-quantity-bill-detail")
    public ObjectRespone increaseQuantityBillDetail(@RequestParam("idBillDetail")String idBillDetail, @RequestParam("idPrDetail") String idPrDetail){
        return new ObjectRespone(getSell.increaseQuantityBillDetail(idBillDetail, idPrDetail));
    }

    @PutMapping("/decrease-quantity-bill-detail")
    public ObjectRespone decreaseQuantityBillDetail(@RequestParam("idBillDetail")String idBillDetail, @RequestParam("idPrDetail") String idPrDetail){
        return new ObjectRespone(getSell.decreaseQuantityBillDetail(idBillDetail, idPrDetail));
    }

    @GetMapping("/max-price")
    public ObjectRespone nameById() {
        return new ObjectRespone(getSell.getMaxPriceProductId());
    }
}
