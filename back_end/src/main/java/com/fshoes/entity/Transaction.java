package com.fshoes.entity;

import com.fshoes.entity.base.PrimaryEntity;
import com.fshoes.infrastructure.constant.PaymentMethod;
import com.fshoes.infrastructure.constant.Status;
import com.fshoes.infrastructure.constant.TypeTransaction;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "transaction")
public class Transaction extends PrimaryEntity {

    private TypeTransaction type;

    private BigDecimal totalMoney;

    private PaymentMethod paymentMethod;

    private String note;

    private String transactionCode;

    private Status status;

    @ManyToOne
    @JoinColumn(name = "id_bill", referencedColumnName = "id")
    private Bill bill;

    @ManyToOne
    @JoinColumn(name = "id_account", referencedColumnName = "id")
    private Account account;

    public Integer getStatus() {
        return status.ordinal();
    }

    public void setStatus(Integer status) {
        this.status = Status.values()[status];
    }

    public Integer getPaymentMethod() {
        return paymentMethod.ordinal();
    }

    public void setPaymentMethod(Integer paymentMethod) {
        this.paymentMethod = PaymentMethod.values()[paymentMethod];
    }

    public Integer getType() {
        return type.ordinal();
    }

    public void setType(Integer type) {
        this.type = TypeTransaction.values()[type];
    }
}
