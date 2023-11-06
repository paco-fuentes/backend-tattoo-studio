# Welcome to my backend app

<details>
  <summary>Content 📝</summary>
  <ol>
    <li><a href="#objective">Objective</a></li>
    <li><a href="#about-the-project">About the Project</a></li>
    <li><a href="#deployment-🚀">Deployment</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#database-diagram">Database Diagram</a></li>
    <li><a href="#local-installation">Installation</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#future-features">Future Features</a></li>
    <li><a href="#contributions">Contributions</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## Objetive
This backend project required a functional API connected to a database with at least a one-to-many and many-to-many relationship through an intermediate table.

## About the Project
Backend API application for a worker, user, and appointment management system for a small tattoo studio. An administrator can manage their business by adding tattoo artists to their staff and handling all online content.

## Deploy 🚀
<div align="center">
    <a href="https://www.google.com"><strong>Url deployment coming soon... </strong></a>🚀🚀🚀
</div>

## Stack
Used stacks:
<div align="center">
<a href="https://www.mysql.com/">
    <img src= "https://img.shields.io/badge/mysql-3E6E93?style=for-the-badge&logo=mysql&logoColor=white"/>
</a>
<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a>
<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://www.typescriptlang.org/">
    <img src= "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
</a>
<a href="https://jwt.io//">
    <img src= "https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"/>
</a>
<a href="https://www.postman.com/">
    <img src= "https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"/>
</a>
 </div>


## Database Diagram
<img src="./img/table-relationship-diagram.png" align= "center"/>

## Local Installation
1. Clone the repository and run the following command to install the necessary dependencies:
```$ npm install``````
2. Connect your repository to the database by following the instructions in the env.example file, where the JWT key is also stored.
3. Run migrations:
``` $ npx typeorm-ts-node-commonjs migration:run -d ./src/db.ts ``` 
4. Run developer:
``` $ npm run dev ``` 
5. Execute the endpoints using Postman with the included http-tattoo-studio.postman_collection.json in the "./http" directory.
7. You can also compile to JavaScript and run the project with the following commands:
 ``` $ npm run build ```
 ``` $ npm run start ```

## Run in Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/30593617-05249675-7766-40ce-aea4-af483af6d4de?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D30593617-05249675-7766-40ce-aea4-af483af6d4de%26entityType%3Dcollection%26workspaceId%3D624a1798-d9bc-4ee8-842a-0c53f919503d)

## Endpoints
<details>
<summary>Endpoints</summary>

- HELLO

            GET http://localhost:4000/helloworld

- GUEST
     
    - GET ALL TATTOO ARTISTS
    
            GET http://localhost:4000/user/getalltattooartist

    - GET ALL TATTOOS
    
            GET http://localhost:4000/user/alltattoos

- ADMIN ENDPOINTS

    - REGISTER ADMIN

            POST http://localhost:4000/register/admin
        body:
        ``` json
            {
                "firstname": "Juan Manuel",
                "lastname": "Apellido Aburrido",
                "email": "admin@admin.com",
                "password": "12345",
                "phone": "123456789",
                "adress": "Calle del Admin, 12, 3, 46011, Valencia, España",
                "role": "admin"
            }
        ```

    - LOGIN

            POST http://localhost:4000/staff/login
        body:
        ``` json
            {
                "email": "admin@admin.com",
                "password": "12345"
            }
        ```
    - REGISTER TATTOO ARTIST

            POST http://localhost:4000/staff/register
        body:
        ``` json
            {
                "firstname": "Juan Manuel",
                "lastname": "El Tuerto",
                "email": "juan@manuel.com",
                "password": "12345",
                "phone": "99999999",
                "adress": "Calle con número, n/a"
            }
        ```
        auth: role admin required

    - GET ALL USERS

            POST http://localhost:4000/staff/getallusers

            auth: role admin required

    - DELETE USER BY ID

            POST http://localhost:4000/staff/deleteuser/111

            auth: role admin required

- TATTOO ARTISTS ENDPOINTS

    - LOGIN TATTOO ARTIST

            POST http://localhost:4000/staff/login
        body:
        ``` json
            {
                "email": "juan@manuel.com",
                "password": "12345"
            }
        ```
    - CREATE TATTOO

            POST http://localhost:4000/staff/addwork
        body:
        ``` json
            {
                "product_type": "tattoo",
                "title": "caravera",
                "description": "tatuaje de calavera del tamaño de una cara",
                "price": "99.99"
            }
        ```
        auth: role worker required

    - GET ALL MY APPOINTMENTES AS TATTOO ARTIST

            GET http://localhost:4000/staff/myappointments

        auth: role worker required

- TATTOO ARTISTS ENDPOINTS

    - REGISTER USER

            POST http://localhost:4000/user/register
        body:
        ``` json
            {
                "email": "user@user.com",
                "password": "12345"
            }
        ```

    - LOGIN USER

            POST http://localhost:4000/user/login
        body:
        ``` json
            {
                "email": "user@user.com",
                "password": "12345"
            }
        ```

     - UPDATE USER

            PUT http://localhost:4000/user/profile
        body:
        ``` json
            {
                "firstname": "Juan Manuel",
                "lastname": "Perez García",
                "email": "user@user.com",
                "password": "54321",
                "phone": "666333777",
                "adress": "Calle del user, 12, 3, 46011, Valencia, España"
            }
        ```
        auth: role user required

    - GET USER PROFILE

            GET http://localhost:4000/user/profile

        auth: role user required

    - CREATE APPOINTMENT

            POST http://localhost:4000/user/appointment
        body:
        ``` json
            {
                "tattoo_id": "1",
                "observations": "Lo quiero lo antes posible",
                "date": "10-11-2023"
            }
        ```
        auth: role user required

    - GET ONE APPOINTMENT

            GET http://localhost:4000/user/myappointments/:id

        auth: role user required

    - GET ALL MY APPOINTMENTS

            GET http://localhost:4000/user/myappointments/
        
    auth: role user required

    - UPDATE APPOINTMENT

            PUT http://localhost:4000/user/myappointments/:id
        body:
        ``` json
            {
                "observations": "Lo siento pero tengo que cambiar la fecha",
                "date": "12-11-2023"
            }
        ```
    auth: role user required

    - DELETE APPOINTMENT

           DEL http://localhost:4000/user/myappointments/:id

    auth: role user required


</details>


## Future Features
 [ ] Add validations
 [ ] Fix bug in appointment date validation with DayJs
 [ ] Fix bug where an incorrect date can be added when modifying an appointment.

## Contributions
Suggestions and contributions are always welcome.

Create a fork of the repository

1. By opening an issue.
2. Create a fork of the repository
    - Create a new branch
        ```
        $ git checkout -b feature/userName/newFeature
        ```
    - Commit your changes
        ```
        $ git commit -m 'feat: my new feature'
        ```
    - Push the branch
        ```
        $ git push origin feature/userName-feature
        ```
    - Open a Pull Request.

## License

This project is under an MIT license.

## Contact

Paco Fuentes. 2023

<a href = "mailto:pacofuentes.work@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/paco-fuentes-805a40290/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</p>
