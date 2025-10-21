<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A microservices architecture built with [Nest](https://github.com/nestjs/nest) framework, featuring a datasource service, product service, and order service. The system uses gRPC for inter-service communication and MySQL as the database. **Complete API documentation with Swagger UI is available for testing all endpoints.**

## Architecture Overview

- **Datasource Service**: Database layer with gRPC endpoints for data operations
- **Product Service**: Product management microservice
- **Order Service**: Order processing microservice
- **Frontend**: React application for user interface

## Project Setup

### Option 1: Docker Compose (Recommended)

To run all services with Docker:

```bash
# Navigate to the product-service directory
$ cd Backend/product-service

# Start all services with Docker Compose
$ docker-compose up --build -d
```

This will start:

- MySQL database (port 3307)
- Datasource API (port 5002)
- Product API (port 5000)
- Adminer (database admin interface on port 8080)

### Option 2: Local Development

If you prefer to run services locally without Docker:

#### 1. Database Setup

First, ensure you have MySQL running locally on port 3306 with:

- Database: `revest_db`
- Username: `root`
- Password: `Thisis@dmin`

#### 2. Install Dependencies

Navigate to each service directory and install dependencies:

```bash
# Datasource Service
$ cd Backend/datasource-service
$ npm install

# Product Service
$ cd Backend/product-service
$ npm install

# Order Service
$ cd Backend/order-service
$ npm install
```

#### 3. Start Services

Run each service in separate terminals:

```bash
# Terminal 1 - Datasource Service
$ cd Backend/datasource-service
$ npm run start:dev

# Terminal 2 - Product Service
$ cd Backend/product-service
$ npm run start:dev

# Terminal 3 - Order Service
$ cd Backend/order-service
$ npm run start:dev
```

## Compile and Run the Project

### Development Mode

```bash
# Watch mode (auto-restart on changes)
$ npm run start:dev

# Standard development
$ npm run start
```

### Production Mode

```bash
# Production build and run
$ npm run start:prod
```

## API Endpoints

### Datasource Service (Port 5002)

- gRPC endpoints for database operations
- Product and Order data management

### Product Service (Port 5000)

- REST API for product management
- gRPC client for datasource communication

### Order Service (Port 5001)

- REST API for order processing
- gRPC client for datasource communication

### Database Admin

- **Adminer**: http://localhost:8080
  - Server: `mysql` (Docker) or `localhost:3306` (Local)
  - Username: `root`
  - Password: `Thisis@dmin`
  - Database: `revest_db`

## 🔗 API Documentation & Testing

### Swagger UI Interface

**Interactive API Documentation** is available for all services with full testing capabilities:

#### Product Service API

- **URL**: http://localhost:5000/api
- **Features**: Product CRUD operations, search, filtering, pagination
- **Endpoints**: Create, Read, Update, Delete, List products

#### Order Service API

- **URL**: http://localhost:5001/api
- **Features**: Order management, status updates, order history
- **Endpoints**: Create orders, update status, list orders, order details

### 🚀 Quick Start with Swagger

1. **Start the services** using Docker Compose or local development
2. **Open Swagger UI** in your browser:
   - Product API: http://localhost:5000/api
   - Order API: http://localhost:5001/api
3. **Explore endpoints** - Click on any endpoint to see details
4. **Test APIs directly** - Use the "Try it out" button to make requests
5. **View responses** - See real request/response examples

### 📋 What You Can Do

- ✅ **Browse all available endpoints** with descriptions
- ✅ **Test API calls directly** from the browser interface
- ✅ **View request/response schemas** and examples
- ✅ **Validate API parameters** before making calls
- ✅ **Copy cURL commands** for external testing
- ✅ **Download OpenAPI specifications** for integration

## Environment Variables

### Datasource Service

```env
PORT=5002
PRODUCT_GRPC_SERVER_URL=0.0.0.0:7000
ORDER_GRPC_SERVER_URL=0.0.0.0:7001
DB_HOST=mysql
DB_PORT=3307
DB_USERNAME=root
DB_PASSWORD=Thisis@dmin
DB_NAME=revest_db
```

### Product Service

```env
PORT=5000
GRPC_DATASOURCE_URL=0.0.0.0:7000
```

### Order Service

```env
PORT=5001
GRPC_DATASOURCE_URL=0.0.0.0:7001
```

## Troubleshooting

### Docker Issues

- **Port conflicts**: Ensure ports 3307, 5000, 5001, 5002, and 8080 are available
- **Container not starting**: Check logs with `docker-compose logs [service-name]`
- **Database connection issues**: Wait for MySQL to fully initialize (can take 30-60 seconds)

### Local Development Issues

- **Database connection**: Ensure MySQL is running and credentials match
- **gRPC connection**: Verify service URLs and ports are correct
- **Proto file issues**: Ensure proto files are in the correct locations

### Common Commands

```bash
# View logs
$ docker-compose logs -f

# Restart specific service
$ docker-compose restart [service-name]

# Stop all services
$ docker-compose down

# Rebuild and start
$ docker-compose up --build
```
