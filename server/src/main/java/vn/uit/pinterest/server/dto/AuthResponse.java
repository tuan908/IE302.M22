package vn.uit.pinterest.server.dto;

public class AuthResponse {
    String token;

    public String getToken() {
        return this.token;

    }

    public void setToken(String token) {
        this.token = token;
    }

    public AuthResponse(String token) {
        this.token = token;
    }
}
