DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id int not null primary key auto_increment,
  message varchar(140),
  roomname varchar(20),
  user_id int
);

CREATE TABLE users (
  id int not null primary key auto_increment,
  username varchar(20)
);


ALTER TABLE messages ADD FOREIGN KEY (user_id) REFERENCES users (id);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

insert into users (username) values ('A'), ('B'), ('C'), ('D');

insert into messages (message, user_id, roomname) values ('whatever', 4, 1),
('test1', 4, 'room1'),
('test2', 1, 'room2'),
('test3', 2, 'room3'),
('test5', 2, 'room1'),
('test6', 2, 'room2'),
('test4', 3, 'lobby');

