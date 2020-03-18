# Lambda with RDS ( with RDS-Proxy)

## node-version

`v12.16.1`

## DBMS

MySQL

## premise

Using [serverless framework](https://serverless.com/)
Please setup!!

## How to use

### npm install

```
$ npm install
```

### configure DB info

- for local development

```
$ cp config/local/local.yml.default config/local/local.yml
```

1. modify DB info with LocalDB
2. If you use default state, please create MySQL DB & table

```
create TABLE users  (
  id MEDIUMINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  age INT,
  PRIMARY KEY (id)
)
```

- for dev deploy

```
$ cp config/dev/local.yml.default config/dev/local.yml
```

1. modify DB info: RDS info
2. modify VPC info: RDS is beloging to VPC

### local development

Using [serverless offline](https://github.com/dherault/serverless-offline)

- Start-up at local

```
$ serverless offline --stage local
```

- access

```
http://localhsot:3000/local/
```

#### Useage

please using http cliant like postman

- get all users

```
get http://localhost:3000/local/users
```

- get one user

```
get http://localhost:3000/local/users/:{id}
```

- create user

```
post http://localhost:3000/local/users
body { name: 'test-name', age: 30 }
```

- update user

```
put http://localhost:3000/local/users/:{id}
body { name: 'update-name', age: 31 }
```

- delete user

```
delete http://localhost:3000/local/users/:{id}
```

## deploy lambda application

- deploy command

```
$ serverless deploy --stage dev
```

- AWS RDS Proxy settings

please setup RDS Proxy settings [ref](https://aws.amazon.com/jp/blogs/compute/using-amazon-rds-proxy-with-aws-lambda/)
