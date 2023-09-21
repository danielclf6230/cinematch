package com.cm.cinematchapp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import com.cm.cinematchapp.entities.User;
import com.cm.cinematchapp.repositories.UserRepository;
import com.cm.cinematchapp.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class EntityTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    /**
     * @throws java.lang.Exception
     */
    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.openMocks(this); // Initialize mocks
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


}
