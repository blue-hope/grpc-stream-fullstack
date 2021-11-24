package com.qhatcorp.qhat.service

import com.qhatcorp.qhat.entity.User
import com.qhatcorp.qhat.repository.UserRepository
import grpc.qhat.user.Message
import org.springframework.stereotype.Service

@Service
class UserService(
    private val authService: AuthService,
    private val userRepository: UserRepository
) {
    fun createUser(request: Message.CreateRequest): User {
        val auth = authService.createAuth(request.password)
        return userRepository.save(
            User.fromProto(request.user)
        )
    }
}