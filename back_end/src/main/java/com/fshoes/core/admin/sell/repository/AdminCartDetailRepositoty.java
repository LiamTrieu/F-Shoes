package com.fshoes.core.admin.sell.repository;

import com.fshoes.entity.CartDetail;
import com.fshoes.repository.CartDetailRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminCartDetailRepositoty extends CartDetailRepository {

    @Query(value = """
    select * from cart_detail cd where cd.id_product_detail = :productDetailId and cd.id_cart = :cartId
""",nativeQuery = true)
    CartDetail findByProductIdAndCartId(String productDetailId, String cartId);
}
