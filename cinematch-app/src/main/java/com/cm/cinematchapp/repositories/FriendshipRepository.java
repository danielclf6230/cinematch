package com.cm.cinematchapp.repositories;

import com.cm.cinematchapp.entities.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
}
