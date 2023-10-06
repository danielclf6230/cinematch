package com.cm.cinematchapp.repositories;

import com.cm.cinematchapp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByUsername(String email);

    Optional<User> findByUserId(Long userId);

    Optional<User> findByUsername(String username);

}
