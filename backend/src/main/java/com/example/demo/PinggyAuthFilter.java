package com.example.demo;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class PinggyAuthFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("PinggyAuthHeader");

        if (authHeader == null || authHeader.trim().isEmpty()) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "PinggyAuthHeader is required");
            return;
        }

        try {
            AuthHeaderHolder.setAuthHeader(authHeader);
            filterChain.doFilter(request, response);
        } finally {
            AuthHeaderHolder.clear();
        }
    }
}
