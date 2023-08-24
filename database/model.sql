CREATE DATABASE fruit_store;

CREATE TABLE category( 
    id serial primary key,
    name varchar(30) not null,
    is_active boolean default true,
    created_at timestamp default current_timestamp
);

CREATE TABLE workers(
    id serial primary key,
    fullname varchar(32) not null,
    email varchar(50),
    password text not null,
    role boolean not null,
    is_active boolean default 'true',
    created_at timestamp default current_timestamp
);


CREATE TABLE product( 
    id serial primary key,
    name varchar(20) not null,
    kg float not null,
    price float not null,
    category_id INT REFERENCES category(id),
    is_active boolean default true,
    created_at timestamp default current_timestamp
);


CREATE TABLE history(
    id serial primary key,
    workers_id integer references workers(id),
    product_id integer references product(id),
    id_sell boolean not null,
    kg float not null,
    price float not null,
    created_at timestamp default current_timestamp
);



    







































