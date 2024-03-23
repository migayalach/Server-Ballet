create database ballet

use ballet

-- OK
create table level(
  idLevel int auto_increment not null,
  nameLevel varchar(100) not null,
  primary key(idLevel)
);

-- OK
create table extension(
  idExtension int auto_increment not null,
  department varchar (4) unique not null,
  primary key(idExtension) 
);

-- OK
create table staff(
  idStaff int auto_increment not null,
  idLevel int not null,
  idExtension int not null,
  nameStaff varchar(100) not null,
  lastNameStaff varchar(100) not null,
  emailStaff varchar(100) unique not null,
  passwordStaff varchar(100) not null,
  addressStaff varchar(500),
  dateBirthStaff date,
  carnetStaff int unique not null,
  photoStaff text,
  stateStaff boolean default true not null,
  primary key(idStaff),
  foreign key(idLevel) references level(idLevel),
  foreign key(idExtension) references extension(idExtension)
);

-- OK
create table hours(
  idHours int auto_increment not null,
  startTime time not null,
  endTime time not null,
  totalTime time not null,
  stateHours boolean default true not null,
  primary key(idHours)
);

-- OK
create table typeClass(
  idTypeClass int auto_increment not null,
  nameClass varchar(100) not null,
  description varchar(255),
  primary key(idTypeClass)
);

-- OK
create table class(
  idClass int auto_increment not null,
  idHours int not null,
  idStaff int not null,
  idTypeClass int not null,
  parallel varchar(8) not null,
  stateClass boolean default true not null,
  primary key(idClass),
  foreign key(idHours) references hours(idHours),
  foreign key(idStaff) references staff(idStaff),
  foreign key(idTypeClass) references typeClass(idTypeClass)
);

-- OK
create table student(
  idStudent int auto_increment not null,
  idLevel int not null,
  idExtension int not null,
  nameStudent varchar(100) not null,
  lastNameStudent varchar(100) not null,
  emailStudent varchar(100) unique not null,
  passwordStudent varchar(100) not null,
  carnetStudent int unique not null,
  addressStudent varchar(500) not null,
  dateBirthStudent date not null,
  codeStudent varchar(20) unique not null,
  photoStudent text,
  stateStudent boolean default true not null,
  primary key(idStudent),
  foreign key(idLevel) references level(idLevel),
  foreign key(idExtension) references extension(idExtension)
);

create table payments(
  idStudent int auto_increment not null,
  idClass int not null,
  paymentDate date not null,
  onAccount double(7,2) default 0,
  debt double(7,2) default 0,
  total double(7,2) default 0,
  foreign key(idStudent) references student(idStudent),
  foreign key(idClass) references class(idClass)
);

create table qualification(
  idClass int not null,
  idStudent int not null,
  notes JSON,
  average double(7,2),
  foreign key(idClass) references class(idClass),
  foreign key(idStudent) references student(idStudent)
);

create table assistance(
  idStudent int not null,
  idClass int not null,
  record JSON,
  foreign key(idClass) references class(idClass),
  foreign key(idStudent) references student(idStudent)
);
