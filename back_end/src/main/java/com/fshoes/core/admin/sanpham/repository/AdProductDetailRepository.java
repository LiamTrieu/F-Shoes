package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.core.admin.sanpham.model.request.PrdDetailFilterRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductDetailResponse;
import com.fshoes.repository.ProductDetailRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdProductDetailRepository extends ProductDetailRepository {

    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY pd.created_at desc ) as stt,
            pd.code as code, c.name as colorName, s.name as sole,
            m.name as material, si.size as size, c.code as colorCode,
            pd.amount, pd.weight, pd.price, pd.deleted
            FROM product_detail pd
            JOIN color c ON c.id = pd.id_color
            JOIN sole s ON s.id = pd.id_sole
            JOIN material m ON m.id = pd.id_material
            JOIN size si ON si.id = pd.id_size
            WHERE pd.id_product = :#{#request.product}
            """, nativeQuery = true)
    Page<ProductDetailResponse> getAllProductDetail(PrdDetailFilterRequest request, Pageable pageable);
}
