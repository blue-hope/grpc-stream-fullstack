package com.qhatcorp.qhat.service

import com.qhatcorp.qhat.entity.Friend
import com.qhatcorp.qhat.entity.FriendStatus
import com.qhatcorp.qhat.entity.User
import com.qhatcorp.qhat.repository.FriendRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class FriendService(
    private val friendRepository: FriendRepository,
) {
    fun createFriend(senderId: Long, receiverId: Long): Friend {
        val friend = Friend(
            senderId = senderId,
            receiverId = receiverId,
            status = FriendStatus.PENDING,
            createdAt = LocalDateTime.now()
        )
        return friendRepository.save(friend)
    }

    fun getAllSentFriends(userId: Long): List<Friend> {
        val statuses = listOf(FriendStatus.PENDING, FriendStatus.REFUSED, FriendStatus.RECEIVED)
        return friendRepository.getAllBySenderIdAndStatusIn(userId, statuses)
    }

    fun getAllReceivedFriends(userId: Long): List<Friend> {
        val statuses = listOf(FriendStatus.PENDING, FriendStatus.RECEIVED)
        return friendRepository.getAllByReceiverIdAndStatusIn(userId, statuses)
    }

    fun getAllAcceptedFriends(userId: Long): List<Friend> {
        val statuses = listOf(FriendStatus.ACCEPTED)
        return friendRepository.getAllBySenderIdAndStatusIn(userId, statuses) +
                friendRepository.getAllByReceiverIdAndStatusIn(userId, statuses)
    }
}