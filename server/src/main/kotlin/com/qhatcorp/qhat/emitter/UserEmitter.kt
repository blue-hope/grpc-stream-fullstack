package com.qhatcorp.qhat.emitter

import com.qhatcorp.qhat.entity.User
import io.grpc.stub.StreamObserver
import grpc.qhat.user.Message

class UserEmitter {
    companion object {
        fun emitCreateResponse(
            responseObserver: StreamObserver<Message.CreateResponse>,
            user: User
        ) {
            responseObserver.also {
                it.onNext(
                    Message.CreateResponse.newBuilder()
                        .apply {
                            this.user = user.toProto()
                        }
                        .build()
                )
                it.onCompleted()
            }
        }

        fun emitReadResponse(
            responseObserver: StreamObserver<Message.ReadResponse>,
            users: List<User>
        ) {
            responseObserver.also {
                it.onNext(
                    Message.ReadResponse.newBuilder()
                        .apply {
                            this.addAllUsers(users.map { user -> user.toProto() })
                        }
                        .build()
                )
                it.onCompleted()
            }
        }
    }
}