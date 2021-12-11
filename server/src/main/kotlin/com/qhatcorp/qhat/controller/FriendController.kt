package com.qhatcorp.qhat.controller

import com.google.protobuf.Empty
import com.qhatcorp.qhat.emitter.FriendEmitter
import com.qhatcorp.qhat.interceptor.AuthorizationInterceptor
import com.qhatcorp.qhat.service.FriendService
import grpc.qhat.friend.FriendServiceGrpc
import grpc.qhat.friend.Message
import io.grpc.Status
import io.grpc.stub.StreamObserver
import org.lognet.springboot.grpc.GRpcService
import org.springframework.dao.DataIntegrityViolationException

@GRpcService
class FriendController(
    private val friendService: FriendService
): FriendServiceGrpc.FriendServiceImplBase() {
    override fun create(
        request: Message.CreateRequest,
        responseObserver: StreamObserver<Message.CreateResponse>
    ) {
        val errStatus = Status.ALREADY_EXISTS.withDescription("이미 친구이거나 신청을 보냈습니다.")
        val senderId = AuthorizationInterceptor.CLIENT_ID_CONTEXT_KEY.get().toLong()
        val receiverId = request.receiverId
        try {
            val friend = friendService.createFriend(senderId, receiverId)
            FriendEmitter.emitCreateResponse(responseObserver, friend)
        } catch (e: DataIntegrityViolationException) {
            responseObserver.onError(errStatus.asRuntimeException())
        }
    }

    override fun readSent(
        request: Empty,
        responseObserver: StreamObserver<Message.ReadResponse>
    ) {
        val userId = AuthorizationInterceptor.CLIENT_ID_CONTEXT_KEY.get().toLong()
        val friends = friendService.getAllSentFriends(userId)
        FriendEmitter.emitReadResponse(responseObserver, friends)
    }

    override fun readReceived(
        request: Empty,
        responseObserver: StreamObserver<Message.ReadResponse>
    ) {
        val userId = AuthorizationInterceptor.CLIENT_ID_CONTEXT_KEY.get().toLong()
        val friends = friendService.getAllReceivedFriends(userId)
        FriendEmitter.emitReadResponse(responseObserver, friends)
    }

    override fun readAccepted(
        request: Empty,
        responseObserver: StreamObserver<Message.ReadResponse>
    ) {
        val userId = AuthorizationInterceptor.CLIENT_ID_CONTEXT_KEY.get().toLong()
        val friends = friendService.getAllAcceptedFriends(userId)
        FriendEmitter.emitReadResponse(responseObserver, friends)
    }
}