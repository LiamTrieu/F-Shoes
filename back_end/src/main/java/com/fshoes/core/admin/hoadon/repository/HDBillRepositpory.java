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
    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(b.code, c.fullName, c.phoneNumber, b.address, b.totalMoney, b.moneyReduced," +
            "b.moneyAfter, b.moneyShip, b.type, b.note, b.createdAt, b.createdBy, sum(bt.quantity), b.status)  " +
            "FROM Bill b " +
            "LEFT JOIN BillDetail bt ON b.id = bt.bill.id " +
            "LEFT JOIN Customer c ON b.customer.id = c.id " +
            "GROUP BY " +
            "b.code, " +
            "c.fullName, " +
            "c.phoneNumber, " +
            "b.address, " +
            "b.totalMoney, " +
            "b.moneyReduced, " +
            "b.moneyAfter, " +
            "b.moneyShip, " +
            "b.type, " +
            "b.note, " +
            "b.createdAt, " +
            "b.createdBy, " +
            "b.status " +
            "ORDER BY b.createdAt DESC")
    Page<HDBillResponse> getAllBill(Pageable pageable);


    Boolean existsByCode(String code);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(b.code, c.fullName, c.phoneNumber, b.address, b.totalMoney, b.moneyReduced," +
            "b.moneyAfter, b.moneyShip, b.type, b.note, b.createdAt, b.createdBy, sum(bt.quantity), b.status)  " +
            "FROM Bill b " +
            "LEFT JOIN BillDetail bt ON b.id = bt.bill.id " +
            "LEFT JOIN Customer c ON b.customer.id = c.id " +
            "GROUP BY " +
            "b.code, " +
            "c.fullName, " +
            "c.phoneNumber, " +
            "b.address, " +
            "b.totalMoney, " +
            "b.moneyReduced, " +
            "b.moneyAfter, " +
            "b.moneyShip, " +
            "b.type, " +
            "b.note, " +
            "b.createdAt, " +
            "b.createdBy, " +
            "b.status " +
            "ORDER BY b.totalMoney DESC")
    Page<HDBillResponse> getAllBillOrderByTotalMoney(Pageable pageable);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(b.code, c.fullName, c.phoneNumber, b.address, b.totalMoney, b.moneyReduced," +
            "b.moneyAfter, b.moneyShip, b.type, b.note, b.createdAt, b.createdBy, sum(bt.quantity), b.status)  " +
            "FROM Bill b " +
            "LEFT JOIN BillDetail bt ON b.id = bt.bill.id " +
            "LEFT JOIN Customer c ON b.customer.id = c.id " +
            "WHERE b.code LIKE CONCAT('%', :inputSearch, '%') " +
            "OR (b.phoneNumber IS NOT NULL AND b.phoneNumber LIKE CONCAT('%', :inputSearch, '%')) " +
            "OR (b.fullName IS NOT NULL AND b.fullName LIKE CONCAT('%', :inputSearch, '%')) " +
            "OR (c.fullName IS NOT NULL AND c.fullName LIKE CONCAT('%', :inputSearch, '%')) " +
            "OR (c.phoneNumber IS NOT NULL AND c.phoneNumber LIKE CONCAT('%', :inputSearch, '%')) " +
            "OR (c.email IS NOT NULL AND c.email LIKE CONCAT('%', :inputSearch, '%')) " +
            "GROUP BY " +
            "b.code, " +
            "c.fullName, " +
            "c.phoneNumber, " +
            "b.address, " +
            "b.totalMoney, " +
            "b.moneyReduced, " +
            "b.moneyAfter, " +
            "b.moneyShip, " +
            "b.type, " +
            "b.note, " +
            "b.createdAt, " +
            "b.createdBy, " +
            "b.status " +
            "ORDER BY b.createdAt DESC")
    Page<HDBillResponse> searchBillByInputText(Pageable pageable, @Param("inputSearch") String inputSearch);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(b.code, b.fullName, b.phoneNumber, b.address, b.totalMoney, b.moneyReduced," +
            "b.moneyAfter, b.moneyShip, b.type, b.note, b.createdAt, b.createdBy, sum(bt.quantity), b.status)  " +
            "FROM Bill b " +
            "LEFT JOIN BillDetail bt ON b.id = bt.bill.id " +
            "WHERE b.type = :type " +
            "GROUP BY " +
            "b.code, " +
            "b.fullName, " +
            "b.phoneNumber, " +
            "b.address, " +
            "b.totalMoney, " +
            "b.moneyReduced, " +
            "b.moneyAfter, " +
            "b.moneyShip, " +
            "b.type, " +
            "b.note, " +
            "b.createdAt, " +
            "b.createdBy, " +
            "b.status " +
            "ORDER BY b.createdAt DESC")
    Page<HDBillResponse> getBillByType(Pageable pageable, @Param("type") Boolean type);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(b.code, b.fullName, b.phoneNumber, b.address, b.totalMoney, b.moneyReduced," +
            "b.moneyAfter, b.moneyShip, b.type, b.note, b.createdAt, b.createdBy, sum(bt.quantity), b.status)  " +
            "FROM Bill b " +
            "LEFT JOIN BillDetail bt ON b.id = bt.bill.id " +
            "WHERE b.status = :status " +
            "GROUP BY " +
            "b.code, " +
            "b.fullName, " +
            "b.phoneNumber, " +
            "b.address, " +
            "b.totalMoney, " +
            "b.moneyReduced, " +
            "b.moneyAfter, " +
            "b.moneyShip, " +
            "b.type, " +
            "b.note, " +
            "b.createdAt, " +
            "b.createdBy, " +
            "b.status " +
            "ORDER BY b.createdAt DESC")
    Page<HDBillResponse> getBillByStatus(Pageable pageable, @Param("status") Integer status);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(b.code, b.fullName, b.phoneNumber, b.address, b.totalMoney, b.moneyReduced," +
            "b.moneyAfter, b.moneyShip, b.type, b.note, b.createdAt, b.createdBy, sum(bt.quantity), b.status)  " +
            "FROM Bill b " +
            "LEFT JOIN BillDetail bt ON b.id = bt.bill.id " +
            "WHERE b.createdAt >= :startDate AND b.createdAt <= :endDate " +
            "GROUP BY " +
            "b.code, " +
            "b.fullName, " +
            "b.phoneNumber, " +
            "b.address, " +
            "b.totalMoney, " +
            "b.moneyReduced, " +
            "b.moneyAfter, " +
            "b.moneyShip, " +
            "b.type, " +
            "b.note, " +
            "b.createdAt, " +
            "b.createdBy, " +
            "b.status " +
            "ORDER BY b.createdAt DESC")
    Page<HDBillResponse> getBillByDateRange(
            Pageable pageable,
            @Param("startDate") Long startDate,
            @Param("endDate") Long endDate
    );

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(b.code, b.fullName, b.phoneNumber, b.address, b.totalMoney, b.moneyReduced," +
            "b.moneyAfter, b.moneyShip, b.type, b.note, b.createdAt, b.createdBy, sum(bt.quantity), b.status)  " +
            "FROM Bill b " +
            "LEFT JOIN BillDetail bt ON b.id = bt.bill.id " +
            "WHERE b.totalMoney >= :minPrice AND b.totalMoney <= :maxPrice " +
            "GROUP BY " +
            "b.code, " +
            "b.fullName, " +
            "b.phoneNumber, " +
            "b.address, " +
            "b.totalMoney, " +
            "b.moneyReduced, " +
            "b.moneyAfter, " +
            "b.moneyShip, " +
            "b.type, " +
            "b.note, " +
            "b.createdAt, " +
            "b.createdBy, " +
            "b.status " +
            "ORDER BY b.createdAt DESC")
    Page<HDBillResponse> getBillByTotalMoneyRange(
            Pageable pageable,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice
    );

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(b.code, b.fullName, b.phoneNumber, b.address, b.totalMoney, b.moneyReduced," +
            "b.moneyAfter, b.moneyShip, b.type, b.note, b.createdAt, b.createdBy, sum(bt.quantity), b.status)  " +
            "FROM Bill b " +
            "LEFT JOIN BillDetail bt ON b.id = bt.bill.id " +
            "WHERE b.status = :status AND b.createdAt >= :startDate AND b.createdAt <= :endDate " +
            "GROUP BY " +
            "b.code, " +
            "b.fullName, " +
            "b.phoneNumber, " +
            "b.address, " +
            "b.totalMoney, " +
            "b.moneyReduced, " +
            "b.moneyAfter, " +
            "b.moneyShip, " +
            "b.type, " +
            "b.note, " +
            "b.createdAt, " +
            "b.createdBy, " +
            "b.status " +
            "ORDER BY b.createdAt DESC")
    Page<HDBillResponse> getBillByStatusAndDateRange(
            Pageable pageable,
            @Param("status") Integer status,
            @Param("startDate") Long startDate,
            @Param("endDate") Long endDate
    );

}
