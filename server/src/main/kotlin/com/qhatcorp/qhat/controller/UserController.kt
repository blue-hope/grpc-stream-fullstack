package com.qhatcorp.qhat.controller

import com.qhatcorp.qhat.service.UserService
import grpc.qhat.user.Message
import grpc.qhat.user.UserServiceGrpc
import io.grpc.stub.StreamObserver
import org.lognet.springboot.grpc.GRpcService

@GRpcService
class UserController(
    private val userService: UserService
): UserServiceGrpc.UserServiceImplBase() {
    override fun create(
        request: Message.CreateRequest,
        responseObserver: StreamObserver<Message.CreateResponse>
    ) {
        val user = userService.createUser(request)
        responseObserver.onNext(
            Message.CreateResponse.newBuilder()
                .apply {
                    this.user = user.toProto()
                }
                .build()
        )
        responseObserver.onCompleted()
    }
}