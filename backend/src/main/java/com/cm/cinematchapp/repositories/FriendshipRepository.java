package com.cm.cinematchapp.repositories;

import com.cm.cinematchapp.entities.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

    Friendship findByFriendshipId(Long friendshipId);

    List<Friendship> findByUserUserId(Long userId);

    @Query("SELECT f FROM Friendship f WHERE f.user.userId = ?1 AND f.friendUser.userId = ?2")
    Friendship findByUserIdAndFriendUserId(Long userId, Long friendUserId);

}
