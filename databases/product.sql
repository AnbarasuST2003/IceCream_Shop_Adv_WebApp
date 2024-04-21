create database product_crud;

use product_crud;

create table products(
ID int auto_increment primary key,
NAME varchar(150),
IMAGE varchar(200),
DES varchar(200),
About varchar(200)

);


use  product_crud;

create table OFFERS(

ID int auto_increment primary key,
ICECREAM varchar(400),
SCOUP varchar(400),
PHOTO varchar(400),
IMAGE varchar(400),
QUANTITY varchar(50),
CUANTITY  varchar(50),
price varchar(400)

);

use product_crud;
create table PRO(
ID int auto_increment primary key,
NAME varchar(400),
IMAGE varchar(100)

);
select * from PRO

select * from OFFERS
