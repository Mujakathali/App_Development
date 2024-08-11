package com.example.hall_booking.auth;

import com.example.hall_booking.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String first_name;
    private String last_name;
    private String phone;
    private String email;
    private String password;
    
    
    @Builder.Default
    private Role role = Role.USER;  // Default role
}
