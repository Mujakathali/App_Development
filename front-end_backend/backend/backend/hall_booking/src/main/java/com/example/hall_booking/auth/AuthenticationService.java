package com.example.hall_booking.auth;




import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.hall_booking.config.JwtService;
import com.example.hall_booking.model.Token;
import com.example.hall_booking.model.User1;
import com.example.hall_booking.repository.TokenRepo;
import com.example.hall_booking.repository.UserRepo;

@Service
@RequiredArgsConstructor
public class AuthenticationService {


    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TokenRepo tokenRepo;

    public AuthenticationResponse register(RegisterRequest request) {
        var user  = User1.builder()
                .first_name(request.getFirst_name())
                .last_name(request.getLast_name())
                .role(request.getRole())
                .phone(request.getPhone())
                .email(request.getEmail())
                
                .password(passwordEncoder.encode(request.getPassword()))
              
                .build();
        userRepo.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepo.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .build();

    }

    private void saveUserToken(User1 user, String accessToken) {
        var token = Token.builder().user(user).token(accessToken).expired(false).revoked(false).build();
        tokenRepo.save(token);
    }

    private void revokeAllUserTokens(User1 user) {
        var validUserTokens = tokenRepo.findAllByUser_IdAndExpiredFalseAndRevokedFalse(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepo.saveAll(validUserTokens);
    }

    public void logout(String username) {
        System.out.println("Logout Functionality Called");
        var user = userRepo.findByEmail(username).orElseThrow();
        revokeAllUserTokens(user);
    }


}
