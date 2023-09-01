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
            "b.moneyAfter, b.moneyShip, b.type, b.note, b.createdAt, b.createdBy) " +
            "FROM Bill b " +
            "ORDER BY b.createdAt DESC")
    Page<HDBillResponse> getAllBill(Pageable pageable);

    Boolean existsByCode(String code);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(b.code, b.fullName, b.phoneNumber, b.address, b.totalMoney, b.moneyReduced," +
            "b.moneyAfter, b.moneyShip, b.type, b.note, b.createdAt, b.createdBy) " +
            "FROM Bill b " +
            "ORDER BY b.totalMoney DESC")
    Page<HDBillResponse> getAllBillOrderByTotalMoney(Pageable pageable);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(b.code, b.fullName, b.phoneNumber, b.address, b.totalMoney, b.moneyReduced," +
            "b.moneyAfter, b.moneyShip, b.type, b.note, b.createdAt, b.createdBy) " +
            "FROM Bill b " +
            "WHERE b.code LIKE CONCAT('%', :inputSearch, '%') OR b.phoneNumber LIKE CONCAT('%', :inputSearch, '%') " +
            "OR b.fullName LIKE CONCAT('%', :inputSearch, '%') " +
            "OR b.customer.phoneNumber LIKE CONCAT('%', :inputSearch, '%') " +
            "OR b.customer.fullName LIKE CONCAT('%', :inputSearch, '%') " +
            "OR b.customer.email LIKE CONCAT('%', :inputSearch, '%') " +
            "OR b.createdBy LIKE CONCAT('%', :inputSearch, '%')" +
            "ORDER BY b.createdAt DESC")
    Page<HDBillResponse> searchBillByInputText(Pageable pageable, @Param("inputSearch") String inputSearch);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(b.code, b.fullName, b.phoneNumber, b.address, b.totalMoney, b.moneyReduced," +
            "b.moneyAfter, b.moneyShip, b.type, b.note, b.createdAt, b.createdBy) " +
            "FROM Bill b WHERE b.type = :type " +
            "ORDER BY b.createdAt DESC")
    Page<HDBillResponse> getBillByType(Pageable pageable, @Param("type") Boolean type);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(b.code, b.fullName, b.phoneNumber, b.address, b.totalMoney, b.moneyReduced," +
            "b.moneyAfter, b.moneyShip, b.type, b.note, b.createdAt, b.createdBy) " +
            "FROM Bill b WHERE b.status = :status " +
            "ORDER BY b.createdAt DESC")
    Page<HDBillResponse> getBillByStatus(Pageable pageable, @Param("status") Integer status);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(b.code, b.fullName, b.phoneNumber, b.address, b.totalMoney, b.moneyReduced," +
            "b.moneyAfter, b.moneyShip, b.type, b.note, b.createdAt, b.createdBy) " +
            "FROM Bill b " +
            "WHERE b.createdAt BETWEEN :startDate AND :endDate " +
            "ORDER BY b.createdAt DESC")
    Page<HDBillResponse> getBillByDateRange(
            Pageable pageable,
            @Param("startDate") Long startDate,
            @Param("endDate") Long endDate);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(b.code, b.fullName, b.phoneNumber, b.address, b.totalMoney, b.moneyReduced," +
            "b.moneyAfter, b.moneyShip, b.type, b.note, b.createdAt, b.createdBy) " +
            "FROM Bill b " +
            "WHERE b.totalMoney BETWEEN :minPrice AND :maxPrice " +
            "ORDER BY b.createdAt DESC")
    Page<HDBillResponse> getBillByTotalMoneyRange(
            Pageable pageable,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice);

    @Query("SELECT NEW com.fshoes.core.admin.hoadon.model.respone.HDBillResponse" +
            "(b.code, b.fullName, b.phoneNumber, b.address, b.totalMoney, b.moneyReduced," +
            "b.moneyAfter, b.moneyShip, b.type, b.note, b.createdAt, b.createdBy) " +
            "FROM Bill b " +
            "WHERE b.status = :status AND b.createdAt BETWEEN :startDate AND :endDate " +
            "ORDER BY b.createdAt DESC")
    Page<HDBillResponse> getBillByStatusAndDateRange(
            Pageable pageable,
            @Param("status") Integer status,
            @Param("startDate") Long startDate,
            @Param("endDate") Long endDate);

}
