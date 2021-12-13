package com.qhatcorp.qhat.entity

import com.qhatcorp.qhat.extension.toLocalDateTime
import com.qhatcorp.qhat.extension.toTimestamp
import grpc.qhat.chat.Message
import java.time.LocalDateTime
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.OneToMany
import javax.persistence.Table

@Entity
@Table(name = "chat_room")
class ChatRoom(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    val name: String? = null,
    var isMessageExist: Boolean,
    val createdAt: LocalDateTime,
    @OneToMany(
        fetch = FetchType.EAGER,
        mappedBy = "chatRoom"
    )
    val chatUsers: List<ChatUser> = listOf()
) {
    companion object {
        fun fromProto(chatRoomProto: Message.ChatRoomProto): ChatRoom {
            return ChatRoom(
                id = chatRoomProto.id,
                name = chatRoomProto.name,
                isMessageExist = chatRoomProto.isMessageExist,
                createdAt = chatRoomProto.createdAt.toLocalDateTime()
            )
        }
    }

    fun toProto(): Message.ChatRoomProto {
        return Message.ChatRoomProto.newBuilder()
            .setId(id!!)
            .setName(name ?: "")
            .setIsMessageExist(isMessageExist)
            .setCreatedAt(createdAt.toTimestamp())
            .build()
    }
}