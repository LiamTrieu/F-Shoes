package com.fshoes.entity;

import com.fshoes.entity.base.IntegerEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "size")
public class Size extends IntegerEntity {
<<<<<<< HEAD
    @Column(length = EntityProperties.LENGTH_NAME)
    private String size;
=======
>>>>>>> 643d379c887d536f154e4fca216a855b8b3445b2

    private Float size;

    private Boolean deleted = false;
}
