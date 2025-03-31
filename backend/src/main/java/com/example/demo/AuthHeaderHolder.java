package com.example.demo;

    // AuthHeaderHolder.java
    public class AuthHeaderHolder {
        private static final ThreadLocal<String> authHeader = new ThreadLocal<>();

        public static void setAuthHeader(String value) {
            authHeader.set(value);
        }

        public static String getAuthHeader() {
            return authHeader.get();
        }

        public static void clear() {
            authHeader.remove();
        }
    }

