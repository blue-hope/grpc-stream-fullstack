package com.qhatcorp.qhat.entity

import com.google.protobuf.Timestamp
import com.qhatcorp.qhat.util.toTimestamp
import grpc.qhat.friend.Message
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.Convert
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table
import javax.persistence.UniqueConstraint

enum class FriendStatus(val value: String) {
    PENDING("PENDING"),
    RECEIVED("RECEIVED"),
    ACCEPTED("ACCEPTED"),
    REFUSED("REFUSED");
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
    @JoinColumn(
        name = "sender_id",
        insertable = false,
        updatable = false
    )
    val sender: User? = null,
    @Column(name = "sender_id")
    val senderId: Long,
    @ManyToOne(
        fetch = FetchType.EAGER,
        optional = false
    )
    @JoinColumn(
        name = "receiver_id",
        insertable = false,
        updatable = false
    )
    val receiver: User? = null,
    @Column(name = "receiver_id")
    val receiverId: Long,
    val status: FriendStatus,
    val createdAt: LocalDateTime
) {
    companion object {

    }
    fun toProto(): Message.FriendProto {
        return Message.FriendProto.newBuilder()
            .setId(id!!)
            .setSender(sender!!.toProto())
            .setReceiver(receiver!!.toProto())
            .setCreatedAt(createdAt.toTimestamp())
            .setStatus(when (status) {
                FriendStatus.PENDING -> Message.FriendStatus.PENDING
                FriendStatus.RECEIVED -> Message.FriendStatus.RECEIVED
                FriendStatus.ACCEPTED -> Message.FriendStatus.ACCEPTED
                FriendStatus.REFUSED -> Message.FriendStatus.REFUSED
            })
            .build()
    }

}