package com.qhatcorp.qhat.repository

import com.qhatcorp.qhat.entity.Auth
import org.springframework.data.jpa.repository.JpaRepository

interface AuthRepository: JpaRepository<Auth, Long> {
    fun getByUserId(userId: Long): Auth?
}