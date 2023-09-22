package com.cm.cinematchapp.repositories;

import com.cm.cinematchapp.entities.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

    Friendship getFriendshipByFriendshipId(Long friendshipId);

    List<Friendship> findByUserUserId(Long userId);

}
