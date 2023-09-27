package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.core.admin.sanpham.model.request.PrdDetailFilterRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductDetailResponse;
import com.fshoes.core.admin.sanpham.model.respone.ProductMaxPriceResponse;
import com.fshoes.repository.ProductDetailRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



@Repository
public interface AdProductDetailRepository extends ProductDetailRepository {

    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY pd.created_at desc ) as stt,
            pd.id as id,
            pd.code as code, c.name as colorName, s.name as sole,
            m.name as material, si.size as size, c.code as colorCode,
            pd.amount, pd.weight, pd.price, pd.deleted
            FROM product_detail pd
            JOIN color c ON c.id = pd.id_color
            JOIN sole s ON s.id = pd.id_sole
            JOIN material m ON m.id = pd.id_material
            JOIN size si ON si.id = pd.id_size
            WHERE pd.id_product = :#{#request.product}
            AND (:#{#request.name} is null or pd.code like %:#{#request.name}%)
            AND (:#{#request.status} is null or pd.deleted = :#{#request.status})
            AND (:#{#request.color} is null or pd.id_color = :#{#request.color})
            AND (:#{#request.material} is null or pd.id_material = :#{#request.material})
            AND (:#{#request.sizeFilter} is null or pd.id_size = :#{#request.sizeFilter})
            AND (:#{#request.sole} is null or pd.id_sole = :#{#request.sole})
            AND (pd.price >= :#{#request.priceMin} AND pd.price <= :#{#request.priceMax})
            """, nativeQuery = true)
    Page<ProductDetailResponse> getAllProductDetail(PrdDetailFilterRequest request, Pageable pageable);

    @Query(value = """
    SELECT p.id as id, max(pd.price) as price, CONCAT(p.name, ' [', c.name, ' - ', b.name, ']') as name,
    p.name as nameProduct, c.id as idCategory, b.id as idBrand, pd.description as description,
    b.name as nameBrand, c.name as nameCategory
    FROM product_detail pd
    JOIN product p ON p.id = pd.id_product
    JOIN category c ON c.id = pd.id_category
    JOIN brand b ON b.id = pd.id_brand
    WHERE p.id = :id
    GROUP BY p.name, c.name, b.name, c.id, b.id, pd.description, p.id, b.name, c.name
    
    """, nativeQuery = true)
    ProductMaxPriceResponse getProductMaxPrice(@Param("id") String id);

}
