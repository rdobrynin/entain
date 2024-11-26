# PHP 8+ and React Test Assignment
- Laravel 11v
- PostgreSQL 14.1
- ReactJS

## Requirements
- docker
- composer v2.-.-
- yarn v2


## Useful commands

### How to launch

`make run`

### Access to container BE

`make app_shell`

### Run migrations

`make db`

### Revert last migration

`make db_revert`

### Show DB migration status

`make db_status`

### Run tests

`make test`

### How to stop and remove containers

`make down`

## access URL
http://localhost:4444

## PAGE STRUCTURE

### Login (Sign In page)
- http://localhost:4444/login

### Register (Sing up Page)
- http://localhost:44444/register

### Admin (Operations with Roles Page)
- http://localhost:4444/roles
- 
### Admin (Operations with Roles Page)
- http://localhost:4444/users

### Main (React TO-DO Page)
- http://localhost:8000/todo
