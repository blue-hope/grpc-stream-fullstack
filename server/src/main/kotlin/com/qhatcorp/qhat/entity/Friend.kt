package com.qhatcorp.qhat.entity

import com.qhatcorp.qhat.util.toTimestamp
import grpc.qhat.friend.Message
import java.time.LocalDateTime
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table
import javax.persistence.UniqueConstraint

enum class FriendStatus {
    PENDING,
    ACCEPTED,
    REFUSED,
    ACCEPTED_REVERSE;
}

@Entity
@Table(
    name = "friend",
    uniqueConstraints = [
        UniqueConstraint(columnNames = ["sender_id", "receiver_id"])
    ]
)
class Friend(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    @ManyToOne(
        fetch = FetchType.EAGER,
        optional = false
    )
    @JoinColumn(name = "sender_id")
    val sender: User,
    @ManyToOne(
        fetch = FetchType.EAGER,
        optional = false
    )
    @JoinColumn(name = "receiver_id")
    val receiver: User,
    var status: FriendStatus,
    val createdAt: LocalDateTime
) {
    companion object {

    }
    fun toProto(): Message.FriendProto {
        return Message.FriendProto.newBuilder()
            .setId(id!!)
            .setSender(sender.toProto())
            .setReceiver(receiver.toProto())
            .setCreatedAt(createdAt.toTimestamp())
            .setStatus(when (status) {
                FriendStatus.PENDING -> Message.FriendStatus.PENDING
                FriendStatus.ACCEPTED -> Message.FriendStatus.ACCEPTED
                FriendStatus.REFUSED -> Message.FriendStatus.REFUSED
                FriendStatus.ACCEPTED_REVERSE -> Message.FriendStatus.ACCEPTED
            })
            .build()
    }

}