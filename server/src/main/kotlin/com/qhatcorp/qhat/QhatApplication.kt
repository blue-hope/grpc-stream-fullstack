package com.qhatcorp.qhat

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class QhatApplication

fun main(args: Array<String>) {
    runApplication<QhatApplication>(*args)
}
