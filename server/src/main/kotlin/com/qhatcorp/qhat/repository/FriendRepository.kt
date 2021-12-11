package com.qhatcorp.qhat.repository

import com.qhatcorp.qhat.entity.Friend
import com.qhatcorp.qhat.entity.FriendStatus
import org.springframework.data.jpa.repository.JpaRepository

interface FriendRepository: JpaRepository<Friend, Long> {
    fun getAllBySenderIdAndStatusIn(senderId: Long, statuses: List<FriendStatus>): List<Friend>
    fun getAllByReceiverIdAndStatusIn(receiverId: Long, statuses: List<FriendStatus>): List<Friend>
}