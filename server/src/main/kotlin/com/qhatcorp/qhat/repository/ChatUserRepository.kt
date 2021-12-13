package com.qhatcorp.qhat.repository

import com.qhatcorp.qhat.entity.ChatUser
import org.springframework.data.jpa.repository.JpaRepository

interface ChatUserRepository : JpaRepository<ChatUser, Long> {}