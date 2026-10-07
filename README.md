# Employee Management System

A CRUD-based Employee Management System built with Java, Spring Boot, Spring Data JPA, MySQL, HTML, CSS and JavaScript.

## Technologies

- Java 21
- Spring Boot 4.1.1
- Spring Data JPA
- MySQL
- REST API
- HTML5
- CSS3
- JavaScript
- Maven

## Database Setup

Open MySQL and run:

```sql
CREATE DATABASE employee_management_system;
```

Then open:

`src/main/resources/application.properties`

Change:

```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

to your actual MySQL password.

## Run the Project

From the project folder:

```powershell
.\mvnw spring-boot:run
```

Open in the browser:

`http://localhost:8080`

## REST API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get employee by ID |
| POST | `/api/employees` | Add employee |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |

## Sample JSON

```json
{
  "name": "Durga",
  "email": "durga@example.com",
  "department": "IT",
  "salary": 35000
}
```
