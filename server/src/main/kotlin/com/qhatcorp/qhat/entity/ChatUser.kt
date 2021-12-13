package com.qhatcorp.qhat.entity

import grpc.qhat.chat.Message
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

@Entity
@Table(name = "chat_user")
class ChatUser(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    @ManyToOne(
        fetch = FetchType.EAGER,
        optional = false
    )
    @JoinColumn(name = "user_id")
    val user: User,
    @ManyToOne(
        fetch = FetchType.EAGER,
        optional = false
    )
    @JoinColumn(name = "chat_room_id")
    val chatRoom: ChatRoom,
) {
    companion object {
        fun fromProto(chatUserProto: Message.ChatUserProto): ChatUser {
            return ChatUser(
                id = chatUserProto.id,
                user = User.fromProto(chatUserProto.user),
                chatRoom = ChatRoom.fromProto(chatUserProto.chatRoom)
            )
        }
    }

    fun toProto(): Message.ChatUserProto {
        return Message.ChatUserProto
            .newBuilder()
            .setId(id!!)
            .setUser(user.toProto())
            .setChatRoom(chatRoom.toProto())
            .build()
    }
}