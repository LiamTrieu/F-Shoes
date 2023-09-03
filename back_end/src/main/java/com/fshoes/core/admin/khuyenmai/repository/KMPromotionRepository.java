package com.fshoes.core.admin.khuyenmai.repository;

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

    @Query(value = "select Id, Name, time_start as TimeStart, time_end as TimeEnd, Value, Status " +
            "from Promotion where TimeStart >= :timeStartSearch ",nativeQuery = true)

    Page<PromotionRespone> searchByTimeStart(Pageable pageable, @Param("timeStartSearch") Long timeStartSearch);


    @Query(value = "select Id, Name, time_start as TimeStart, time_end as TimeEnd, Value, Status " +
            "from Promotion where TimeEnd <= :timeEndSearch ",nativeQuery = true)

    Page<PromotionRespone> searchByTimeEnd(Pageable pageable, @Param("timeEndSearch") Long timeEndSearch);

    @Query(value = "select Id, Name, time_start as TimeStart, time_end as TimeEnd, Value, Status " +
            "from Promotion where TimeStart >= :timeStartSearch and  TimeEnd <= :timeEndSearch ",nativeQuery = true)

    Page<PromotionRespone> searchPromotionBetweenDate(Pageable pageable, @Param("timeStartSearch") Long timeStartSearch, @Param("timeEndSearch") Long timeEndSearch);

    @Query(value = "select Id, Name, time_start as TimeStart, time_end as TimeEnd, Value, Status " +
            "from Promotion where Status = :statusSearch ",nativeQuery = true)

    Page<PromotionRespone> searchByStatus(Pageable pageable, @Param("statusSearch") Integer statusSearch);
}
