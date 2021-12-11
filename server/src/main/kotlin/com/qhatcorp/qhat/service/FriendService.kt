package com.qhatcorp.qhat.service

import com.qhatcorp.qhat.entity.Friend
import com.qhatcorp.qhat.entity.FriendStatus
import com.qhatcorp.qhat.repository.FriendRepository
import com.qhatcorp.qhat.repository.UserRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import javax.transaction.Transactional

@Service
class FriendService(
    private val userRepository: UserRepository,
    private val friendRepository: FriendRepository,
) {
    fun createFriend(senderId: Long, receiverId: Long): Friend {
        val friend = Friend(
            sender = userRepository.getById(senderId),
            receiver = userRepository.getById(receiverId),
            status = FriendStatus.PENDING,
            createdAt = LocalDateTime.now()
        )
        return friendRepository.save(friend)
    }

    fun getAllSentFriends(userId: Long): List<Friend> {
        val statuses = listOf(FriendStatus.PENDING, FriendStatus.REFUSED)
        return friendRepository.getAllBySenderIdAndStatusIn(userId, statuses)
    }

    fun getAllReceivedFriends(userId: Long): List<Friend> {
        val statuses = listOf(FriendStatus.PENDING)
        return friendRepository.getAllByReceiverIdAndStatusIn(userId, statuses)
    }

    fun getAllAcceptedFriends(userId: Long): List<Friend> {
        val statuses = listOf(FriendStatus.ACCEPTED, FriendStatus.ACCEPTED_REVERSE)
        return friendRepository.getAllBySenderIdAndStatusIn(userId, statuses).sortedBy { it.receiver.userName }
    }

    @Transactional
    fun cancelFriend(friendId: Long, userId: Long) {
        val friend = friendRepository.getById(friendId)
        if (friend.sender.id == userId && friend.status == FriendStatus.PENDING) {
            friendRepository.delete(friend)
        }
    }

    @Transactional
    fun acceptFriend(friendId: Long, userId: Long) {
        val friend = friendRepository.getById(friendId)
        if (friend.receiver.id == userId && friend.status == FriendStatus.PENDING) {
            val friendReversed = Friend(
                sender = friend.receiver,
                receiver = friend.sender,
                status = FriendStatus.ACCEPTED_REVERSE,
                createdAt = LocalDateTime.now()
            )
            friendRepository.saveAll(listOf(friend.apply { this.status = FriendStatus.ACCEPTED }, friendReversed))
        }
    }

    @Transactional
    fun refuseFriend(friendId: Long, userId: Long) {
        val friend = friendRepository.getById(friendId)
        if (friend.receiver.id == userId && friend.status == FriendStatus.PENDING) {
            friendRepository.save(friend.apply { this.status = FriendStatus.REFUSED })
        }
    }

    fun checkRelationExist(userId: Long, friendId: Long): Boolean {
        return friendRepository.existsBySenderIdAndReceiverId(userId, friendId) ||
                friendRepository.existsBySenderIdAndReceiverId(friendId, userId)
    }
}