package com.cm.cinematchapp.entities;

import java.util.ArrayList;
import java.util.List;

import com.cm.cinematchapp.constants.EntityConstants;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Entity
@Data
public class Friendship {

    @Id
    @Column(name="friendship_id", nullable=false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter(AccessLevel.NONE)
    private Long friendshipId;

    // Define the two users involved in the friendship
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "friend_user_id", referencedColumnName = "user_id")
    private User friendUser;

    @Enumerated(EnumType.STRING)
    @Column(name="friendship_status", nullable=false)
    private FriendshipStatus friendshipStatus;

    public enum FriendshipStatus {
        ACCEPTED
    }
}
