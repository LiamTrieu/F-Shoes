package com.fshoes.core.client.repository;

import com.fshoes.core.client.model.request.ClientProductCungLoaiRequest;
import com.fshoes.core.client.model.request.ClientProductDetailRequest;
import com.fshoes.core.client.model.request.ClientProductRequest;
import com.fshoes.core.client.model.response.ClientMinMaxPrice;
import com.fshoes.core.client.model.response.ClientProductDetailResponse;
import com.fshoes.core.client.model.response.ClientProductResponse;
import com.fshoes.repository.ProductDetailRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientProductDetailRepository extends ProductDetailRepository {
    @Query(value = """
                SELECT MAX(pd.id) as id,
                MAX( pr.id) as promotion ,MAX(pr.value) as value,
                       CONCAT(p.name, ' ', m.name, ' ', s.name, ' "', c.name,'"') AS name,
                       ca.name as nameCate,
                       b.name as nameBrand,
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
                AND (:#{#request.minPrice} IS NULl OR pd.price >= :#{#request.minPrice})
                AND (:#{#request.maxPrice} IS NULl OR pd.price <= :#{#request.maxPrice}) 
                AND (:#{#request.category.size()} < 1 OR ca.id IN (:#{#request.category})) 
                AND (:#{#request.color.size()} < 1  OR c.id IN (:#{#request.color})) 
                AND (:#{#request.material.size()} < 1  OR m.id IN (:#{#request.material})) 
                AND (:#{#request.brand.size()} < 1 OR b.id IN (:#{#request.brand})) 
                AND (:#{#request.sole.size()} < 1 OR s.id IN (:#{#request.sole})) 
                AND( (:#{#request.nameProductDetail} IS NULL OR p.name like %:#{#request.nameProductDetail}%) 
                OR (:#{#request.nameProductDetail} IS NULL OR ca.name like %:#{#request.nameProductDetail}%) 
                OR (:#{#request.nameProductDetail} IS NULL OR c.name like %:#{#request.nameProductDetail}%) 
                OR (:#{#request.nameProductDetail} IS NULL OR s.name like %:#{#request.nameProductDetail}%) 
                OR (:#{#request.nameProductDetail} IS NULL OR m.name like %:#{#request.nameProductDetail}%)) 
                GROUP BY pd.id_product, pd.id_color, pd.id_material, pd.id_sole, pd.id_category, pd.id_brand
            """, nativeQuery = true)
    List<ClientProductResponse> getProducts(@Param("request") ClientProductRequest request);

    @Query(value = """
            SELECT
                MAX(pd.id) as id,
                MAX(pr.id) as promotion,
                MAX(pr.value) as value,
                CONCAT(p.name, ' ', m.name, ' ', s.name, ' "', c.name, '"') AS name,
                ca.name as nameCate,
                b.name as nameBrand,
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
            FROM
                product_detail pd
                JOIN product p ON p.id = pd.id_product
                JOIN color c ON c.id = pd.id_color
                JOIN category ca ON ca.id = pd.id_category
                JOIN brand b ON b.id = pd.id_brand
                JOIN sole s ON s.id = pd.id_sole
                JOIN material m ON m.id = pd.id_material
                LEFT JOIN image i ON pd.id = i.id_product_detail
                LEFT JOIN product_promotion pp ON pd.id = pp.id_product_detail
                LEFT JOIN promotion pr ON pr.id = pp.id_promotion
            WHERE
                p.id <> :#{#request.product}
                AND ca.id = :#{#request.category}
                AND b.id = :#{#request.brand}
            GROUP BY
                pd.id_product, pd.id_color, pd.id_material, pd.id_sole, pd.id_category, pd.id_brand
            """, nativeQuery = true)
    Page<ClientProductResponse> getProductCungLoai(@Param("request") ClientProductCungLoaiRequest request, Pageable pageable);

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
                MAX( pr.id) as promotion ,MAX(pr.value) as value,
                       CONCAT(p.name, ' ', m.name, ' ', s.name, ' "', c.name,'"') AS name,
                       ca.name as nameCate,
                       b.name as nameBrand,
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
                ORDER BY p.created_at DESC
                LIMIT 10
            """, nativeQuery = true)
    List<ClientProductResponse> getProductsHome(@Param("request") ClientProductRequest request);

    @Query(value = """
                SELECT MAX(pd.id) as id,
                MAX( pr.id) as promotion ,MAX(pr.value) as value,
                       CONCAT(p.name, ' ', m.name, ' ', s.name, ' "', c.name,'"') AS name,
                       ca.name as nameCate,
                       b.name as nameBrand,
                       MAX(pd.price) as price,
                       MAX(pd.weight) as weight,
                       MAX(bd.quantity) as amount,
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
                         join bill_detail bd on bd.id_product_detail = pd.id
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
                GROUP BY pd.id_product, pd.id_color, pd.id_material, pd.id_sole, pd.id_category, pd.id_brand, bd.id
                ORDER BY bd.quantity DESC
                LIMIT 12
            """, nativeQuery = true)
    List<ClientProductResponse> getSellingProduct(@Param("request") ClientProductRequest request);

    @Query(value = """
            SELECT min(pd.price) as minPrice, max(pd.price) as maxPrice
            FROM product_detail pd
            """, nativeQuery = true)
    ClientMinMaxPrice getMinMaxPriceProductClient();
}
