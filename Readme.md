# Admin Setup Instructions

## How to Make a User an Admin

Since the admin panel requires admin role access, you need to manually set a user's role to 'admin' in the database.

### Method 1: Using MongoDB Compass or MongoDB Shell

1. Open MongoDB Compass or connect via MongoDB Shell
2. Connect to your database: `mongodb://localhost:27017/ecommerce`
3. Navigate to the `users` collection
4. Find your user account
5. Edit the document and change the `role` field from `"user"` to `"admin"`
6. Save the changes

### Method 2: Using MongoDB Shell Command

```bash
# Connect to MongoDB
mongosh

# Switch to your database
use ecommerce

# Update a user to admin (replace with your email)
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

### Accessing Admin Panel

Once your user has admin role:

1. Login to your account
2. Click on your profile dropdown in the header
3. You'll see a "Dashboard" option
4. Click it to access the admin panel

### Admin Features

- **Dashboard**: Overview of total sales, products, orders, and users
- **Products Management**: View all products, edit, delete
- **Orders Management**: View all orders, update order status, delete orders
- **Users Management**: View all users, edit user roles, delete users
- **Reviews Management**: View and manage product reviews

### Admin Routes

- `/admin/dashboard` - Admin Dashboard
- `/admin/products` - All Products List
- `/admin/orders` - All Orders List
- `/admin/users` - All Users List
- `/admin/product/:id` - Edit Product
- `/admin/order/:id` - Update Order
- `/admin/user/:id` - Edit User

### Notes

- The admin panel is protected by role-based authentication
- Only users with `role: "admin"` can access admin routes
- Backend API endpoints are also protected with admin authorization middleware
