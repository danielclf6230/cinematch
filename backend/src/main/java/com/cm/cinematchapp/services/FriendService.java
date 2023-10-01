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
public class FriendService {

    @Autowired
    private FriendRequestRepository friendRequestRepository;

    @Autowired
    private FriendshipRepository friendshipRepository;

    @Autowired
    private UserRepository userRepository;


    // --- Friend Requests ---

    // This section contains methods related to friend requests.

    /**
     * Get a list of friend requests by recipient ID.
     *
     * @param recipientId The ID of the recipient user.
     * @return A list of friend requests for the recipient.
     */
    public List<FriendRequest> getFriendRequestsByRecipientId(Long recipientId) {
        return friendRequestRepository.getFriendRequestsByRecipientUserId(recipientId);
    }

    /**
     * Send a friend request.
     *
     * @param requesterId The ID of the requesting user.
     * @param recipientId The ID of the recipient user.
     * @return The created friend request.
     */
    public FriendRequest sendFriendRequest(Long requesterId, Long recipientId) {
        // Retrieve the requester and the recipient by their IDs
        User requester = userRepository.findByUserId(requesterId);
        User recipient = userRepository.findByUserId(recipientId);


//        // Check if a friend request already exists between the requester and recipient
//        if (friendRequestRepository.existsByRequesterAndRecipient(requester, recipient)) {
//            throw new ExistingFriendshipException("Friend request already exists");
//        }

        // Create a new friend request
        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setRequester(requester);
        friendRequest.setRecipient(recipient);
        friendRequest.setRequestStatus(FriendRequest.FriendRequestStatus.PENDING);

        // Save the friend request to the repository
        return friendRequestRepository.save(friendRequest);
    }

    /**
     * Accept a friend request.
     *
     * @param friendRequestId The ID of the friend request to accept.
     */
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




    // --- Friendships ---

    // This section contains methods related to friendships.

    /**
     * Get a list of friendships by user ID.
     *
     * @param userId The ID of the user.
     * @return A list of friendships for the user.
     */
    public List<Friendship> getFriendshipsByUserId(Long userId) {
        return friendshipRepository.findByUserUserId(userId);
    }


    public void removeFriendship(Long userId, Long friendUserId) {
        // Find the friendship record to delete for user A
        Friendship friendship1 = friendshipRepository.findByUserIdAndFriendUserId(userId, friendUserId);

        // Find the friendship record to delete for user B
        Friendship friendship2 = friendshipRepository.findByUserIdAndFriendUserId(friendUserId, userId);

        if (friendship1 != null && friendship2 != null) {
            // Delete both friendship records (bi-directional)
            friendshipRepository.delete(friendship1);
            friendshipRepository.delete(friendship2);
            log.info("Friendship removed between user with ID {} and user with ID {}", userId, friendUserId);
        } else {
            log.warn("No friendship found between user with ID {} and user with ID {}", userId, friendUserId);
        }
    }



}
