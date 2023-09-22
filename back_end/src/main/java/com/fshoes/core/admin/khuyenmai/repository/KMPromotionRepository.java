package com.fshoes.core.admin.khuyenmai.repository;

import com.fshoes.core.admin.khuyenmai.model.request.PromotionSearch;
import com.fshoes.core.admin.khuyenmai.model.respone.PromotionRespone;
import com.fshoes.repository.PromotionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KMPromotionRepository extends PromotionRepository {
    @Query(value = "select Id, Name, time_start as TimeStart, time_end as TimeEnd, Value, Status from Promotion", nativeQuery = true)
    List<PromotionRespone> getAllKhuyenMai();

    @Query(value = "select Id, Name, time_start as TimeStart, time_end as TimeEnd, Value, Status " +
                   "from Promotion where Name like %:textSearch%",nativeQuery = true)
    Page<PromotionRespone> searchByName(Pageable pageable, @Param("textSearch") String textSearch);
    // new

    @Query(value = """
            select p.id, p.name, p.time_start as timeStart, p.time_end as timeEnd, p.value, p.status ,p.type
            from Promotion p where (:#{#reg.name} IS NULL OR name like %:#{#reg.name}%)
            AND (:#{#reg.timeStart} IS NULL OR time_start >= :#{#reg.timeStart})
            AND (:#{#reg.timeEnd} IS NULL OR time_end <= :#{#reg.timeEnd})
            AND (:#{#reg.status} IS NULL OR status = :#{#reg.status})
            AND (:#{#reg.type} IS NULL OR type = :#{#reg.type})
            """, nativeQuery = true)
        Page<PromotionRespone> getPromotion(@Param("reg") PromotionSearch reg, Pageable pageable);

    @Query(value = """
            select p.Id, p.Name, p.time_start as TimeStart, p.time_end as timeEnd, p.Value, p.Status
                       from Promotion p 
            """, nativeQuery = true)
    Page<PromotionRespone> getPagePromotion(Pageable pageable);
}
