package com.fshoes.core.admin.khuyenmai.repository;

import com.fshoes.core.admin.khuyenmai.model.request.ProductPromotionRequest;
import com.fshoes.core.admin.khuyenmai.model.respone.AddProductPromotionResponse;
import com.fshoes.repository.ProductRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductPromotionAddRepository extends ProductRepository {
    @Query(value = """
            select p.id, p.name, c.name as category,
                b.name as brand
                from product p
                join product_detail pd
                on p.id = pd.id_product
                join category c on pd.id_category = c.id
                join brand b on pd.id_brand = b.id 
                  group by p.name, c.name, b.name, p.id
                """, nativeQuery = true)
    List<AddProductPromotionResponse> getAllProduct( );
}
