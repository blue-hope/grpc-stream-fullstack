package com.qhatcorp.qhat.controller

import com.qhatcorp.qhat.emitter.UserEmitter
import com.qhatcorp.qhat.interceptor.AuthorizationInterceptor
import com.qhatcorp.qhat.service.FriendService
import com.qhatcorp.qhat.service.UserService
import grpc.qhat.user.Message
import grpc.qhat.user.UserServiceGrpc
import io.grpc.stub.StreamObserver
import org.lognet.springboot.grpc.GRpcService

@GRpcService
class UserController(
    private val userService: UserService
) : UserServiceGrpc.UserServiceImplBase() {
    override fun search(
        request: Message.SearchRequest,
        responseObserver: StreamObserver<Message.SearchResponse>
    ) {
        val userId = AuthorizationInterceptor.CLIENT_ID_CONTEXT_KEY.get().toLong()
        if (request.searchKeyword.isNullOrBlank()) {
            UserEmitter.emitSearchResponse(responseObserver, listOf())
        } else {
            val users = userService.search(userId, request.searchKeyword)
            UserEmitter.emitSearchResponse(responseObserver, users)
        }
    }
}