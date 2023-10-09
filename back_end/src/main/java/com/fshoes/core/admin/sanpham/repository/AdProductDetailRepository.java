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
        SELECT 
            ROW_NUMBER() over (ORDER BY pd.created_at desc ) as stt,
            pd.id as id, 
            pd.code as code, 
            c.name as colorName, 
            s.name as sole, 
            m.name as material, 
            si.size as size, 
            c.code as colorCode, 
            ca.name as category, 
            b.name as brand, 
            pd.amount, 
            pd.weight, 
            pd.price, 
            pd.deleted,
            GROUP_CONCAT(i.url) as image -- Concatenate the URLs into a single string
        FROM 
            product_detail pd
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
        LEFT JOIN -- Use LEFT JOIN to include products without images
            image i ON pd.id = i.id_product_detail
        WHERE 
            pd.id_product = :#{#request.product}
            AND (:#{#request.name} IS NULL OR pd.code LIKE %:#{#request.name}%)
            AND (:#{#request.color} IS NULL OR pd.id_color = :#{#request.color})
            AND (:#{#request.material} IS NULL OR pd.id_material = :#{#request.material})
            AND (:#{#request.sizeFilter} IS NULL OR pd.id_size = :#{#request.sizeFilter})
            AND (:#{#request.sole} IS NULL OR pd.id_sole = :#{#request.sole})
            AND (:#{#request.category} IS NULL OR pd.id_category = :#{#request.category})
            AND (:#{#request.brand} IS NULL OR pd.id_brand = :#{#request.brand})
            AND (:#{#request.status} IS NULL OR pd.deleted = :#{#request.status})
            AND (pd.price >= :#{#request.priceMin} AND pd.price <= :#{#request.priceMax})
        GROUP BY 
            pd.id, 
            pd.code, 
            c.name, 
            s.name, 
            m.name, 
            si.size, 
            c.code, 
            ca.name, 
            b.name, 
            pd.amount, 
            pd.weight, 
            pd.price, 
            pd.deleted
        """, nativeQuery = true)
    Page<ProductDetailResponse> getAllProductDetail(PrdDetailFilterRequest request, Pageable pageable);

    @Query(value = """
            SELECT p.id, max(pd.price) as price, p.name as name
            FROM product p
            JOIN product_detail pd ON p.id = pd.id_product
            WHERE p.id = :id
            GROUP BY p.name, p.id
            """, nativeQuery = true)
    ProductMaxPriceResponse getProductMaxPrice(@Param("id") String id);

}
