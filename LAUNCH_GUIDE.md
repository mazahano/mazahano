# MAZAHANO: NIKE-Brand Infrastructure Launch Guide

Congratulations! Your application has been upgraded with a meaningful **Nike Brand Infrastructure**. This guide will help you launch, maintain, and scale the application properly.

## 1. Quick Launch (Development)
The application runs on a Client-Server architecture. You need two separate terminals active.

### Terminal 1: Backend Server
The server handles logic, database connections, and the Nike-style API.
```bash
cd server
npm run dev
```
*Port: 5000*

### Terminal 2: Frontend Client
The client delivers the premium UI and animations.
```bash
cd client
npm run dev
```
*Port: 5175 (or 5173)*

---

## 2. Infrastructure Setup (One-Time)

### Database Seeding
To populate your store with high-quality Nike inventory (Air Force 1s, Tech Fleece, Jordans), run this command in the `server` folder:
```bash
npm run data:import
```
This resets the database and injects the new "Brand Story" content verified in your infrastructure upgrade.

### Environment Variables
Ensure your `.env` file in the `server` folder is configured:
```
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secure_secret>
```

---

## 3. Brand Infrastructure Features
Your new system is not just a website; it is a platform.

### A. Dynamic Trending Engine
**Location**: `HomePage.jsx` -> `server/controllers/productController.js`
- The homepage automatically promotes the top 3 highest-rated products.
- **Action**: Encourage users to leave reviews. As ratings change, the homepage automatically updates to feature the "hottest" items without manual work.

### B. High-Fidelity Product Pages
**Location**: `ProductPage.jsx`
- Built for conversion. Features sticky "Buy" buttons, gallery layouts, and size grids.
- **Images**: The system now supports high-res product photography.

### C. Admin Command Center
Access the admin panel to manage the brand:
1. Log in as an Admin.
2. Click **ADMIN ▼** in the top navigation.
3. Manage Inventory, Create Products, and View Orders.

---

## 4. Production Deployment
When ready to go live on the internet:

1. **Frontend**: Deploy the `client` folder to **Vercel** or **Netlify**.
   - Build Command: `npm run build`
   - Output Directory: `dist`
2. **Backend**: Deploy the `server` folder to **Render**, **Heroku**, or **Railway**.
   - Start Command: `npm start`
3. **Connect**: Update the Frontend's `.env` (or axios config) to point to your live Backend URL instead of `localhost:5000`.

**MAZAHANO IS READY FOR FLIGHT.**
