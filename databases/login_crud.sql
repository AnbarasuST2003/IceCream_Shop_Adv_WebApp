create database login_crud;
use login_crud;
show tables;
create table users
(
ID int auto_increment primary key,
NAME varchar(100),
EMAIL varchar(100),
PASS varchar(200)
);

use login_crud;
create table adminlogin(
ID int auto_increment primary key,
name varchar(400),
password varchar(100)
);

select * from adminlogin;
select * from users;
