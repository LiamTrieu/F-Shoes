package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.core.admin.sanpham.model.request.ProductFilterRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductResponse;
import com.fshoes.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdProductRepository extends ProductRepository {


    @Query(value = """
            select ROW_NUMBER() over (ORDER BY p.created_at desc ) as stt, p.name, c.name as category,
                b.name as brand, count(pd.id) as amount, p.deleted as status
                from product p
                join product_detail pd
                on p.id = pd.id_product
                join category c on pd.id_category = c.id
                join brand b on pd.id_brand = b.id
                where (:#{#filter.category} is null or p.name like %:#{#filter.name}%)
                and (:#{#filter.category} is null or c.id = :#{#filter.category})
                and (:#{#filter.brand} is null or b.id = :#{#filter.brand})
                and (:#{#filter.status} is null or p.deleted = :#{#filter.status})
                group by p.name, c.name, b.name, p.deleted,p.id
                """, nativeQuery = true)
    Page<ProductResponse> getAllProduct(ProductFilterRequest filter, Pageable pageable);
}
