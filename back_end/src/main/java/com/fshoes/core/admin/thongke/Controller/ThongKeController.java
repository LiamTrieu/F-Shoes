package com.fshoes.core.admin.thongke.Controller;

import com.fshoes.core.admin.thongke.Modal.request.GetListProductMountRequest;
import com.fshoes.core.admin.thongke.Modal.request.ThongKeRequest;
import com.fshoes.core.admin.thongke.Service.ThongKeService;
import com.fshoes.core.common.ObjectRespone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/api/admin/statistical")
public class ThongKeController {

    @Autowired
    private ThongKeService thongKeService;

    @GetMapping("/get-product-in-mounth")
    public ObjectRespone getProductInMounth(GetListProductMountRequest request) {
        return new ObjectRespone(thongKeService.getProduct(request));
    }

    @GetMapping("/doanh-thu")
    public ObjectRespone getDoanhThu() {
        return new ObjectRespone(thongKeService.getDoanhThu());
    }

    @GetMapping("/view/thong-ke-don-hang")
    public ObjectRespone getThongKeDonHang(@ModelAttribute ThongKeRequest request) throws ParseException {
        return new ObjectRespone(thongKeService.getThongKeDonHang(request));
    }

    @GetMapping("/view/thong-ke-tong-tien")
    public ObjectRespone getThongKeTongTien(@ModelAttribute ThongKeRequest request) throws ParseException {
        return new ObjectRespone(thongKeService.getThongTongTien(request));
    }
}
