package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.core.admin.sanpham.model.request.ProductFilterRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductResponse;
import com.fshoes.entity.Product;
import com.fshoes.infrastructure.constant.Status;
import com.fshoes.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdProductRepository extends ProductRepository {


    @Query(value = """
            select ROW_NUMBER() over (ORDER BY p.created_at desc ) as stt,p.id, p.name, c.name as category,
                b.name as brand, count(pd.id) as amount, p.deleted as status
                from product p
                join product_detail pd
                on p.id = pd.id_product
                join category c on pd.id_category = c.id
                join brand b on pd.id_brand = b.id
                where (:#{#filter.name} is null or p.name like %:#{#filter.name}%)
                and (:#{#filter.category} is null or c.id = :#{#filter.category})
                and (:#{#filter.brand} is null or b.id = :#{#filter.brand})
                and (:#{#filter.status} is null or p.deleted = :#{#filter.status})
                group by p.name, c.name, b.name, p.deleted,p.id
                """, nativeQuery = true)
    Page<ProductResponse> getAllProduct(ProductFilterRequest filter, Pageable pageable);

    @Query(value = """
            select p.id, p.name, c.name as category, c.id as categoryId, b.id as brandId,
                b.name as brand, p.deleted as status, MAX(pd.description) as description
                from product p
                join product_detail pd
                on p.id = pd.id_product
                join category c on pd.id_category = c.id
                join brand b on pd.id_brand = b.id
                where p.deleted = 0
                group by p.name, c.name, b.name, p.deleted,p.id, p.created_at, c.id, b.id
                order by p.created_at desc
                """, nativeQuery = true)
    List<ProductResponse> getListProduct();
}
