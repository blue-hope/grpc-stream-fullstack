package com.qhatcorp.qhat.util

import com.google.protobuf.Timestamp
import java.time.LocalDateTime
import java.time.ZoneOffset

fun LocalDateTime.toTimestamp(): Timestamp {
    val instant = this.toInstant(ZoneOffset.UTC)
    return Timestamp
        .newBuilder()
        .setSeconds(instant.epochSecond)
        .setNanos(instant.nano)
        .build()
}