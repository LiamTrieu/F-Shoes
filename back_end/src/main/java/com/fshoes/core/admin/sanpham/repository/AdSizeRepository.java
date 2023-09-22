package com.fshoes.core.admin.sanpham.repository;

import com.fshoes.entity.Size;
import com.fshoes.infrastructure.constant.Status;
import com.fshoes.repository.SizeRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdSizeRepository extends SizeRepository {
    List<Size> findAllByDeleted(Status status);
}
