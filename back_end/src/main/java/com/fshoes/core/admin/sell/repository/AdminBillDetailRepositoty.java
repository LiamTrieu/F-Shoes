package com.fshoes.core.admin.sell.repository;

import com.fshoes.entity.BillDetail;
import com.fshoes.repository.BillDetailRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminBillDetailRepositoty extends BillDetailRepository {

    @Query(value = """
                select * from bill_detail bd where bd.id_product_detail = :productDetailId and bd.id_bill = :billId
            """, nativeQuery = true)
    BillDetail findByProductIdAndBillId(String productDetailId, String billId);


    @Query(value = """
              select id from bill_detail where id_bill = ?
            """, nativeQuery = true)
    List<String> findByBillId(String billId);

    @Query(value = """
              select id_product_detail from bill_detail where id_bill = ?
            """, nativeQuery = true)
    List<String> findByProductDetailBYBillId(String billId);
}
