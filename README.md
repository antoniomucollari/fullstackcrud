# Full Stack CRUD Application

![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue)

A full stack CRUD application using Angular for the frontend and Spring Boot for the backend.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Create**: Add new contacts to the list.
- **Read**: View contacts with pagination.
- **Update**: Edit existing contacts.
- **Delete**: Remove  contacts.
- Error handling when server is down or 404.
- Loading snippet when server is fetching
- Toast nodification for http requests

## Technology Stack

| Frontend  | Backend      | Database  | Tools        |
|-----------|--------------|-----------|--------------|
| Angular   | Spring Boot  | POSTGRESQL| Postman      |
| TypeScript| Java         |           | Git          |
|           |Jpa& Hibernate|           | JetBrains    |
## Getting Started

### Prerequisites
- Node.js 
- JDK
- POSTGRESQL
- GIT

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/antoniomucollari/fullstackcrud/
2. **Install dependencies**:
    ```bash
    //angular
    npm install
    //spring boot
    mvn spring-boot:run 
## 3.Properties changes:
    -Into properties of spring boot change username, url, password according to your postgress or if your not using Postgresql change postgresql to you database for example MySql
### 4.Run both (angular and spring boot):
    //angular
    ng serve
    //spring boot
    go to application and run in top of the ide 
### 5.Images configuration:
    Into downloads add a folder uploads and there you can download images to use for contacts
## Screenshots
![Main Page](./screenshots/1.jpg)
### Add Item Form
![Add Contact Form](./screenshots/2.jpg)
### Edit Item Page
![Edit Item Page](./screenshots/3.jpg)
### After edit toast nodification
![After edit toast nodification](./screenshots/4.jpg)
### Edit but id is not found
![Edit but id is not found](./screenshots/5.jpg)
### Loading until fetched
![Loading until fetched](./screenshots/6.jpg)
### Paginator
![Paginator](./screenshots/1.jpeg)
### On delete
![On delete](./screenshots/7.jpg)
### Server down
![Server down](./screenshots/8.jpg)
