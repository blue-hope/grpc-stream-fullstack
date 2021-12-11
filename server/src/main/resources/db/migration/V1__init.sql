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
    constraint `fx_user_id` foreign key (`user_id`) references user (`id`)
);

create table friend
(
    `id` bigint not null auto_increment,
    `sender_id` bigint,
    `receiver_id` bigint,
    `status` varchar(20),
    `created_at` TIMESTAMP,
    primary key (`id`),
    constraint `fx_sender_id` foreign key (`sender_id`) references user (`id`),
    constraint `fx_receiver_id` foreign key (`receiver_id`) references user (`id`),
    unique key `ux_sender_id_receiver_id` (`sender_id`, `receiver_id`)
)