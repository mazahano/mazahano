# MAZAHANO Fashion E-commerce

Full-stack MERN application for MAZAHANO - a premium streetwear fashion brand.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (Must be installed and running locally on port `27017`)
- **Git** (for version control)

## 🚀 Installation & Setup

1.  **Clone the Repository** (if not already done)
    ```bash
    git clone <repository_url>
    cd antiG
    ```

2.  **Install Dependencies**
    You need to install dependencies for both the backend (server) and frontend (client).

    ```bash
    # Install Server Dependencies
    cd server
    npm install

    # Install Client Dependencies
    cd ../client
    npm install
    ```

3.  **Environment Configuration**
    The `server/.env` file is pre-configured with defaults for local development:
    ```env
    MONGO_URI=mongodb://localhost:27017/mazahano
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

4.  **Seed the Database**
    Populate the database with initial sample data (Products and Users).
    *Make sure MongoDB is running before executing this!*
    ```bash
    cd server
    node seeder.js
    ```
    
    **Default Accounts:**
    - **Admin:** `admin@example.com` / `password123`
    - **User:** `john@example.com` / `password123`

---

## 🏃 Running the Application

To run the full stack application, you will need two terminal windows.

**Terminal 1: Start the Backend API**
```bash
cd server
npm run dev
# Server will run on http://localhost:5000
```

**Terminal 2: Start the Frontend React App**
```bash
cd client
npm run dev
# Client will run on http://localhost:5173 (or similar)
```

Open your browser and navigate to the URL shown in the client terminal (usually `http://localhost:5173`) to use the website.

---

## 🛒 How to Use the Website

### For Customers
1.  **Browse Products**: Visit the **Shop** page to view the latest streetwear collection. Use the search bar to find specific items.
2.  **Product Details**: Click on any product to see detailed images, descriptions, and available sizes.
3.  **Cart & Checkout**:
    - Add items to your cart.
    - Proceed to Checkout.
    - Fill in shipping details and place an order (Mock payment integration).
4.  **User Account**:
    - **Register/Login** to save your details and view order history.
    - Go to **Profile** to see past orders.

### For Administrators
*Currently, product management is handled via the Database Seeder or API interaction.*
- **Manage Products**: modify the data in `server/data/products.js` and re-run `node seeder.js` to update the catalog.
- **View Orders**: Log in with the Admin account to view special admin routes (if configured) or check the database directly.

---

## 🛠 Maintenance & Troubleshooting

### Keeping the System Updated
To ensure security and stability, regularly update your dependencies:
```bash
# Update Server
cd server
npm update

# Update Client
cd client
npm update
```

### Database Backups
It is critical to backup your MongoDB data regularly.
```bash
# Create a backup of the 'mazahano' database
mongodump --db mazahano --out /path/to/backup/directory
```

### Common Issues & Fixes

**1. "Connection Refused" or Database Errors**
- **Cause**: MongoDB is not running.
- **Fix**: Start the MongoDB service.
  - Windows: Open Services app -> Start `MongoDB Server`.
  - Mac/Linux: Run `brew services start mongodb-community` or `sudo systemctl start mongod`.

**2. "EADDRINUSE: address already in use"**
- **Cause**: The port (5000 or 5173) is already taken by another process.
- **Fix**:
  - Stop the other process.
  - OR change the `PORT` in `server/.env` and restart the server.

**3. Changes not showing in Frontend**
- **Fix**: Creating a production build often solves caching issues if testing locally.
  ```bash
  cd client
  npm run build
  npm run preview
  ```

---

## 📂 Project Structure

- **`client/`**: React Frontend
  - `src/pages`: Main view routes (Home, Shop, Cart, etc.)
  - `src/components`: Reusable UI components
  - `src/context`: Global state (Cart, User Auth)
- **`server/`**: Node.js/Express Backend
  - `models/`: Database schemas (User, Product, Order)
  - `routes/`: API endpoint definitions
  - `controllers/`: Logic for handling requests
  - `middleware/`: Auth and Error handling
