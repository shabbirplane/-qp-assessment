QP Assessment

Features
Admin Responsibilities
Add new grocery items to the system.
View all existing grocery items.
Remove grocery items from the system.
Update details (e.g., name, price) of existing grocery items.
Manage inventory levels of grocery items.

User Responsibilities
View a list of available grocery items.
Place orders for multiple grocery items in a single request.

Technologies Used
Node.js: Backend runtime environment.
Express: Web framework for route handling.
Sequelize: ORM for database interactions.
MySQL/PostgreSQL: Relational database for storing grocery and user data.
jsonwebtoken: For signing and verifying JWT tokens.
Docker: Containerization for easy deployment and scalability.

API

Authentication
Sign Up
Endpoint: POST /api/auth/signup
Description: Register a new user.
Request Body:
{
"name": "John Doe",
"email": "john@example.com",
"password": "securepassword",
"role": "admin" // or "user"
}
Response:
{
"message": "User registered successfully",
"token": "JWT_TOKEN"
}

Login
Endpoint: POST /api/auth/login
Description: Authenticate and retrieve a JWT token.
Request Body:
{
"email": "john@example.com",
"password": "securepassword"
}
Response:
{
"message": "Login successful",
"token": "JWT_TOKEN"
}

Admin Endpoints
Add New Grocery Item
Endpoint: POST /api/admin/grocery
Request Body:
{
"name": "Apple",
"price": 3.5,
"inventory": 100,
"description": "Fresh apples"
}
Response:
{
"message": "Grocery item added successfully",
"itemId": 1
}

Get All Grocery Items
Endpoint: GET /api/admin/groceries
Response:
[
{
"id": 1,
"name": "Apple",
"price": 3.5,
"inventory": 100,
"description": "Fresh apples"
}
]

Update Grocery Item
Endpoint: PUT /api/admin/grocery/:id
Request Body:
{
"price": 4.0,
"inventory": 120
}
Response:

{
"message": "Grocery item updated successfully"
}
Delete Grocery Item
Endpoint: DELETE /api/admin/grocery/:id
Response:
{
"message": "Grocery item deleted successfully"
}
Update Inventory
Endpoint: PATCH /api/admin/grocery/:id/inventory
Request Body:
{
"inventory": 150
}
Response:
{
"message": "Inventory updated successfully",
"newInventory": 150
}
User Endpoints
Get All Grocery Items
Endpoint: GET /api/user/groceries
Response:
[
{
"id": 1,
"name": "Apple",
"price": 3.5,
"inventory": 100,
"description": "Fresh apples"
}
]
Place an Order
Endpoint: POST /api/user/order
Request Body:
{
"items": [
{ "id": 1, "quantity": 2 },
{ "id": 2, "quantity": 5 }
]
}
Response:
{
"message": "Order placed successfully",
"totalPrice": 25.5
}

Role-Based Access Control
Admin Routes:
Requires role: "admin".
Protected using the JWT middleware.

User Routes:
Accessible by both user and admin roles.
Permissions validated via middleware.
JWT Middleware
The JWT token is passed in the Authorization header as Bearer <TOKEN>. The middleware verifies the token and checks the user's role.
