package com.cm.cinematchapp;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.cm.cinematchapp.entities.FriendRequest;
import com.cm.cinematchapp.entities.User;
import com.cm.cinematchapp.exceptions.DuplicateObjectException;
import com.cm.cinematchapp.repositories.FriendRequestRepository;
import com.cm.cinematchapp.repositories.UserRepository;
import com.cm.cinematchapp.services.FriendRequestService;
import com.cm.cinematchapp.services.UserService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class EntityTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private FriendRequestService friendRequestService;

    @Mock
    private FriendRequestRepository friendRequestRepository;

    /**
     * @throws java.lang.Exception
     */
    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.openMocks(this); // Initialize mocks
    }

    @AfterEach
    void tearDown() {
        testEntityManager.clear();
    }


    /**
     * Test method for {@link com.cm.cinematchapp.services.UserService#createUser(User)}
     */
    @Test
    void testCreateUser() {
        // Create a user object for testing
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setUsername("johndoe");
        user.setPassword("password");
        user.setEmail("johndoe@example.com");

        // Mock the behavior of userRepository.save() to return the user object
        when(userRepository.save(user)).thenReturn(user);

        // Call the createUser method
        User createdUser = userService.createUser(user);

        // Verify that userRepository.save() was called with the user object
        verify(userRepository, times(1)).save(user);

        // Check if the returned user matches the original user
        assertEquals("John", createdUser.getFirstName());
        assertEquals("Doe", createdUser.getLastName());
        assertEquals("johndoe", createdUser.getUsername());
        assertEquals("password", createdUser.getPassword());
        assertEquals("johndoe@example.com", createdUser.getEmail());
    }


    @Test
    void testExistsByEmail() {
        // Create a sample user
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setUsername("johndoe");
        user.setPassword("ValidPass123");
        user.setEmail("johndoe@example.com");

        // Mock the behavior of existsByEmail
        when(userRepository.existsByEmail("johndoe@example.com")).thenReturn(true);
        when(userRepository.existsByEmail("nonexistent@example.com")).thenReturn(false);

        // Check if email exists
        assertTrue(userRepository.existsByEmail("johndoe@example.com"));
        assertFalse(userRepository.existsByEmail("nonexistent@example.com"));
    }

    /**
     * Test creating a user with a duplicate email.
     */
    @Test
    void testCreateUserWithDuplicateEmail() {


        // Create a new user with the same email
        User newUser = new User();
        newUser.setFirstName("John");
        newUser.setLastName("Doe");
        newUser.setUsername("johndoe");
        newUser.setPassword("NewPass123");
        newUser.setEmail("johndoe@example.com"); // Duplicate email

        when(userRepository.existsByEmail("johndoe@example.com")).thenReturn(true);

        // Ensure that creating the user with a duplicate email throws an exception
        assertThrows(DuplicateObjectException.class, () -> {
            userService.createUser(newUser);
        });



        // Verify that userRepository.save() was not called for the new user
        verify(userRepository, never()).save(newUser);
    }


    /**
     * Test creating a user with invalid email.
     */
    @Test
    void testCreateUserWithInvalidEmail() {
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setUsername("johndoe");
        user.setPassword("password");
        user.setEmail("invalid-email"); // Invalid email

        assertThrows(DataIntegrityViolationException.class, () -> {
            userService.createUser(user);
        });

        verify(userRepository, never()).save(user);
    }


    @Test
    void testGetFriendRequestsByUserId() {
        // Given a user's ID
        Long userId = 123L;

        User requester = new User();
        requester.setFirstName("John");
        requester.setLastName("Doe");
        requester.setUsername("johndoe");
        requester.setPassword("password");
        requester.setEmail("johndoe@example.com");

        System.out.println(requester.getUserId());

        User user = new User();
        user.setFirstName("Jane");
        user.setLastName("Doe");
        user.setUsername("janedoe");
        user.setPassword("password");
        user.setEmail("janedoe@example.com");

        System.out.println(requester.getUserId());

        when(userRepository.save(requester)).thenReturn(requester);
        User createdRequester = userService.createUser(requester);

        when(userRepository.save(user)).thenReturn(user);
        User createdUser = userService.createUser(user);




    }


}
