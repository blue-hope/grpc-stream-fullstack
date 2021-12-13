create table user
(
    `id` bigint not null auto_increment,
    `email` varchar(100) not null,
    `name` varchar(100) not null,
    primary key (`id`),
    unique key `ux_email` (`email`)
);

create table auth
(
    `id` bigint not null auto_increment,
    `password` varchar(100) not null,
    `refresh_token` varchar(255) null,
    `user_id` bigint,
    primary key (`id`),
    constraint `fx_a_user_id` foreign key (`user_id`) references user (`id`)
);

create table chat_room
(
    `id` bigint not null auto_increment,
    `name` varchar(100) null,
    `is_message_exist` boolean,
    `created_at` TIMESTAMP,
    primary key (`id`)
);

create table friend
(
    `id` bigint not null auto_increment,
    `sender_id` bigint,
    `receiver_id` bigint,
    `chat_room_id` bigint,
    `status` varchar(20),
    `created_at` TIMESTAMP,
    primary key (`id`),
    constraint `fx_f_sender_id` foreign key (`sender_id`) references user (`id`),
    constraint `fx_f_receiver_id` foreign key (`receiver_id`) references user (`id`),
    constraint `fx_f_chat_room_id` foreign key (`chat_room_id`) references chat_room(`id`),
    unique key `ux_sender_id_receiver_id` (`sender_id`, `receiver_id`)
);

create table chat_user
(
    `id` bigint not null auto_increment,
    `user_id` bigint,
    `chat_room_id` bigint,
    primary key (`id`),
    constraint `fx_cu_user_id` foreign key (`user_id`) references user (`id`),
    constraint `fx_cu_chat_room_id` foreign key (`chat_room_id`) references chat_room (`id`)
);

create table chat_message
(
    `id` bigint not null auto_increment,
    `chat_room_id` bigint,
    `chat_user_id` bigint,
    `message` varchar(255),
    `created_at` TIMESTAMP,
    primary key (`id`),
    constraint `fx_cm_chat_room_id` foreign key (`chat_room_id`) references chat_room (`id`),
    constraint `fx_cm_chat_user_id` foreign key (`chat_user_id`) references chat_user (`id`)
);