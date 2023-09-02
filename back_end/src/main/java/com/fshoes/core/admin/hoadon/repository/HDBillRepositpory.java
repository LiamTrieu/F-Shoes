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
            "(b.code, b.fullName, b.phoneNumber, b.address, b.totalMoney, b.moneyReduced," +
            "b.moneyAfter, b.moneyShip, b.type, b.note, b.createdAt, b.createdBy, sum(d.quantity), b.status)  " +
            "FROM Bill b " +
            "LEFT JOIN BillDetail d ON b.id = d.bill.id " +
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
    Page<HDBillResponse> getAllBill(Pageable pageable);


    Boolean existsByCode(String code);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(bt.bill.code, bt.bill.fullName, bt.bill.phoneNumber, bt.bill.address, bt.bill.totalMoney, bt.bill.moneyReduced," +
            "bt.bill.moneyAfter, bt.bill.moneyShip, bt.bill.type, bt.bill.note, bt.bill.createdAt, bt.bill.createdBy, sum(bt.quantity), b.status) " +
            "FROM Bill b " +
            "LEFT JOIN BillDetail bt ON b.id = bt.bill.id " +
            "GROUP BY " +
            "bt.bill.code, " +
            "bt.bill.fullName, " +
            "bt.bill.phoneNumber, " +
            "bt.bill.address, " +
            "bt.bill.totalMoney, " +
            "bt.bill.moneyReduced, " +
            "bt.bill.moneyAfter, " +
            "bt.bill.moneyShip, " +
            "bt.bill.type, " +
            "bt.bill.note, " +
            "bt.bill.createdAt, " +
            "bt.bill.createdBy, " +
            "b.status " +
            "ORDER BY bt.bill.totalMoney DESC")
    Page<HDBillResponse> getAllBillOrderByTotalMoney(Pageable pageable);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(bt.bill.code, bt.bill.fullName, bt.bill.phoneNumber, bt.bill.address, bt.bill.totalMoney, bt.bill.moneyReduced," +
            "bt.bill.moneyAfter, bt.bill.moneyShip, bt.bill.type, bt.bill.note, bt.bill.createdAt, bt.bill.createdBy, sum(bt.quantity), b.status) " +
            "FROM Bill b " +
            "LEFT JOIN BillDetail bt ON b.id = bt.bill.id " +
            "WHERE bt.bill.code LIKE CONCAT('%', :inputSearch, '%') OR bt.bill.phoneNumber LIKE CONCAT('%', :inputSearch, '%') " +
            "OR bt.bill.fullName LIKE CONCAT('%', :inputSearch, '%') " +
            "OR bt.bill.customer.phoneNumber LIKE CONCAT('%', :inputSearch, '%') " +
            "OR bt.bill.customer.fullName LIKE CONCAT('%', :inputSearch, '%') " +
            "OR bt.bill.customer.email LIKE CONCAT('%', :inputSearch, '%') " +
            "OR bt.bill.createdBy LIKE CONCAT('%', :inputSearch, '%')" +
            "GROUP BY " +
            "bt.bill.code, " +
            "bt.bill.fullName, " +
            "bt.bill.phoneNumber, " +
            "bt.bill.address, " +
            "bt.bill.totalMoney, " +
            "bt.bill.moneyReduced, " +
            "bt.bill.moneyAfter, " +
            "bt.bill.moneyShip, " +
            "bt.bill.type, " +
            "bt.bill.note, " +
            "bt.bill.createdAt, " +
            "bt.bill.createdBy, " +
            "b.status " +
            "ORDER BY bt.bill.createdAt DESC")
    Page<HDBillResponse> searchBillByInputText(Pageable pageable, @Param("inputSearch") String inputSearch);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(bt.bill.code, bt.bill.fullName, bt.bill.phoneNumber, bt.bill.address, bt.bill.totalMoney, bt.bill.moneyReduced," +
            "bt.bill.moneyAfter, bt.bill.moneyShip, bt.bill.type, bt.bill.note, bt.bill.createdAt, bt.bill.createdBy, sum(bt.quantity), b.status) " +
            "FROM Bill b " +
            "LEFT JOIN BillDetail bt ON b.id = bt.bill.id " +
            "WHERE bt.bill.type = :type " +
            "GROUP BY " +
            "bt.bill.code, " +
            "bt.bill.fullName, " +
            "bt.bill.phoneNumber, " +
            "bt.bill.address, " +
            "bt.bill.totalMoney, " +
            "bt.bill.moneyReduced, " +
            "bt.bill.moneyAfter, " +
            "bt.bill.moneyShip, " +
            "bt.bill.type, " +
            "bt.bill.note, " +
            "bt.bill.createdAt, " +
            "bt.bill.createdBy, " +
            "b.status " +
            "ORDER BY bt.bill.createdAt DESC")
    Page<HDBillResponse> getBillByType(Pageable pageable, @Param("type") Boolean type);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(bt.bill.code, bt.bill.fullName, bt.bill.phoneNumber, bt.bill.address, bt.bill.totalMoney, bt.bill.moneyReduced," +
            "bt.bill.moneyAfter, bt.bill.moneyShip, bt.bill.type, bt.bill.note, bt.bill.createdAt, bt.bill.createdBy, sum(bt.quantity), b.status) " +
            "FROM Bill b " +
            "LEFT JOIN BillDetail bt ON b.id = bt.bill.id " +
            "WHERE bt.bill.status = :status " +
            "GROUP BY " +
            "bt.bill.code, " +
            "bt.bill.fullName, " +
            "bt.bill.phoneNumber, " +
            "bt.bill.address, " +
            "bt.bill.totalMoney, " +
            "bt.bill.moneyReduced, " +
            "bt.bill.moneyAfter, " +
            "bt.bill.moneyShip, " +
            "bt.bill.type, " +
            "bt.bill.note, " +
            "bt.bill.createdAt, " +
            "bt.bill.createdBy, " +
            "b.status " +
            "ORDER BY bt.bill.createdAt DESC")
    Page<HDBillResponse> getBillByStatus(Pageable pageable, @Param("status") Integer status);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(bt.bill.code, bt.bill.fullName, bt.bill.phoneNumber, bt.bill.address, bt.bill.totalMoney, bt.bill.moneyReduced," +
            "bt.bill.moneyAfter, bt.bill.moneyShip, bt.bill.type, bt.bill.note, bt.bill.createdAt, bt.bill.createdBy, sum(bt.quantity), b.status) " +
            "FROM Bill b " +
            "LEFT JOIN BillDetail bt ON b.id = bt.bill.id " +
            "WHERE bt.bill.createdAt BETWEEN :startDate AND :endDate " +
            "GROUP BY " +
            "bt.bill.code, " +
            "bt.bill.fullName, " +
            "bt.bill.phoneNumber, " +
            "bt.bill.address, " +
            "bt.bill.totalMoney, " +
            "bt.bill.moneyReduced, " +
            "bt.bill.moneyAfter, " +
            "bt.bill.moneyShip, " +
            "bt.bill.type, " +
            "bt.bill.note, " +
            "bt.bill.createdAt, " +
            "bt.bill.createdBy, " +
            "b.status " +
            "ORDER BY bt.bill.createdAt DESC")
    Page<HDBillResponse> getBillByDateRange(
            Pageable pageable,
            @Param("startDate") Long startDate,
            @Param("endDate") Long endDate);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(bt.bill.code, bt.bill.fullName, bt.bill.phoneNumber, bt.bill.address, bt.bill.totalMoney, bt.bill.moneyReduced," +
            "bt.bill.moneyAfter, bt.bill.moneyShip, bt.bill.type, bt.bill.note, bt.bill.createdAt, bt.bill.createdBy, sum(bt.quantity), b.status) " +
            "FROM Bill b " +
            "LEFT JOIN BillDetail bt ON b.id = bt.bill.id " +
            "WHERE bt.bill.totalMoney BETWEEN :minPrice AND :maxPrice " +
            "GROUP BY " +
            "bt.bill.code, " +
            "bt.bill.fullName, " +
            "bt.bill.phoneNumber, " +
            "bt.bill.address, " +
            "bt.bill.totalMoney, " +
            "bt.bill.moneyReduced, " +
            "bt.bill.moneyAfter, " +
            "bt.bill.moneyShip, " +
            "bt.bill.type, " +
            "bt.bill.note, " +
            "bt.bill.createdAt, " +
            "bt.bill.createdBy, " +
            "b.status " +
            "ORDER BY bt.bill.createdAt DESC")
    Page<HDBillResponse> getBillByTotalMoneyRange(
            Pageable pageable,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(bt.bill.code, bt.bill.fullName, bt.bill.phoneNumber, bt.bill.address, bt.bill.totalMoney, bt.bill.moneyReduced," +
            "bt.bill.moneyAfter, bt.bill.moneyShip, bt.bill.type, bt.bill.note, bt.bill.createdAt, bt.bill.createdBy, sum(bt.quantity), b.status) " +
            "FROM Bill b " +
            "LEFT JOIN BillDetail bt ON b.id = bt.bill.id " +
            "WHERE bt.bill.status = :status AND bt.bill.createdAt BETWEEN :startDate AND :endDate " +
            "GROUP BY " +
            "bt.bill.code, " +
            "bt.bill.fullName, " +
            "bt.bill.phoneNumber, " +
            "bt.bill.address, " +
            "bt.bill.totalMoney, " +
            "bt.bill.moneyReduced, " +
            "bt.bill.moneyAfter, " +
            "bt.bill.moneyShip, " +
            "bt.bill.type, " +
            "bt.bill.note, " +
            "bt.bill.createdAt, " +
            "bt.bill.createdBy, " +
            "b.status " +
            "ORDER BY bt.bill.createdAt DESC")
    Page<HDBillResponse> getBillByStatusAndDateRange(
            Pageable pageable,
            @Param("status") Integer status,
            @Param("startDate") Long startDate,
            @Param("endDate") Long endDate);

}
