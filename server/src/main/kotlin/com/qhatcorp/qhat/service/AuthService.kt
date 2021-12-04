package com.qhatcorp.qhat.service

import com.qhatcorp.qhat.entity.Auth
import com.qhatcorp.qhat.entity.User
import com.qhatcorp.qhat.interceptor.AuthorizationInterceptor
import com.qhatcorp.qhat.repository.AuthRepository
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.mindrot.jbcrypt.BCrypt
import org.springframework.stereotype.Service
import java.security.KeyFactory
import java.security.spec.PKCS8EncodedKeySpec
import java.sql.Timestamp
import java.time.LocalDateTime

@Service
class AuthService(
    private val authRepository: AuthRepository
) {
    private val key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(AuthorizationInterceptor.JWT_SIGNING_KEY))
    private fun hashPassword(password: String): String {
        val salt = BCrypt.gensalt()
        return BCrypt.hashpw(password, salt)
    }

    fun getAuth(password: String): Auth {
        return Auth(
            password = hashPassword(password),
        )
    }

    fun login(user: User, password: String): Boolean {
        return authRepository.getByUserId(user.id!!)?.let {
            BCrypt.checkpw(password, it.password)
        } ?: false
    }

    fun createJwt(user: User): String {
        return Jwts.builder()
            .setIssuer("https://qhat.qhatcorp.com")
            .setSubject(user.id!!.toString())
            .setIssuedAt(Timestamp.valueOf(LocalDateTime.now()))
            .setExpiration(Timestamp.valueOf(LocalDateTime.now().plusDays(1)))
            .signWith(key)
            .compact()
    }
}