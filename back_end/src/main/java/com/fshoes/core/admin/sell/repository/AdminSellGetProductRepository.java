package com.fshoes.core.admin.sell.repository;

import com.fshoes.core.admin.sell.model.request.FilterProductDetailRequest;
import com.fshoes.core.admin.sell.model.response.GetAllProductResponse;
import com.fshoes.repository.ProductRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminSellGetProductRepository extends ProductRepository {

    @Query(value = """
             		SELECT  p.id, pr.id as promotion,pr.value, p.name, pd.price,pd.weight, s.size, i.url, pd.amount,pd.id as productDetailId,
                                                 m.name as material, sl.name as sole,b.name as brand,c.name as color ,
                                                 pd.code , cate.name as category
             									FROM product p inner join product_detail pd
                                                  on p.id = pd.id_product inner join size s
                                                  on s.id = pd.id_size
                                                  inner join material m on m.id = pd.id_material
                                                  inner join category cate on cate.id = pd.id_category
                                                  inner join sole sl on sl.id = pd.id_sole
                                                  inner join brand b on b.id  = pd.id_brand
                                                  inner join color c on c.id = pd.id_color
                                                  inner join image i on i.id_product_detail = pd.id
                                                  inner join product_promotion pp on pd.id = pp.id_product_detail
                                                  inner join promotion pr on pr.id = pp.id_promotion
                                                  where (:#{#req.category} IS NULL OR cate.id = :#{#req.category}) 
                                                  AND (:#{#req.color} IS NULL OR c.id = :#{#req.color}) 
                                                  AND (:#{#req.material} IS NULL OR m.id = :#{#req.material}) 
                                                  AND (:#{#req.size} IS NULL OR s.id = :#{#req.size}) 
                                                  AND (:#{#req.brand} IS NULL OR b.id = :#{#req.brand}) 
                                                  AND (:#{#req.sole} IS NULL OR sl.id = :#{#req.sole}) 
                                                  AND (:#{#req.codeProductDetail} IS NULL OR pd.code = :#{#req.codeProductDetail}) 
                                                  AND (:#{#req.nameProductDetail} IS NULL OR p.name like %:#{#req.nameProductDetail}%) ;
            """, nativeQuery = true)
    List<GetAllProductResponse> getAllProduct(@Param("req") FilterProductDetailRequest req);

    @Query(value = """
             		SELECT p.id, pr.id as promotion,pr.value, p.name, pd.price, s.size, i.url, pd.amount
             									FROM product p inner join product_detail pd
                                                  on p.id = pd.id_product inner join size s
                                                  on s.id = pd.id_size
                                                  inner join image i on i.id_product_detail = pd.id
                                                  inner join product_promotion pp on pd.id = pp.id_product_detail
                                                  inner join promotion pr on pr.id = pp.id_promotion
                                                  
            """, nativeQuery = true)
    List<GetAllProductResponse> getAllProductCart();




}
