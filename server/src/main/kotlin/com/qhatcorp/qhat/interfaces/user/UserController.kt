package com.qhatcorp.qhat.interfaces.user

import grpc.qhat.user.Message
import grpc.qhat.user.UserServiceGrpc
import io.grpc.stub.StreamObserver
import org.lognet.springboot.grpc.GRpcService

@GRpcService
class UserController: UserServiceGrpc.UserServiceImplBase() {
    override fun createUser(
        request: Message.CreateRequest?,
        responseObserver: StreamObserver<Message.CreateResponse>?
    ) {
        val user = request?.user;
        responseObserver?.onNext(
            Message.CreateResponse.newBuilder()
                .apply {
                    this.user = user
                }
                .build()
        )
        responseObserver?.onCompleted()
    }
}