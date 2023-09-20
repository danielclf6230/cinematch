package com.cm.cinematchapp.repositories;

import com.cm.cinematchapp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
