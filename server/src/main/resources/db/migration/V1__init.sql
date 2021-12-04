create table user
(
    `id` int not null auto_increment,
    `email` varchar(100) not null,
    `name` varchar(100) not null,
    primary key (`id`),
    unique key `ux_email` (`email`)
);

create table auth
(
    `id` int not null auto_increment,
    `password` varchar(100) not null,
    `user_id` int,
    primary key (`id`),
    constraint `fx_user_id` foreign key (`user_id`) references user (`id`)
)