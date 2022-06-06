package vn.uit.pinterest.server.dto;

public class AuthenticationResponse {
    String token;

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public AuthenticationResponse(String token) {
        this.token = token;
    }
}
