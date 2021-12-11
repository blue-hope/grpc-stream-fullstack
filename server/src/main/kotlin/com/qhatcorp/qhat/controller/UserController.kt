package com.qhatcorp.qhat.controller

import com.qhatcorp.qhat.emitter.UserEmitter
import com.qhatcorp.qhat.service.UserService
import grpc.qhat.user.Message
import grpc.qhat.user.UserServiceGrpc
import io.grpc.stub.StreamObserver
import org.lognet.springboot.grpc.GRpcService

@GRpcService
class UserController(
    private val userService: UserService
): UserServiceGrpc.UserServiceImplBase() {
    override fun read(
        request: Message.ReadRequest,
        responseObserver: StreamObserver<Message.ReadResponse>
    ) {
        val users = userService.getAllUsersByEmail(request)
        UserEmitter.emitReadResponse(responseObserver, users)
    }
}