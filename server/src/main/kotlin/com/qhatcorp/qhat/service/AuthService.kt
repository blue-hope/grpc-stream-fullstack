package com.qhatcorp.qhat.service

import com.qhatcorp.qhat.entity.Auth
import com.qhatcorp.qhat.entity.User
import com.qhatcorp.qhat.interceptor.AuthorizationInterceptor
import com.qhatcorp.qhat.repository.AuthRepository
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.mindrot.jbcrypt.BCrypt
import org.springframework.stereotype.Service
import java.sql.Timestamp
import java.time.LocalDateTime

@Service
class AuthService(
    private val authRepository: AuthRepository
) {
    private val accessTokenKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(AuthorizationInterceptor.ACCESS_TOKEN_KEY))
    private val refreshTokenKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(AuthorizationInterceptor.REFRESH_TOKEN_KEY))

    private fun createAccessToken(userId: Long): String {
        return Jwts.builder()
            .setIssuer("https://qhat.qhatcorp.com")
            .setSubject(userId.toString())
            .setIssuedAt(Timestamp.valueOf(LocalDateTime.now()))
            .setExpiration(Timestamp.valueOf(LocalDateTime.now().plusDays(1)))
            .signWith(accessTokenKey)
            .compact()
    }

    private fun createRefreshToken(userId: Long): String {
        return Jwts.builder()
            .setIssuer("https://qhat.qhatcorp.com")
            .setSubject(userId.toString())
            .setIssuedAt(Timestamp.valueOf(LocalDateTime.now()))
            .setExpiration(Timestamp.valueOf(LocalDateTime.now().plusMonths(1)))
            .signWith(refreshTokenKey)
            .compact()
    }

    fun getAuthByUserId(userId: Long): Auth? {
        return authRepository.getByUserId(userId)
    }

    fun checkPassword(hashedPassword: String, originalPassword: String): Boolean {
        return BCrypt.checkpw(originalPassword, hashedPassword)
    }

    fun hashPassword(password: String): String {
        val salt = BCrypt.gensalt()
        return BCrypt.hashpw(password, salt)
    }

    fun createJwt(user: User): Pair<String, String> {
        return Pair(createAccessToken(user.id!!), createRefreshToken(user.id!!))
    }

    fun saveRefreshToken(auth: Auth, refreshToken: String) {
        authRepository.save(
            auth.apply {
                this.refreshToken = refreshToken
            }
        )
    }
}