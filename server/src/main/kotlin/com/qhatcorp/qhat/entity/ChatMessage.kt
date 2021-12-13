package com.qhatcorp.qhat.entity

import com.qhatcorp.qhat.extension.toTimestamp
import grpc.qhat.chat.Message
import java.time.LocalDateTime
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

@Entity
@Table(name = "chat_message")
class ChatMessage(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    @ManyToOne(
        fetch = FetchType.EAGER,
        optional = false
    )
    @JoinColumn(name = "chat_room_id")
    val chatRoom: ChatRoom,
    @ManyToOne(
        fetch = FetchType.EAGER,
        optional = false
    )
    @JoinColumn(name = "chat_user_id")
    val chatUser: ChatUser,
    val message: String,
    val createdAt: LocalDateTime,
) {
    fun toProto(): Message.ChatMessageProto {
        return Message.ChatMessageProto
            .newBuilder()
            .setId(id!!)
            .setChatUser(chatUser.toProto())
            .setMessage(message)
            .setCreatedAt(createdAt.toTimestamp())
            .build()
    }
}