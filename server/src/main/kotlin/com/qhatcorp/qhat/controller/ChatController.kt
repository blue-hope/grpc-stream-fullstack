package com.qhatcorp.qhat.controller

import com.qhatcorp.qhat.emitter.ChatEmitter
import com.qhatcorp.qhat.entity.ChatRoom
import com.qhatcorp.qhat.entity.ChatUser
import com.qhatcorp.qhat.entity.User
import com.qhatcorp.qhat.interceptor.AuthorizationInterceptor
import com.qhatcorp.qhat.repository.UserRepository
import com.qhatcorp.qhat.service.ChatService
import com.qhatcorp.qhat.service.FriendService
import grpc.qhat.chat.ChatServiceGrpc
import grpc.qhat.chat.Message
import io.grpc.Status
import io.grpc.stub.StreamObserver
import org.lognet.springboot.grpc.GRpcService

@GRpcService
class ChatController(
    private val chatService: ChatService,
    private val friendService: FriendService,
    private val userRepository: UserRepository
) : ChatServiceGrpc.ChatServiceImplBase() {
    val connectionPool = mutableMapOf<Long, MutableMap<Long, StreamObserver<Message.MessageResponse>>>()

    private fun registerConnection(chatUser: Message.ChatUserProto, responseObserver: StreamObserver<Message.MessageResponse>) {
        if(connectionPool[chatUser.chatRoom.id].isNullOrEmpty()) {
            connectionPool[chatUser.chatRoom.id] = mutableMapOf(chatUser.id to responseObserver)
        } else {
            connectionPool[chatUser.chatRoom.id]!![chatUser.id] = responseObserver
        }
    }

    private fun getAllConnection(chatUser: Message.ChatUserProto): List<StreamObserver<Message.MessageResponse>> {
        return connectionPool[chatUser.chatRoom.id]?.values?.toList() ?: listOf()
    }

    override fun create(
        request: Message.CreateRequest,
        responseObserver: StreamObserver<Message.CreateResponse>,
    ) {
        val errStatus = Status.NOT_FOUND.withDescription("친구 상태가 아닌 유저와 채팅방을 개설할 수 없습니다.")
        val userId = AuthorizationInterceptor.CLIENT_ID_CONTEXT_KEY.get().toLong()
        val user = userRepository.getById(userId)
        val users = request.usersList.map { User.fromProto(it) }
        if (users.size == 1) {
            val chatRoom = friendService.getFriend(user, users[0])?.chatRoom ?: run {
                responseObserver.onError(errStatus.asRuntimeException())
                return
            }
            ChatEmitter.emitCreateResponse(responseObserver, chatRoom, user)
        } else {
            val chatRoom = chatService.createChatRoom(users.plus(user))
            ChatEmitter.emitCreateResponse(responseObserver, chatRoom, user)
        }
    }

    override fun read(
        request: Message.ReadRequest,
        responseObserver: StreamObserver<Message.ReadResponse>
    ) {
        val chatRoom = ChatRoom.fromProto(request.chatRoom)
        val chatMessages = chatService.getAllChatMessage(chatRoom)
        ChatEmitter.emitReadResponse(responseObserver, chatMessages)
    }

    override fun chat(
        responseObserver: StreamObserver<Message.MessageResponse>
    ): StreamObserver<Message.MessageRequest> {
        val errStatus = Status.UNAUTHENTICATED.withDescription("잘못된 요청입니다.")
        class ChatStreamObserver : StreamObserver<Message.MessageRequest> {
            override fun onNext(message: Message.MessageRequest) {
                val userId = AuthorizationInterceptor.CLIENT_ID_CONTEXT_KEY.get().toLong()
                val user = userRepository.getById(userId)
                val chatUser = message.chatMessage.chatUser
                registerConnection(chatUser, responseObserver)
                if (user.id!! != chatUser.user.id) {
                    responseObserver.onError(errStatus.asRuntimeException())
                }
                val chatMessage = chatService.createChatMessage(chatUser, message.chatMessage.message)
                ChatEmitter.emitMessage(getAllConnection(chatUser), chatMessage)
            }

            override fun onCompleted() {
                println(AuthorizationInterceptor.CLIENT_ID_CONTEXT_KEY.get().toLong())
            }

            override fun onError(t: Throwable) {}
        }
        return ChatStreamObserver()
    }
}