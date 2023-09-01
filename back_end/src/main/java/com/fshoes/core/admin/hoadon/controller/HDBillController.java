package com.fshoes.core.admin.hoadon.controller;

import com.fshoes.core.admin.hoadon.model.request.HDBillRequest;
import com.fshoes.core.admin.hoadon.model.respone.HDBillResponse;
import com.fshoes.core.admin.hoadon.service.HDBillService;
import com.fshoes.entity.Bill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @GetMapping("/get-all-page")
    public Page<HDBillResponse> getAllBill(@RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo) {
        return hdBillService.getAllBill(pageNo);
    }

    @GetMapping("/get-all-orderBy-totalMoney")
    public Page<HDBillResponse> getAllBillOrderByTotalMoney(@RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo) {
        return hdBillService.getAllBillOrderByTotalMoney(pageNo);
    }

    @GetMapping("/search-by-inputText")
    public Page<HDBillResponse> searchBillByInputText(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "inputSearch", defaultValue = " ") String inputSearch
    ) {
        return hdBillService.searchBillByInputText(pageNo, inputSearch);
    }

    @GetMapping("/get-by-type")
    public Page<HDBillResponse> getBillByType(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "type") Boolean type
    ) {
        return hdBillService.getBillByType(pageNo, type);
    }

    @GetMapping("/get-by-status")
    public Page<HDBillResponse> getBillByStatus(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "status") Integer status
    ) {
        return hdBillService.getBillByStatus(pageNo, status);
    }

    @GetMapping("/get-by-dateRange")
    public Page<HDBillResponse> getBillByDateRange(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "startDate") String startDate,
            @RequestParam(value = "endDate") String endDate
    ) throws ParseException {
        return hdBillService.getBillByDateRange(pageNo, startDate, endDate);
    }

    @GetMapping("/get-by-totalMoneyRange")
    public Page<HDBillResponse> getBillByTotalMoneyRange(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "minTotalMoney") BigDecimal minTotalMoney,
            @RequestParam(value = "maxTotalMoney") BigDecimal maxTotalMoney
    ) throws ParseException {
        return hdBillService.getBillByTotalMoneyRange(pageNo, minTotalMoney, maxTotalMoney);
    }

    @GetMapping("/get-by-status-and-dateRange")
    public Page<HDBillResponse> getBillByStatusAndDateRange(
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "status") Integer status,
            @RequestParam(value = "startDate") String startDate,
            @RequestParam(value = "endDate") String endDate
    ) throws ParseException {
        return hdBillService.getBillByStatusAndDateRange(pageNo, status, startDate, endDate);
    }

    @PostMapping("/create-bill")
    public Bill createBill() {
        return hdBillService.createBill();
    }

    @PutMapping("/update/{id}")
    public Bill updateBill(@PathVariable("id") Integer idBill,
                           @RequestBody HDBillRequest hdBillRequest) {
        return hdBillService.updateBill(idBill, hdBillRequest);
    }

    @PutMapping("/cancel/{id}")
    public Bill cancel(@PathVariable("id") Integer idBill,
                       @RequestBody HDBillRequest hdBillRequest) {
        return hdBillService.cancelOrder(idBill, hdBillRequest);
    }

    @GetMapping("/get-one/{id}")
    public Bill getOne(@PathVariable("id") Integer id) {
        return hdBillService.getOne(id);
    }

}
