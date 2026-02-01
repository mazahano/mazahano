# MAZAHANO Hosting Guide

This guide will walk you through hosting your MERN stack application for free using **Render** (Backend) and **Vercel** (Frontend).

## Prerequisites
1. **GitHub Account**: You need to push your code to a GitHub repository.
2. **Accounts**: Sign up for [Render](https://render.com) and [Vercel](https://vercel.com).

---

## Part 1: Push Code to GitHub
1. Initialize Git in your project root (`antiG` folder) if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Create a new repository on GitHub (e.g., `mazahano-store`).
3. Connect and push your local code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/mazahano-store.git
   git branch -M main
   git push -u origin main
   ```

---

## Part 2: Deploy Backend (Render)
1. Go to your **Render Dashboard** and click **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Configure the service:
   - **Name**: `mazahano-api` (or similar)
   - **Root Directory**: `server` (Important!)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment Variables** (Advanced / Environment Section):
   Add the following variables exactly as they are in your local `.env`:
   - `MONGO_URI`: (Your MongoDB connection string)
   - `JWT_SECRET`: (Your secret key)
   - `PORT`: `5000` (Optional, Render usually assigns one, but good to set)
5. Click **Create Web Service**.
6. Wait for the build to finish. Once live, copy the **onrender.com URL** (e.g., `https://mazahano-api.onrender.com`). You will need this for Part 3.

---

## Part 3: Deploy Frontend (Vercel)
1. Go to your **Vercel Dashboard** and click **Add New...** -> **Project**.
2. Import your `mazahano-store` repository.
3. Configure the project:
   - **Framework Preset**: Vite (should detect automatically)
   - **Root Directory**: Click "Edit" and select `client`.
4. **Environment Variables**:
   - Key: `VITE_API_BASE_URL`
   - Value: Paste your Render Backend URL (e.g., `https://mazahano-api.onrender.com`). *Note: Do not add a trailing slash.*
5. Click **Deploy**.
6. Vercel will build your site. Once done, you will get a live URL (e.g., `https://mazahano-store.vercel.app`).

---

## Part 4: Final Connection
1. Open your new Vercel URL.
2. Test the specific flows:
   - **Home Page**: Should load products (fetched from backend).
   - **Login/Register**: Should work.
   - **Admin**: Should be accessible.

**Troubleshooting:**
- **Products not loading?** Check the Network tab in browser dev tools. If the request URL is `undefined/api/...`, your `VITE_API_BASE_URL` might be missing or incorrect.
- **CORS Error?** You might need to install `cors` in your backend (you already have it) and ensure it allows requests from your Vercel domain.
  - In `server/server.js`, ensure you have:
    ```javascript
    app.use(cors({
        origin: ["https://your-vercel-app.vercel.app", "http://localhost:5173"],
        credentials: true
    }));
    ```

---

## Important Note on Image Uploads
Since you are using a free hosting service (Render) with local file storage (`uploads/` folder), **images uploaded via the Admin Panel will disappear** whenever your backend redeploys or restarts (which happens frequently on free tiers).
To fix this in the future, you would need to integrate a cloud storage service like **Cloudinary** or **AWS S3**. For now, use external image URLs (like Unsplash) for your products to ensure they persist.


---

## Part 5: Connecting Your Custom Domain (mazahano.gt.tc)

Since you own **mazahano.gt.tc**, here is how to connect it:

1. **In Vercel**:
   - Go to your Project Dashboard -> **Settings** -> **Domains**.
   - Type `mazahano.gt.tc` and click **Add**.
   - Vercel will give you a list of **DNS Records** (Numbers and Names).

2. **In Your Domain Dashboard (Where you bought gt.tc)**:
   - Log in to your account for `mazahano.gt.tc`.
   - Look for **"DNS Records"**, **"Zone Editor"**, or **"Name Servers"**.
   - **Add the A Record** from Vercel:
     - **Name/Host**: `@` (or leave blank)
     - **Type**: `A`
     - **Value/Target**: `76.76.21.21` (Verify this number in Vercel to be sure)
   - **Add the CNAME Record** from Vercel:
     - **Name/Host**: `www`
     - **Type**: `CNAME`
     - **Value/Target**: `cname.vercel-dns.com`

3. **Verify**:
   - Go back to Vercel. It might take a few minutes (up to 24h) to turn green.
   - Once green, your site will be live at `http://mazahano.gt.tc`!

---

## Alternative: Hosting Frontend on InfinityFree / WordPress Hosting
**READ CAREFULLY:**
1. **You cannot use WordPress** to run this code directly. This is a custom-coded MERN application, which is much more powerful than a standard WordPress theme.
2. **InfinityFree does NOT support Node.js**. You **CANNOT** host the Backend (Server) on InfinityFree. You **MUST** keep the Backend on Render (see Part 2).

However, you **CAN** host the **Frontend** (Client) on InfinityFree (replacing Vercel) if you really want to.

### Steps to Host Frontend on InfinityFree:
1. **Prepare the Build**:
   - In your local terminal (`client` folder), run: `npm run build`
   - This creates a `dist` folder. This folder contains your "Real" website (HTML/CSS/JS).

2. **Upload to InfinityFree**:
   - Open your InfinityFree **Control Panel** -> **Online File Manager**.
   - Navigate to `htdocs`.
   - **Delete** the default files inside `htdocs` (like `index2.html`).
   - **Upload** all files **INSIDE** your local `client/dist` folder to `htdocs`.
     - *Note: Do not upload the `dist` folder itself, upload the CONTENTS (index.html, assets folder, etc).*
   - **Important**: Upload the `.htaccess` file (found in your local `client/public` folder) to `htdocs` as well. This handles the page routing.

3. **Link to Backend**:
   - Since you can't set Environment Variables easily in InfinityFree free tier, you might need to "hardcode" your backend URL for the build.
   - Go to `client/src/main.jsx` and replace `import.meta.env.VITE_API_BASE_URL` with your actual Render URL (e.g., `"https://mazahano-api.onrender.com"`).
   - Re-run `npm run build` locally, then upload the `dist` contents again.

4. **Done**:
   - Re-run `npm run build` locally, then upload the `dist` contents again.

4. **Done**:
   - Go to `mazahano.gt.tc`. Your site should load!

### Troubleshooting InfinityFree Uploads
**Error: "Upload failed: Directory creation is only allowed in htdocs..."**
- This means you are trying to upload files to the **Root Folder** (`/`). You cannot do this.
- **Fix**: You MUST double-click the **`htdocs`** folder to open it first.
- Once you are **INSIDE** `htdocs`, then drag and drop your files there.


