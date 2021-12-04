package com.qhatcorp.qhat.entity

import grpc.qhat.user.Message
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.OneToOne
import javax.persistence.Table
import javax.persistence.UniqueConstraint

@Entity
@Table(name = "user")
class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    @Column(unique = true)
    val email: String,
    @Column(name = "name")
    val userName: String,
    @OneToOne(
        fetch = FetchType.LAZY,
        cascade = [CascadeType.ALL],
        mappedBy = "user"
    )
    var auth: Auth? = null
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