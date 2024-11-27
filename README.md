# PHP 8 + and React + RxJS Redux Middleware Test Assignment
- Laravel 11v
- PostgreSQL 14.1
- ReactJS with RxJS redux middleware via epics

## Requirements
- docker
- composer v2.-.-
- yarn v2


## Useful commands

### How to launch

`make run`


### How to launch manually

1. `composer install` install BE dependencies
2. `docker compose up or (docker-comp0se run)` - depends version
3. `docker exec roman-app php artisan migrate:fresh --seed`
4. `yarn install` - add dependencies for root
5. `cd frontend` - react located in /frontend folder
6. `yarn install` - install FE dependencies
7. `yarn dev` - start DEV FE 
8open `http://localhost:3000/`

### [URls]()
- `http://localhost:3000/register` - register page
- `http://localhost:3000/login` - login page
- `http://localhost:3000/todo` - CRUD TODO
- `http://localhost:3000/users` - view users with roles

### Roles
- `Admin`
- `User`

#### Permissions
- `view-todo`
- `delete-todo`
- `edit-todo`
- `create-todo`

#### Example

User `_7_dummy_user@entain.com` with role User CAN NOT view and todo with remove action icons
User `_8_dummy_user@entain.com` with role Admin CAN view todo with remove action icons

### Roles and Permissions
- `User` can only view-todo and edit todo
- `Admin` can do all CRUD

### Predefined users

- `user_1@entain.com` with role `ADMIN`
- `user_2@entain.com` with role `User`

### User's Passwords 
- all users password `11111111` 

### Dummy Users
Added 20 dummy users with prefixes `_{n}_dummy_user@entain.com`
Added 20 dummy todos.

### LOGIC

Admin role can view all users todos
User can view only his todos

#### Remove items
Remove items added soft-delete 
(added additional DB column `deleted_at`)

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
http://localhost:3000

## PAGE STRUCTURE

### Login (Sign In page)
- http://localhost:3000/login

### Register (Sing up Page)
- http://localhost:3000/register

### Admin (Operations with Roles Page)
- http://localhost:3000/users

### Main (React TO-DO Page)
- http://localhost:3000/todo
