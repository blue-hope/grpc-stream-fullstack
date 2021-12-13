package com.qhatcorp.qhat.emitter

import com.qhatcorp.qhat.entity.ChatMessage
import com.qhatcorp.qhat.entity.ChatRoom
import com.qhatcorp.qhat.entity.User
import io.grpc.stub.StreamObserver
import grpc.qhat.chat.Message

class ChatEmitter {
    companion object {
        fun emitCreateResponse(
            responseObserver: StreamObserver<Message.CreateResponse>,
            chatRoom: ChatRoom,
            user: User
        ) {
            responseObserver.also {
                it.onNext(
                    Message.CreateResponse.newBuilder()
                        .apply {
                            this.chatRoom = chatRoom.toProto()
                            this.addAllChatUsers(chatRoom.chatUsers.map { chatUser -> chatUser.toProto() })
                            this.chatUserMe =
                                chatRoom.chatUsers.find { chatUser -> chatUser.user.id == user.id }!!.toProto()
                        }
                        .build()
                )
                it.onCompleted()
            }
        }

        fun emitReadResponse(
            responseObserver: StreamObserver<Message.ReadResponse>,
            chatMessages: List<ChatMessage>
        ) {
            responseObserver.also {
                it.onNext(
                    Message.ReadResponse.newBuilder()
                        .apply {
                            this.addAllChatMessages(chatMessages.map { chatMessage -> chatMessage.toProto() })
                        }
                        .build()
                )
                it.onCompleted()
            }
        }

        fun emitMessage(
            responseObservers: List<StreamObserver<Message.MessageResponse>>,
            chatMessage: ChatMessage
        ) {
            responseObservers.forEach { responseObserver ->
                responseObserver.also {
                    it.onNext(
                        Message.MessageResponse.newBuilder()
                            .apply {
                                this.chatMessage = chatMessage.toProto()
                            }
                            .build()
                    )
                }
            }
        }
    }
}