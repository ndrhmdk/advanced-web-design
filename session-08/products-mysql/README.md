## **Creating Database on MySQL**
```shell
mysql> select * from product;
+----+---------------------+--------+---------------------------------+---------------------+
| id | name                | price  | description                     | created_at          |
+----+---------------------+--------+---------------------------------+---------------------+
|  1 | iPhone 15           | 799.99 | Apple smartphone latest model   | 2026-09-26 21:13:35 |
|  2 | Samsung Galaxy S24  | 849.00 | Flagship Samsung phone with AI  | 2026-09-26 21:13:35 |
|  3 | Mechanical Keyboard |  59.50 | Blue switch RGB gaming keyboard | 2026-09-26 21:13:35 |
+----+---------------------+--------+---------------------------------+---------------------+
3 rows in set (0.00 sec)

mysql> describe product;
+-------------+---------------+------+-----+-------------------+-------------------+
| Field       | Type          | Null | Key | Default           | Extra             |
+-------------+---------------+------+-----+-------------------+-------------------+
| id          | int           | NO   | PRI | NULL              | auto_increment    |
| name        | varchar(255)  | NO   |     | NULL              |                   |
| price       | decimal(10,2) | NO   |     | NULL              |                   |
| description | text          | YES  |     | NULL              |                   |
| created_at  | timestamp     | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-------------+---------------+------+-----+-------------------+-------------------+
5 rows in set (0.01 sec)
```