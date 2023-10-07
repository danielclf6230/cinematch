package com.cm.cinematchapp.entities;

import com.cm.cinematchapp.constants.EntityConstants;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.ArrayList;
import java.util.List;


/**
 * @author Eric Rebadona
 */
@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @Column(name="user_id", nullable=false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter(AccessLevel.NONE)
    private Long userId;

    @Column(name="first_name", nullable=false)
    @NotNull(message="First name cannot be empty.")
    @Size(min=EntityConstants.kMinNameLen,
        max=EntityConstants.kMaxNameLen)
    private String firstName;

    @Column(name="last_name", nullable=false)
    @NotNull(message="Last name cannot be empty.")
    @Size(min=EntityConstants.kMinNameLen,
        max=EntityConstants.kMaxNameLen)
    private String lastName;

    @Column(name="username", nullable=false, unique=true)
    @NotNull(message="Username cannot be empty.")
    @Size(min=EntityConstants.kMinUsernameLen,
            max=EntityConstants.kMaxUsernameLen)
    private String username;

    @Column(name="password", nullable=false)
    @NotNull(message="Password cannot be null.")
    @Size(min=EntityConstants.kMinUserPasswordLen,
        max=EntityConstants.kMaxUserPasswordLen,
        message="Password must be between 8 and 20 characters.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
            message = "Password must contain at least one letter and one number")
    private String password;
    //invalid password and email should still be handled with the client-side to produce a graceful message


    @Column(name="email", nullable=false, unique=true)
    @NotNull(message="Email cannot be empty .")
    @Email
    private String email;

    //private Long role;

    //private boolean active;

    //private profilePicture;

    @JsonIgnore
    @OneToMany(mappedBy = "requester", cascade = CascadeType.ALL)
    private List<FriendRequest> sentFriendRequests = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "recipient", cascade = CascadeType.ALL)
    private List<FriendRequest> receivedFriendRequests = new ArrayList<>();


    // Define the friendships associated with this user
    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Friendship> friendships = new ArrayList<>();




}
