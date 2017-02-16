create table member(
		userId int not null primary key auto_increment,
		acc varchar(70),
		pwd varchar(16),
		isOneclick boolean,
		aliases varchar(70),
		link text,
		pic blob,
		intro text
)character set utf8  collate utf8_bin ;


