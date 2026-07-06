package com.resumeai.resume_ai_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.resumeai.resume_ai_backend.dto.LoginRequest;
import com.resumeai.resume_ai_backend.dto.RegisterRequest;
import com.resumeai.resume_ai_backend.model.User;
import com.resumeai.resume_ai_backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public String register(RegisterRequest request) {

        if (repository.findByEmail(request.getEmail()).isPresent()) {
            return "Email Already Exists";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        repository.save(user);

        return "Registration Successful";
    }

    public String login(LoginRequest request) {

        User user = repository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            return "User Not Found";
        }

        if (user.getPassword().equals(request.getPassword())) {
            return "Login Successful";
        }

        return "Invalid Password";
    }
}

