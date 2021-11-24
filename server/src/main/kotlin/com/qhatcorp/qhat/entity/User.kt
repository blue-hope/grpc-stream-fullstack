package com.qhatcorp.qhat.entity

import grpc.qhat.user.Message
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "user")
class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    val email: String,
    val userName: String
) {
    companion object {
        fun fromProto(userProto: Message.UserProto): User {
            return User(
                id = userProto.id,
                email = userProto.email,
                userName = userProto.userName
            )
        }
    }
    fun toProto(): Message.UserProto {
        return Message.UserProto.newBuilder()
            .setId(id!!)
            .setEmail(email)
            .setUserName(userName)
            .build()
    }
}