create database if not exist jamdb;
use jamdb;
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
insert into member(acc,pwd,isOneclick,aliases,link,intro) 
values("Mike@jam.com","encrypted",0,"Monkey","some links ","some intro" );
insert into member(acc,pwd,isOneclick,aliases,link,intro) 
values("Chuck@hotmail.com","encrypted",0,"Chalk","some links ","some intro" );
insert into member(acc,pwd,isOneclick,aliases,link,intro) 
values("sdd@gmail.com","encrypted",0,"depthCharge","some links ","some intro" );
insert into member(acc,pwd,isOneclick,aliases,link,intro) 
values("deaf3355@pdd.com","encrypted",0,"isNully","some links ","some intro" );
insert into member(acc,pwd,isOneclick,aliases,link,intro) 
values("diana554@yahoo.com","encrypted",0,"Diana","some links ","some intro" );
insert into member(acc,pwd,isOneclick,aliases,link,intro) 
values("lorem@ipsum.com","encrypted",0,"Logger","some links ","some intro" );
insert into member(acc,pwd,isOneclick,aliases,link,intro) 
values("studio8982@hotmusic.com","encrypted",0,"RealHotStudio","some links ","some intro" );
insert into member(acc,pwd,isOneclick,aliases,link,intro) 
values("deadlyguitar1234@funeral.com","encrypted",0,"NoJokingAround","somelinks","some intro" );

