package com.fshoes.core.admin.hoadon.repository;

import com.fshoes.core.admin.hoadon.model.respone.HDBillDetailResponse;
import com.fshoes.entity.BillDetail;
import com.fshoes.repository.BillDetailRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HDBillDetailRepository extends BillDetailRepository {

    @Query(value = """
                      SELECT bd.id, MIN(i.url) as productImg,
                              CONCAT(p.name, ' ', c.name) as productName,
                              bd.price, pd.price as productPrice, s.size as size, bd.quantity, pd.id as productDetailId,
                              bd.status as status
                       FROM bill_detail bd
                       	LEFT JOIN product_detail pd ON bd.id_product_detail = pd.id
                           LEFT JOIN image i ON pd.id = i.id_product_detail
                           LEFT JOIN product p ON pd.id_product = p.id
                           LEFT JOIN size s ON pd.id_size = s.id
                           LEFT JOIN bill b ON bd.id_bill = b.id
                           LEFT JOIN color c ON pd.id_color = c.id
                       WHERE b.id = :idBill
                       GROUP BY bd.id, p.name, c.name, bd.price, pd.price, s.size, pd.id, bd.status;            """, nativeQuery = true)
    List<HDBillDetailResponse> getBillDetailsByBillId(@Param("idBill") String idBill);


    @Query(value = """
            SELECT bd.id, MIN(i.url) as productImg,
                   CONCAT(p.name, ' ', c.name) as productName,
                   bd.price, pd.price as productPrice, s.size as size, bd.quantity, pd.id as productDetailId,
                   bd.status as status
            FROM bill_detail bd
                LEFT JOIN product_detail pd ON bd.id_product_detail = pd.id
                LEFT JOIN image i ON pd.id = i.id_product_detail
                LEFT JOIN product p ON pd.id_product = p.id
                LEFT JOIN size s ON pd.id_size = s.id
                LEFT JOIN bill b ON bd.id_bill = b.id
                LEFT JOIN color c ON pd.id_color = c.id
            WHERE b.id = :idBill AND bd.status = :status
            GROUP BY bd.id, p.name, c.name, bd.price, pd.price, s.size, pd.id, bd.status;
            
            """, nativeQuery = true)
    List<HDBillDetailResponse> getBillDetailsByBillIdAndStatus(@Param("idBill") String idBill, @Param(("status")) Integer status);

    BillDetail getBillDetailByBillIdAndProductDetailId(String idBill, String idProductDetail);

    @Transactional
    @Modifying
    @Query(value = """
            DELETE FROM bill_detail bd WHERE id_bill = :billId
            """, nativeQuery = true)
    void deleteByBillId(@Param("billId") String billId);

}
