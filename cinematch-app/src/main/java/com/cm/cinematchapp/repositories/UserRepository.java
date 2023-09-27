package com.cm.cinematchapp.repositories;

import com.cm.cinematchapp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByUsername(String email);

    User findByUserId(Long userId);

    User findByUsername(String username);

}
