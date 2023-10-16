package com.fshoes.core.client.repository;

import com.fshoes.core.client.model.request.ClientProductDetailRequest;
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
                       CONCAT(p.name, ' - ', c.name, ' - ', m.name, ' - ', s.name, ' - ', ca.name, ' - ', b.name) AS name,
                       MAX(pd.price) as price,
                       MAX(pd.amount) as amount,
                       MAX(pd.description) as description,
                       GROUP_CONCAT(i.url) as image,
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
                WHERE (:id is null or pd.id = :id)
                GROUP BY pd.id_product, pd.id_color, pd.id_material, pd.id_sole, pd.id_category, pd.id_brand
            """, nativeQuery = true)
    List<ClientProductResponse> getProducts(String id);

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
}
