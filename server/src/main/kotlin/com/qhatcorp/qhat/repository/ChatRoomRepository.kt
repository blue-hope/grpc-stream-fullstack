package com.qhatcorp.qhat.repository

import com.qhatcorp.qhat.entity.ChatRoom
import org.springframework.data.jpa.repository.JpaRepository

interface ChatRoomRepository : JpaRepository<ChatRoom, Long> {

}