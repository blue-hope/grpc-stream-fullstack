package com.qhatcorp.qhat.repository

import com.qhatcorp.qhat.entity.ChatMessage
import org.springframework.data.jpa.repository.JpaRepository

interface ChatMessageRepository: JpaRepository<ChatMessage, Long> {
    fun getAllByChatRoomId(chatRoomId: Long): List<ChatMessage>
}