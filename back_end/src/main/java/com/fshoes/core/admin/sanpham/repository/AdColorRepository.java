package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.entity.Color;
import com.fshoes.infrastructure.constant.Status;
import com.fshoes.repository.ColorRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdColorRepository extends ColorRepository {
    List<Color> findAllByDeleted(Status status);
}
