package com.qhatcorp.qhat.service

import com.qhatcorp.qhat.entity.Auth
import com.qhatcorp.qhat.repository.AuthRepository
import org.mindrot.jbcrypt.BCrypt
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val authRepository: AuthRepository
) {
    private fun hashPassword(password: String): Pair<String, String> {
        val salt = BCrypt.gensalt()
        return Pair(BCrypt.hashpw(password, salt), salt)
    }

    fun createAuth(password: String): Auth {
        val (hashedPassword, salt) = hashPassword(password)
        return authRepository.save(
            Auth(
                password = hashedPassword,
                salt = salt
            )
        )
    }
}