package com.fshoes.core.admin.hoadon.repository;

import com.fshoes.core.admin.hoadon.model.respone.HDBillResponse;
import com.fshoes.repository.BillRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface HDBillRepositpory extends BillRepository {
    @Query(value ="""
            SELECT b.id, b.code, c.full_name as fullName,
            c.phone_number as phoneNumber, b.address,
            b.total_money as totalMoney, b.money_reduced as moneyReduced,
            b.money_after as moneyAfter, b.money_ship as moneyShip,
            b.type, b.note, b.created_at as createdAt,
            b.created_by as creatdeBy, sum(bt.quantity), b.status
            FROM bill b
            LEFT JOIN bill_detail bt ON b.id = bt.id_bill
            LEFT JOIN Customer c ON b.id_customer= c.id
            GROUP BY b.id,b.code, c.full_name,c.phone_number,b.address,
            b.total_money, b.money_reduced, b.money_after, b.money_ship,
            b.type, b.note, b.created_at, b.created_by,b.status
            ORDER BY b.created_at DESC
            """, nativeQuery = true)
    Page<HDBillResponse> getAllBill(Pageable pageable);


    Boolean existsByCode(String code);

    @Query(value = """
    SELECT b.id, b.code as code, c.full_name as fullName,
    c.phone_number as phoneNumber, b.address as address,
    b.total_money as totalMoney, b.money_reduced as moneyReduce,
    b.money_after as moneyAfter,b.money_ship as moneyShip,
    b.type as type, b.note as note,
    b.created_at as createdAt, b.created_by as createdBy,
    sum(bt.quantity) as totalProduct, b.status as status
    FROM bill b
    LEFT JOIN bill_detail bt ON b.id = bt.id_bill
    LEFT JOIN customer c ON b.id_customer = c.id
    GROUP BY b.id, b.code, c.full_name, c.phone_number, b.address,
    b.total_money, b.money_reduced, b.money_after, b.money_ship,
    b.type, b.note, b.created_at, b.created_by, b.status
    ORDER BY b.total_money DESC
    """, nativeQuery = true)
    Page<HDBillResponse> getAllBillOrderByTotalMoney(Pageable pageable);

    @Query(value = """  
    SELECT b.id, b.code, c.full_name as fullName,
    c.phone_number as phoneNumber, b.address,
    b.total_money as totalMoney, b.money_reduced as moneyReduced,
    b.money_after as moneyAfter, b.money_ship as moneyShip, b.type, b.note,
    b.created_at as createdAt, b.created_by as createdBy,
    sum(bt.quantity), b.status
    FROM bill b
    LEFT JOIN bill_detail bt ON b.id = b.id = bt.id_bill
    LEFT JOIN Customer c ON b.id_customer = c.id
    WHERE b.code LIKE CONCAT('%', :inputSearch, '%')
    OR (b.phone_number IS NOT NULL AND b.phone_number LIKE CONCAT('%', :inputSearch, '%'))
    OR (b.full_name IS NOT NULL AND b.full_name LIKE CONCAT('%', :inputSearch, '%'))
    OR (c.full_name IS NOT NULL AND c.full_name LIKE CONCAT('%', :inputSearch, '%'))
    OR (c.phone_number IS NOT NULL AND c.phone_number LIKE CONCAT('%', :inputSearch, '%'))
    OR (c.email IS NOT NULL AND c.email LIKE CONCAT('%', :inputSearch, '%'))
    GROUP BY  b.id, b.code, c.full_name, c.phone_number, b.address,
    b.total_money, b.money_reduced, b.money_after, b.money_ship,
    b.type, b.note, b.created_at, b.created_by, b.status
    ORDER BY b.created_at  DESC
    """, nativeQuery = true)
    Page<HDBillResponse> searchBillByInputText(Pageable pageable, @Param("inputSearch") String inputSearch);
    
    @Query(value = """
    SELECT b.id, b.code, c.full_name as fullName,
    c.phone_number as phoneNumber, b.address,
    b.total_money as totalMoney, b.money_reduced as moneyReduced,
    b.money_after as moneyAfter, b.money_ship as moneyShip,
    b.type, b.note, b.created_at as createdAt,
    b.created_by as createdBy , sum(bt.quantity), b.status
    FROM bill b
    LEFT JOIN bill_detail bt ON b.id = bt.id_bill
    LEFT JOIN customer c ON b.id_customer = c.id
    WHERE b.type = :#{#type}
    GROUP BY b.id, b.code, c.full_name, c.phone_number, b.address,
    b.total_money, b.money_reduced, b.money_after, b.money_ship,
    b.type, b.note, b.created_at, b.created_by, b.status
    ORDER BY b.created_at DESC
    """, nativeQuery = true)
    Page<HDBillResponse> getBillByType(Pageable pageable, @Param("type") Boolean type);

    @Query(value = """
    SELECT b.id, b.code, c.full_name as fullName,
    c.phone_number as phoneNumber, b.address,
    b.total_money as totalMoney, b.money_reduced as moneyReduced,
    b.money_after as moneyAfter, b.money_ship as moneyShip,
    b.type, b.note, b.created_at as createdAt,
    b.created_by as createdBy, sum(bt.quantity), b.status
    FROM bill b
    LEFT JOIN bill_detail bt ON b.id = bt.id_bill
    LEFT JOIN customer c ON b.id_customer = c.id
    WHERE b.status = :#{#status}
    GROUP BY b.id, b.code, c.full_name, c.phone_number, b.address,
    b.total_money, b.money_reduced, b.money_after, b.money_ship,
    b.type, b.note, b.created_at, b.created_by, b.status
    ORDER BY b.created_at DESC
    """,nativeQuery = true)
    Page<HDBillResponse> getBillByStatus(Pageable pageable, @Param("status") Integer status);

    @Query(value = """
    SELECT b.id, b.code, c.full_name as fullName,
    c.phone_number as phoneNumber, b.address,
    b.total_money as totalMoney, b.money_reduced as moneyReduced,
    b.money_after as moneyAfter, b.money_ship as moneyShip,
    b.type, b.note, b.created_at as createdAt,
    b.created_by as createdBy, sum(bt.quantity), b.status
    FROM bill b
    LEFT JOIN bill_detail bt ON b.id = bt.id_bill
    LEFT JOIN customer c ON b.id_customer = c.id
    WHERE b.created_at >= :#{#startDate} AND b.created_at <= :#{#endDate}
    GROUP BY b.id, b.code, c.full_name, c.phone_number, b.address,
    b.total_money, b.money_reduced, b.money_after, b.money_ship,
    b.type, b.note, b.created_at, b.created_by, b.status
    ORDER BY b.created_at DESC
    """,nativeQuery = true)
    Page<HDBillResponse> getBillByDateRange(
            Pageable pageable,
            @Param("startDate") Long startDate,
            @Param("endDate") Long endDate
    );

    @Query(value = """
            SELECT b.id, b.code, c.full_name as fullName,
            c.phone_number as phoneNumber, b.address,
            b.total_money as totalMoney,b.money_reduced as moneyReduced,
            b.money_after as moneyAfter, b.money_ship as moneyShip,
            b.type, b.note, b.created_at as createdAt,
            b.created_by as createdBy, sum(bt.quantity), b.status
            FROM bill b
            LEFT JOIN bill_detail bt ON b.id = bt.id_bill
            LEFT JOIN customer c ON b.id_customer = c.id
            WHERE b.total_money >= :minPrice
            AND b.total_money <= :maxPrice
            GROUP BY b.id, b.code, c.full_name, c.phone_number, b.address,
            b.total_money, b.money_reduced, b.money_after, b.money_ship,
            b.type, b.note, b.created_at, b.created_by, b.status
            ORDER BY b.created_at DESC
            """, nativeQuery = true)
    Page<HDBillResponse> getBillByTotalMoneyRange(
            Pageable pageable,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice
    );

    @Query(value = """
            SELECT b.id, b.code, c.full_name as fullName,
            c.phone_number as phoneNumber, b.address,
            b.total_money as totalMoney, b.money_reduced as moneyReduced,
            b.money_after as moneyAfter, b.money_ship as moneyShip,
            b.type, b.note, b.created_at as createdAt,
            b.created_by as createdBy, sum(bt.quantity), b.status FROM bill b
            LEFT JOIN bill_detail bt ON b.id = bt.id_bill
            LEFT JOIN customer c ON b.id_customer = c.id
            WHERE (:status IS NULL OR b.status = :status)
            AND (:startDate IS NULL OR b.created_at >= :startDate
            AND :endDate IS NULL OR b.created_at <= :endDate)
            AND (:type IS NULL OR b.type = :type)
            GROUP BY b.id, b.code, c.full_name, c.phone_number, b.address,
            b.total_money, b.money_reduced, b.money_after, b.money_ship,
            b.type,b.note, b.created_at,b.created_by,b.status
            ORDER BY b.created_at DESC
            """, nativeQuery = true)
    Page<HDBillResponse> filterBill(
            Pageable pageable,
            @Param("status") Integer status,
            @Param("startDate") Long startDate,
            @Param("endDate") Long endDate,
            @Param("type") Boolean type
    );

    @Query(value = """
            select b.id, b.code, c.full_name as fullName,
            c.phone_number as phoneNumber, b.address,
            b.total_money as totalMoney, b.money_reduced as moneyReduced,
            b.money_after as moneyAfter, b.money_ship as moneyShip,
            b.type, b.note, b.created_at as createdAt,
            b.created_by as createdBy, sum(bt.quantity), b.status
            FROM Bill b
            LEFT JOIN bill_detail bt ON b.id = bt.id_bill
            LEFT JOIN Customer c ON b.id_customer = c.id
            WHERE (:status IS NULL OR b.status = :status) AND (:type IS NULL OR b.type = :type)
            GROUP BY b.id,b.code,c.full_name,c.phone_number,b.address,
            b.total_money, b.money_reduced, b.money_after,b.money_ship,
            b.type, b.note,b.created_at, b.created_by, b.status
            ORDER BY b.created_at DESC
            """, nativeQuery = true)
    Page<HDBillResponse> getBillByStatusAndType(
            Pageable pageable,
            @Param("status") Integer status,
            @Param("type") Boolean type
    );

}
