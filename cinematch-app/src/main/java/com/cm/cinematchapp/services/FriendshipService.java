package com.cm.cinematchapp.services;

import com.cm.cinematchapp.entities.Friendship;
import com.cm.cinematchapp.repositories.FriendshipRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@Slf4j
public class FriendshipService {

    @Autowired
    private FriendshipRepository friendshipRepository;

    public List<Friendship> getFriendshipsByUserId(Long userId) {
        return friendshipRepository.findByUserUserId(userId);
    }

}
