create table user
(
    `id` long not null auto_increment,
    `email` varchar(100) not null,
    `name` varchar(100) not null,
    primary key (`id`),
    unique key `ux_email` (`email`)
);

create table auth
(
    `id` long not null auto_increment,
    `password` varchar(100) not null,
    `refresh_token` varchar(255) null,
    `user_id` int,
    primary key (`id`),
    constraint `fx_user_id` foreign key (`user_id`) references user (`id`)
);

create table friend
(
    `id` long not null auto_increment,
    `sender_id` long,
    `receiver_id` long,
    `status` varchar(20),
    `createdAt` TIMESTAMP,
    primary key (`id`),
    constraint `fx_sender_id` foreign key (`sender_id`) references user (`id`),
    constraint `fx_receiver_id` foreign key (`receiver_id`) references user (`id`)
)