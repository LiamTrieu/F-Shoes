package com.fshoes.core.admin.khuyenmai.repository;

import com.fshoes.core.admin.khuyenmai.model.request.GetProductDetailByIdProduct;
import com.fshoes.core.admin.khuyenmai.model.request.ProductPromotionRequest;
import com.fshoes.core.admin.khuyenmai.model.request.ProductPromotionSearch;
import com.fshoes.core.admin.khuyenmai.model.respone.AddProductPromotionResponse;
import com.fshoes.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductPromotionAddRepository extends ProductRepository {
    @Query(value = """
            select  p.id, p.name, pd.amount, c.name as category, pd.id as productDetail,
                b.name as brand
                from product p
                join product_detail pd
                on p.id = pd.id_product
                join category c on pd.id_category = c.id
                join brand b on pd.id_brand = b.id where (:#{#req.nameProduct} IS NULL OR p.name like %:#{#req.nameProduct}%)
                  group by p.id, p.name, c.name , 
                b.name , pd.amount, pd.id
                """, nativeQuery = true)
    Page<AddProductPromotionResponse> getAllProductDetail(@Param("req") ProductPromotionSearch req, Pageable pageable);

    @Query(value = """
            select  p.id, p.name
                from product p
               order by p.name, p.id
                """, nativeQuery = true)
    Page<AddProductPromotionResponse> getAllProduct(@Param("req") ProductPromotionSearch req, Pageable pageable);

    @Query(value = """
        SELECT c.name AS category, b.name AS brand, p.name, pd.id as productDetail , p.id 
        FROM product_detail pd 
        JOIN product p ON pd.id_product = p.id 
        JOIN category c ON pd.id_category = c.id 
        JOIN brand b ON pd.id_brand = b.id 
        WHERE p.id  = :id ;
        """, nativeQuery = true)
    Page<AddProductPromotionResponse> getProductDetailByIdProduct(@Param("id") String id, Pageable pageable);
}
