create table "todos" (
    id serial primary key,
    userId text not null,
    text text not null,
    completed boolean not null
);

