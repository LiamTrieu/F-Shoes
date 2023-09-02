package com.fshoes.core.admin.hoadon.controller;

import com.fshoes.core.admin.hoadon.model.request.HDBillRequest;
import com.fshoes.core.admin.hoadon.service.HDBillService;
import com.fshoes.core.common.ObjectRespone;
import com.fshoes.core.common.PageReponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.text.ParseException;

@RestController
@RequestMapping("/api/bill")
@CrossOrigin("*")
public class HDBillController {

    @Autowired
    private HDBillService hdBillService;

    @GetMapping("/get-page")
    public PageReponse getAllBill(@RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo) {
        return new PageReponse<>(hdBillService.getAllBill(pageNo));
    }

    @GetMapping("/get-all-orderBy-totalMoney")
    public PageReponse getAllBillOrderByTotalMoney(@RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo) {
        return new PageReponse<>(hdBillService.getAllBillOrderByTotalMoney(pageNo));
    }

    @GetMapping("/search-by-inputText")
    public PageReponse searchBillByInputText(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "inputSearch", defaultValue = " ") String inputSearch
    ) {
        return new PageReponse<>(hdBillService.searchBillByInputText(pageNo, inputSearch));
    }

    @GetMapping("/get-by-type")
    public PageReponse getBillByType(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "type") String type
    ) {
        return new PageReponse<>(hdBillService.getBillByType(pageNo, type));
    }

    @GetMapping("/get-by-status")
    public PageReponse getBillByStatus(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "status") Integer status
    ) {
        return new PageReponse<>(hdBillService.getBillByStatus(pageNo, status));
    }

    @GetMapping("/get-by-dateRange")
    public PageReponse getBillByDateRange(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "startDate") String startDate,
            @RequestParam(value = "endDate") String endDate
    ) throws ParseException {
        return new PageReponse<>(hdBillService.getBillByDateRange(pageNo, startDate, endDate));
    }

    @GetMapping("/get-by-totalMoneyRange")
    public PageReponse getBillByTotalMoneyRange(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "minTotalMoney") BigDecimal minTotalMoney,
            @RequestParam(value = "maxTotalMoney") BigDecimal maxTotalMoney
    ) throws ParseException {
        return new PageReponse<>(hdBillService.getBillByTotalMoneyRange(pageNo, minTotalMoney, maxTotalMoney));
    }

    @GetMapping("/get-by-status-and-dateRange")
    public PageReponse getBillByStatusAndDateRange(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "status") Integer status,
            @RequestParam(value = "startDate") String startDate,
            @RequestParam(value = "endDate") String endDate
    ) throws ParseException {
        return new PageReponse<>(hdBillService.getBillByStatusAndDateRange(pageNo, status, startDate, endDate));
    }

    @PostMapping("/create-bill")
    public ObjectRespone createBill() {
        return new ObjectRespone(hdBillService.createBill());
    }

    @PutMapping("/update/{id}")
    public ObjectRespone updateBill(@PathVariable("id") Integer idBill,
                                    @RequestBody HDBillRequest hdBillRequest) {
        return new ObjectRespone(hdBillService.updateBill(idBill, hdBillRequest));
    }

    @PutMapping("/cancel/{id}")
    public ObjectRespone cancel(@PathVariable("id") Integer idBill,
                                @RequestBody HDBillRequest hdBillRequest) {
        return new ObjectRespone(hdBillService.cancelOrder(idBill, hdBillRequest));
    }

    @GetMapping("/get/{id}")
    public ObjectRespone getOne(@PathVariable("id") Integer id) {
        return new ObjectRespone(hdBillService.getOne(id));
    }

}
