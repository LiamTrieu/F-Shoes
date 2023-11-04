package com.fshoes.core.client.repository;

import com.fshoes.core.client.model.request.ClientProductDetailRequest;
import com.fshoes.core.client.model.request.ClientProductRequest;
import com.fshoes.core.client.model.response.ClientProductDetailResponse;
import com.fshoes.core.client.model.response.ClientProductResponse;
import com.fshoes.repository.ProductDetailRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientProductDetailRepository extends ProductDetailRepository {
    @Query(value = """
                SELECT MAX(pd.id) as id,
                MAX( pr.id) as promotion ,MAX(pr.value) as value,
                       CONCAT(p.name, ' - ', c.name, ' - ', m.name, ' - ', s.name, ' - ', ca.name, ' - ', b.name) AS name,
                       MAX(pd.price) as price,
                       MAX(pd.weight) as weight,
                       MAX(pd.amount) as amount,
                       MAX(pd.description) as description,
                       GROUP_CONCAT(DISTINCT i.url) as image,
                       pd.id_product,
                       pd.id_color,
                       pd.id_material,
                       pd.id_sole,
                       pd.id_category,
                       pd.id_brand
                FROM product_detail pd
                         JOIN
                     product p ON p.id = pd.id_product
                         JOIN
                     color c ON c.id = pd.id_color
                         JOIN
                     category ca ON ca.id = pd.id_category
                         JOIN
                     brand b ON b.id = pd.id_brand
                         JOIN
                     sole s ON s.id = pd.id_sole
                         JOIN
                     material m ON m.id = pd.id_material
                         LEFT JOIN
                     image i ON pd.id = i.id_product_detail
                     LEFT JOIN product_promotion pp ON pd.id = pp.id_product_detail
                         LEFT JOIN promotion pr ON pr.id = pp.id_promotion
                WHERE (:#{#request.id} is null or pd.id = :#{#request.id}) 
                AND (:#{#request.category} IS NULL OR ca.id = :#{#request.category}) 
                AND (:#{#request.color} IS NULL OR c.id = :#{#request.color}) 
                AND (:#{#request.material} IS NULL OR m.id = :#{#request.material}) 
                AND (:#{#request.brand} IS NULL OR b.id = :#{#request.brand}) 
                AND (:#{#request.sole} IS NULL OR s.id = :#{#request.sole}) 
                AND( (:#{#request.nameProductDetail} IS NULL OR p.name like %:#{#request.nameProductDetail}%) 
                OR (:#{#request.nameProductDetail} IS NULL OR ca.name like %:#{#request.nameProductDetail}%) 
                OR (:#{#request.nameProductDetail} IS NULL OR c.name like %:#{#request.nameProductDetail}%) 
                OR (:#{#request.nameProductDetail} IS NULL OR s.name like %:#{#request.nameProductDetail}%) 
                OR (:#{#request.nameProductDetail} IS NULL OR m.name like %:#{#request.nameProductDetail}%)) 
                GROUP BY pd.id_product, pd.id_color, pd.id_material, pd.id_sole, pd.id_category, pd.id_brand
            """, nativeQuery = true)
    List<ClientProductResponse> getProducts( @Param("request") ClientProductRequest request);

    @Query(value = """
                SELECT pd.id as id,
                       si.size as size
                FROM product_detail pd
                         JOIN
                     product p ON p.id = pd.id_product
                         JOIN
                     color c ON c.id = pd.id_color
                         JOIN
                     category ca ON ca.id = pd.id_category
                         JOIN
                     brand b ON b.id = pd.id_brand
                         JOIN
                     sole s ON s.id = pd.id_sole
                         JOIN
                     material m ON m.id = pd.id_material
                         JOIN
                     size si ON si.id = pd.id_size
                 WHERE pd.id_product = :#{#request.idProduct}
                 AND pd.id_color = :#{#request.idColor}
                 AND pd.id_category = :#{#request.idCategory}
                 AND pd.id_brand = :#{#request.idBrand}
                 AND pd.id_sole = :#{#request.idSole}
                 AND pd.id_material = :#{#request.idMaterial}
            """, nativeQuery = true)
    List<ClientProductDetailResponse> getAllSize(ClientProductDetailRequest request);


    @Query(value = """
                SELECT MAX(pd.id) as id,
                        pr.id as promotion , pr.value,
                       CONCAT(p.name, ' - ', c.name, ' - ', m.name, ' - ', s.name, ' - ', ca.name, ' - ', b.name) AS name,
                       MAX(pd.price) as price,
                       MAX(pd.weight) as weight,
                       MAX(pd.amount) as amount,
                       MAX(pd.description) as description,
                       GROUP_CONCAT(DISTINCT i.url) as image,
                       pd.id_product,
                       pd.id_color,
                       pd.id_material,
                       pd.id_sole,
                       pd.id_category,
                       pd.id_brand
                FROM product_detail pd
                         JOIN
                     product p ON p.id = pd.id_product
                         JOIN
                     color c ON c.id = pd.id_color
                         JOIN
                     category ca ON ca.id = pd.id_category
                         JOIN
                     brand b ON b.id = pd.id_brand
                         JOIN
                     sole s ON s.id = pd.id_sole
                         JOIN
                     material m ON m.id = pd.id_material
                         LEFT JOIN
                     image i ON pd.id = i.id_product_detail
                        left join product_promotion pp on pp.id_product_detail = pd.id
                        left join promotion pr on pr.id = pp.id_promotion
                        
                WHERE (:id is null or pd.id = :id)
                GROUP BY pd.id_product, pd.id_color, pd.id_material, pd.id_sole, pd.id_category, pd.id_brand, pp.id, pr.id
            """, nativeQuery = true)
    List<ClientProductResponse> getProductsPromotion(String id);
}
