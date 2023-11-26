package com.fshoes.core.client.repository;

import com.fshoes.core.client.model.response.ClientPromotionResponse;
import com.fshoes.repository.PromotionRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CLientPromotionRepository extends PromotionRepository {

    @Query(value = """
                    select p.id , p.status, p.value , pd.id as idProductDetail , pd.price as  price from promotion p join product_promotion pp 
                    on p.id = pp.id_promotion join product_detail pd on pd.id = pp.id_product_detail where pd.id in :idProductDetail
            """, nativeQuery = true)
    List<ClientPromotionResponse> getPromotionByProductDetail(List<String> idProductDetail);
}
