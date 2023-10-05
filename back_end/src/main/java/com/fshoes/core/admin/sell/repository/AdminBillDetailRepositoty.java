package com.fshoes.core.admin.sell.repository;

import com.fshoes.entity.BillDetail;
import com.fshoes.entity.CartDetail;
import com.fshoes.repository.BillDetailRepository;
import com.fshoes.repository.CartDetailRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminBillDetailRepositoty extends BillDetailRepository {

    @Query(value = """
    select * from bill_detail bd where bd.id_product_detail = :productDetailId and bd.id_bill = :billId
""",nativeQuery = true)
    BillDetail findByProductIdAndBillId(String productDetailId, String billId);
}
