package com.fshoes.repository;

import com.fshoes.entity.Account;
import com.fshoes.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {


}
