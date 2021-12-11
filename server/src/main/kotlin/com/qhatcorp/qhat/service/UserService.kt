package com.qhatcorp.qhat.service

import com.qhatcorp.qhat.entity.Auth
import com.qhatcorp.qhat.entity.User
import com.qhatcorp.qhat.repository.UserRepository
import grpc.qhat.user.Message
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
class UserService(
    private val authService: AuthService,
    private val friendService: FriendService,
    private val userRepository: UserRepository
) {
    @Transactional
    fun createUser(request: Message.CreateRequest): User {
        val user = User.fromProto(request.user)
        val auth = Auth(
            user = user,
            password = authService.hashPassword(request.password)
        )
        return userRepository.save(
            user.apply {
                this.auth = auth
            }
        )
    }

    fun getUserByEmail(email: String): User? {
        return userRepository.getByEmail(email)
    }

    fun search(userId: Long, searchKeyword: String): List<User> {
        return userRepository.getAllByIdNotAndEmailLike(userId, "%$searchKeyword%").filterNot {
            friendService.checkRelationExist(userId, it.id!!)
        }
    }
}