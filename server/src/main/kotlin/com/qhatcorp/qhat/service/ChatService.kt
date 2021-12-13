package com.qhatcorp.qhat.service

import com.qhatcorp.qhat.entity.ChatMessage
import com.qhatcorp.qhat.entity.ChatRoom
import com.qhatcorp.qhat.entity.ChatUser
import com.qhatcorp.qhat.entity.User
import com.qhatcorp.qhat.repository.ChatMessageRepository
import com.qhatcorp.qhat.repository.ChatRoomRepository
import com.qhatcorp.qhat.repository.ChatUserRepository
import grpc.qhat.chat.Message
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import javax.transaction.Transactional

@Service
class ChatService(
    private val chatRoomRepository: ChatRoomRepository,
    private val chatUserRepository: ChatUserRepository,
    private val chatMessageRepository: ChatMessageRepository,
) {
    private fun createChatUser(chatRoom: ChatRoom, user: User): ChatUser {
        val chatUser = ChatUser(
            user = user,
            chatRoom = chatRoom
        )
        return chatUserRepository.save(chatUser)
    }

    @Transactional
    fun createChatRoom(users: List<User>): ChatRoom {
        val chatRoom = ChatRoom(
            isMessageExist = false,
            createdAt = LocalDateTime.now()
        )
        chatRoomRepository.save(chatRoom)
        users.forEach {
            createChatUser(chatRoom, it)
        }
        return chatRoom
    }

    fun createChatMessage(chatUserProto: Message.ChatUserProto, message: String): ChatMessage {
        val chatUser = ChatUser.fromProto(chatUserProto)
        val chatMessage = ChatMessage(
            chatRoom = chatUser.chatRoom,
            chatUser = chatUser,
            message = message,
            createdAt = LocalDateTime.now()
        )
        val chatRoom = chatUser.chatRoom
        if(!chatRoom.isMessageExist) {
            chatRoomRepository.save(chatRoom.apply {
                isMessageExist = true
            })
        }
        return chatMessageRepository.save(chatMessage)
    }

    fun getAllChatMessage(chatRoom: ChatRoom): List<ChatMessage> {
        return chatMessageRepository.getAllByChatRoomId(chatRoom.id!!)
    }
}