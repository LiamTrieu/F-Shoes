package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.core.admin.sanpham.model.request.PrdDetailFilterRequest;
import com.fshoes.core.admin.sanpham.model.respone.ProductDetailResponse;
import com.fshoes.repository.ProductDetailRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpProductDetailRepository extends ProductDetailRepository {

    @Query(value = """
            select PD.id, PD.code, P.name as product, C.code as color, B.name as brand, S.name as sole,
             M.name as material, CA.name as category, I.name as image, SI.size, PD.amount, PD.price, PD.deleted
             from product_detail PD
             left join product P on PD.id_product = P.id
             left join color C on PD.id_color = C.id
             left join brand B on PD.id_brand = B.id
             left join sole S on PD.id_sole = S.id
             left join material M on PD.id_material = M.id
             left join category CA on PD.id_category = CA.id
             left join size SI on PD.id_size = SI.id
             left join image I on PD.id_image = I.id
             where (:#{#filterReq.idBrand} is null or B.id = :#{#filterReq.idBrand})
             and (:#{#filterReq.idSole} is null or S.id = :#{#filterReq.idSole})
             and (:#{#filterReq.idMaterial} is null or M.id = :#{#filterReq.idMaterial})
             and (:#{#filterReq.idCategory} is null or CA.id = :#{#filterReq.idCategory})
             and (:#{#filterReq.idSize} is null or SI.id = :#{#filterReq.idSize})
             and (:#{#filterReq.idColor} is null or C.id = :#{#filterReq.idColor})""", nativeQuery = true)
    Page<ProductDetailResponse> getAll(Pageable pageable, @Param("filterReq") PrdDetailFilterRequest filterReq);

    @Query(value = """
            select PD.id, PD.code, P.name as product, C.code as color, B.name as brand, S.name as sole,
             M.name as material, CA.name as category, I.name as image, SI.size, PD.amount, PD.price, PD.deleted
             from product_detail PD
             left join product P on PD.id_product = P.id
             left join color C on PD.id_color = C.id
             left join brand B on PD.id_brand = B.id
             left join sole S on PD.id_sole = S.id
             left join material M on PD.id_material = M.id
             left join category CA on PD.id_category = CA.id
             left join size SI on PD.id_size = SI.id
             left join image I on PD.id_image = I.id""", nativeQuery = true)
    Optional<ProductDetailResponse> getById(@Param("id") Long id);
}
