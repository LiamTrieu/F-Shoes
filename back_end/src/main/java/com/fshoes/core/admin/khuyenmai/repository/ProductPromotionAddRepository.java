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
            SELECT cate.name AS category, b.name AS brand, p.name, pd.id as productDetail , p.id , MAX(i.url) as url,
            sl.name as sole , c.name as color, m.name as material 
            FROM product_detail pd 
            left JOIN product p ON pd.id_product = p.id 
            left join material m on m.id = pd.id_material
            left join category cate on cate.id = pd.id_category
            left join sole sl on sl.id = pd.id_sole
            left join brand b on b.id  = pd.id_brand
            left join color c on c.id = pd.id_color
            left join image i on i.id_product_detail = pd.id
            WHERE p.id In :id
            AND  (:#{#req.category} IS NULL OR cate.id = :#{#req.category}) 
            AND (:#{#req.color} IS NULL OR c.id = :#{#req.color}) 
            AND (:#{#req.material} IS NULL OR m.id = :#{#req.material}) 
            AND (:#{#req.brand} IS NULL OR b.id = :#{#req.brand}) 
            AND (:#{#req.sole} IS NULL OR sl.id = :#{#req.sole})  
            AND( (:#{#req.nameProduct} IS NULL OR p.name like %:#{#req.nameProduct}%) 
                OR (:#{#req.nameProduct} IS NULL OR cate.name like %:#{#req.nameProduct}%) 
                OR (:#{#req.nameProduct} IS NULL OR c.name like %:#{#req.nameProduct}%) 
                OR (:#{#req.nameProduct} IS NULL OR sl.name like %:#{#req.nameProduct}%) 
                OR (:#{#req.nameProduct} IS NULL OR m.name like %:#{#req.nameProduct}%))   
            group by p.id,  pd.id;;
            """, nativeQuery = true)
    Page<AddProductPromotionResponse> getProductDetailByIdProduct(@Param("id") List<String> id, Pageable pageable,@Param("req") GetProductDetailByIdProduct req);
}
