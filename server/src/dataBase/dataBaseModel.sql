create database balletJessica

use balletJessica

create table level(
  idLevel int auto_increment not null,
  nameLevel varchar(100) not null,
  primary key(idLevel)
);

create table extension(
  idExtension int auto_increment not null,
  department varchar (4) unique not null,
  primary key(idExtension) 
);

create table user(
  idUser int auto_increment not null,
  idLevel int not null,
  idExtension int not null,
  nameUser varchar(100) not null,
  lastNameUser varchar(100) not null,
  emailUser varchar(100) unique not null,
  passwordUser varchar(100) not null,
  addressUser varchar(500) default "",
  dateBirthUser date default null,
  carnetUser int unique not null,
  photoUser text default "",
  stateUser boolean default true not null,
  primary key(idUser),
  foreign key(idLevel) references level(idLevel),
  foreign key(idExtension) references extension(idExtension)
);

create table hours(
  idHours int auto_increment not null,
  startTime time not null,
  endTime time not null,
  totalTime time not null,
  stateHours boolean default true not null,
  primary key(idHours)
);

create table typeClass(
  idTypeClass int auto_increment not null,
  nameClass varchar(100) not null,
  description varchar(255),
  primary key(idTypeClass)
);

create table class(
  idClass int auto_increment not null,
  idHours int not null,
  idUser int not null,
  idTypeClass int not null,
  parallel varchar(8) not null,
  stateClass boolean default true not null,
  primary key(idClass),
  foreign key(idHours) references hours(idHours),
  foreign key(idUser) references user(idUser),
  foreign key(idTypeClass) references typeClass(idTypeClass)
);

create table student(
  idClass int not null,
  idUser int not null,
  stateStudent boolean default true not null,
  foreign key(idClass) references class(idClass),
  foreign key(idUser) references user(idUser)
);

create table params(
  idParams int auto_increment not null,
  idClass int not null,
  dateTest date not null,
  title varchar(500) not null,
  params JSON not null,
  noteFinish float not null default 0,
  primary key(idParams),
  foreign key(idClass) references class(idClass) 
);

create table qualification(
  idParams	int not null,
  idUser	int not null,
  qualification JSON not null,
  observation varchar (2500) not null default "",
  note float not null default 0,
  foreign key(idParams) references params(idParams),
  foreign key(idUser) references user(idUser)
);

create table assistance(
  idAssistance int auto_increment not null,
  idClass int not null,
  dateAssistance date not null,
  primary key(idAssistance),
  foreign key(idClass) references class (idClass)
);

create table attendance (
  idUser int not null,
  idAssistance int not null,
  assistance boolean not null default 0,
  foreign key(idUser) references user (idUser),
  foreign key(idAssistance) references assistance (idAssistance)
  -- idUser int not null,
  -- idClass int not null,
  -- dateAssistance date not null,
  -- assistance JSON not null,
  -- foreign key(idUser) references user(idUser),
  -- foreign key(idClass) references class(idClass)
);
