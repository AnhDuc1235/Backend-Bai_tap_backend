import mysql from 'mysql2/promise';

// Create the connection to database
export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'fullstack',
  password: "123456",
  port: 3306,
});

//ORM, Query Builder
//ORM = Object Relation Mapping
//Ánh xạ Object bên ngôn ngữ lập trình sang cấu trúc ở trong database (Bảng, Cột)
//Lập trình viên: chỉ cần thao tác với Object bên ngôn ngữ lập trình -> ORM tự động chuyển thành sql -> thông qua Driver -> Database



