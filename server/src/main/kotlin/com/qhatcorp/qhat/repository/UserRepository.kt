package com.qhatcorp.qhat.repository

import com.qhatcorp.qhat.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository: JpaRepository<User, Long> {
    fun getByEmail(email: String): User?
    fun getAllByEmailLike(searchKeyword: String): List<User>
}