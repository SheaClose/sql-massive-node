drop table if exists products;
create table products(
  productid serial primary key,
  name varchar(40),
  description varchar(40),
  price integer,
  imageurl text
);
