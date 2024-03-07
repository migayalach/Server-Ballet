create database ballet

use ballet

create table level(
  idLevel int auto_increment not null,
  nameLevel varchar(100) not null,
  primary key(idLevel)
);

create table extension(
  idExtension int auto_increment not null,
  nameExtension varchar (4) unique not null,
  primary key(idExtension) 
);

create table user(
  idUser int auto_increment not null,
  idLevel int not null,
  idExtension int not null,
  nameUser varchar(100) not null,
  emailUser varchar(100) unique not null,
  carnet int unique not null,
  registrationNumber varchar(20) unique not null,
  enabled boolean default false not null,
  password varchar(100) not null,
  primary key(idUser),
  foreign key(idLevel) references level(idLevel),
  foreign key(idExtension) references extension(idExtension)
);

create table class(
  idClass int auto_increment not null,
  nameClass varchar(255) unique not null,
  primary key(idClass)
);

create table classUser(
  idClass int not null,
  idUser int not null,
  foreign key(idClass) references class(idClass),
  foreign key(idUser) references user(idUser)
);

create table qualification(
  idClass int not null,
  idUser int not null,
  qualification JSON not null,
  foreign key(idClass) references class(idClass),
  foreign key(idUser) references user(idUser)
);

create table assistance(
  idUser int not null,
  idClass int not null,
  record JSON not null,
  foreign key(idClass) references class(idClass),
  foreign key(idUser) references user(idUser)
);

create table payments(
  idPayment int auto_increment not null,
  idUser int not null,
  idClass int not null,
  total double(7,2) not null default 0.00,
  debit double(7,2) not null default 0.00,
  onAcount double(7,2) not null default 0.00,
  dateRegistered date not null,
  primary key(idPayment),
  foreign key(idClass) references class(idClass),
  foreign key(idUser) references user(idUser)
);