package com.fshoes.core.admin.sell.repository;

import com.fshoes.core.admin.sell.model.response.GetAllProductResponse;
import com.fshoes.repository.ProductRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminSellGetProductRepository extends ProductRepository {

    @Query(value = """
              SELECT p.id,  p.name, pd.price, s.size, i.url, pd.amount  FROM product p inner join product_detail pd
                        on p.id = pd.id_product inner join size s
                        on s.id = pd.id_size inner join image i on i.id_product_detail = pd.id  ;
            """, nativeQuery = true)
    List<GetAllProductResponse> getAllProduct();

}
