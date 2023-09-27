package com.cm.cinematchapp.services;

import com.cm.cinematchapp.entities.FriendRequest;
import com.cm.cinematchapp.entities.Friendship;
import com.cm.cinematchapp.entities.User;
import com.cm.cinematchapp.repositories.FriendRequestRepository;
import com.cm.cinematchapp.repositories.FriendshipRepository;
import com.cm.cinematchapp.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@Slf4j
public class FriendRequestService {

    @Autowired
    private FriendRequestRepository friendRequestRepository;

    @Autowired
    private FriendshipRepository friendshipRepository;

    @Autowired
    private UserRepository userRepository;


    public List<FriendRequest> getFriendRequestsByRecipientId(Long recipientId) {
        return friendRequestRepository.getFriendRequestsByRecipientUserId(recipientId);
    }

    public FriendRequest sendFriendRequest(Long requesterId, Long recipientId) {
        // Retrieve the requester and the recipient by their IDs
        User requester = userRepository.findByUserId(requesterId);
        User recipient = userRepository.findByUserId(recipientId);

//        // Check if the requester and recipient exist
//        if (requester == null || recipient == null) {
//            throw new IllegalArgumentException("Invalid requesterId or recipientId");
//        }
//
//        // Check if a friend request already exists between the requester and recipient
//        if (friendRequestRepository.existsByRequesterAndRecipient(requester, recipient)) {
//            throw new IllegalArgumentException("Friend request already exists");
//        }

        // Create a new friend request
        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setRequester(requester);
        friendRequest.setRecipient(recipient);
        friendRequest.setRequestStatus(FriendRequest.FriendRequestStatus.PENDING);

        // Save the friend request to the repository
        return friendRequestRepository.save(friendRequest);
    }


    public void acceptFriendRequest(Long friendRequestId) {

        // Retrieve the friend request by its ID from the repository, or set it to null if not found
        FriendRequest friendRequest = friendRequestRepository.getByRequestId(friendRequestId);

        // Check if the friend request exists and is in a PENDING status
        if (friendRequest != null && friendRequest.getRequestStatus() == FriendRequest.FriendRequestStatus.PENDING) {
            // Update the request status to "Accepted"
            friendRequest.setRequestStatus(FriendRequest.FriendRequestStatus.ACCEPTED);
            friendRequestRepository.save(friendRequest);

            // Create an entry in the Friendship table for userA (the requester)
            Friendship friendshipA = new Friendship();
            friendshipA.setUser(friendRequest.getRequester());
            friendshipA.setFriendUser(friendRequest.getRecipient());
            friendshipA.setFriendshipStatus(Friendship.FriendshipStatus.ACCEPTED);
            friendshipRepository.save(friendshipA);

            // Create an entry in the Friendship table for userB (the recipient)
            Friendship friendshipB = new Friendship();
            friendshipB.setUser(friendRequest.getRecipient());
            friendshipB.setFriendUser(friendRequest.getRequester());
            friendshipB.setFriendshipStatus(Friendship.FriendshipStatus.ACCEPTED);
            friendshipRepository.save(friendshipB);

            // Remove the friend request from the FriendRequest table
            friendRequestRepository.delete(friendRequest);
        }
    }


}
