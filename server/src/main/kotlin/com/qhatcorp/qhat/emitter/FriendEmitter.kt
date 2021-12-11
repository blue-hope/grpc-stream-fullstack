package com.qhatcorp.qhat.emitter

import com.qhatcorp.qhat.entity.Friend
import io.grpc.stub.StreamObserver
import grpc.qhat.friend.Message

class FriendEmitter {
    companion object {
        fun emitCreateResponse(
            responseObserver: StreamObserver<Message.CreateResponse>,
            friend: Friend
        ) {
            responseObserver.also {
                it.onNext(
                    Message.CreateResponse.newBuilder()
                        .apply {
                            this.friend = friend.toProto()
                        }
                        .build()
                )
                it.onCompleted()
            }
        }

        fun emitReadResponse(
            responseObserver: StreamObserver<Message.ReadResponse>,
            friends: List<Friend>
        ) {
            responseObserver.also {
                it.onNext(
                    Message.ReadResponse.newBuilder()
                        .apply {
                            this.addAllFriends(friends.map { friend -> friend.toProto() })
                        }
                        .build()
                )
                it.onCompleted()
            }
        }
    }
}