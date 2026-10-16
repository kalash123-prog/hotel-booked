# Hotel Booking System Project

This is a hotel booking system built with Node.js, Express, MongoDB, and Passport authentication.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Latest Commit](#latest-commit)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/kalash123-prog/my-10-year-project-.git
cd hotel-booking-system-project-one
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the required environment variables (see Configuration section)

4. Seed the database (optional):
```bash
node seed.js
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
# MongoDB Configuration
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/hotel_booking

# Server Configuration
PORT=3000
NODE_ENV=development

# Session Secret
SESSION_SECRET=your-secret-key-here

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# JWT or Auth Token (if needed)
JWT_SECRET=your-jwt-secret-key
```

## Deployment

### Step 1: Prepare Your Application

- Ensure all dependencies are listed in `package.json`
- Test the application locally: `node app.js`
- Commit all changes to git: `git commit -m "Final deployment prep"`

### Step 2: Set Up Environment Variables on Hosting Platform

Before deploying, configure environment variables on your hosting platform:
- MONGO_URL: MongoDB connection string
- PORT: Server port (usually 3000 or assigned by host)
- SESSION_SECRET: A secure random string
- All CLOUDINARY_* variables
- NODE_ENV: Set to "production"

### Step 3: Choose a Deployment Platform

#### Option A: Deploy to Heroku

1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli

2. Login to Heroku:
```bash
heroku login
```

3. Create a new Heroku app:
```bash
heroku create your-app-name
```

4. Set environment variables:
```bash
heroku config:set MONGO_URL=your-mongodb-url
heroku config:set SESSION_SECRET=your-secret-key
heroku config:set CLOUDINARY_CLOUD_NAME=your-cloud-name
heroku config:set CLOUDINARY_API_KEY=your-api-key
heroku config:set CLOUDINARY_API_SECRET=your-api-secret
heroku config:set NODE_ENV=production
```

5. Deploy to Heroku:
```bash
git push heroku main
```

6. View your app:
```bash
heroku open
```

#### Option B: Deploy to AWS (EC2)

1. Launch an EC2 instance (Ubuntu 20.04 or later)

2. Connect to your instance via SSH:
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

3. Install Node.js and npm:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. Install MongoDB (or use MongoDB Atlas cloud):
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

5. Clone your repository:
```bash
git clone https://github.com/kalash123-prog/my-10-year-project-.git
cd hotel-booking-system-project-one
```

6. Install dependencies:
```bash
npm install
```

7. Set up environment variables:
```bash
nano .env
```

8. Install PM2 to manage the Node process:
```bash
sudo npm install -g pm2
pm2 start app.js --name "hotel-booking"
pm2 startup
pm2 save
```

9. Set up a reverse proxy with Nginx:
```bash
sudo apt-get install -y nginx
sudo nano /etc/nginx/sites-available/default
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

10. Restart Nginx:
```bash
sudo systemctl restart nginx
```

#### Option C: Deploy to Render (Recommended - Easiest)

**Prerequisites:**
- GitHub account with your repository pushed
- Render account (free at https://render.com)
- MongoDB connection string (Atlas recommended)

**Step 1: Create a Render Account and Connect GitHub**

1. Go to https://render.com and sign up
2. Click "Dashboard" in the top menu
3. Click "New +" and select "Web Service"
4. Authorize Render to access your GitHub repositories
5. Select your `my-10-year-project-` repository
6. Choose the `main` branch

**Step 2: Configure Web Service Settings**

1. **Name**: Enter a name (e.g., `hotel-booking-app`)
2. **Region**: Select closest to your users (e.g., `N. California`)
3. **Branch**: `main`
4. **Runtime**: `Node`
5. **Start Command**: `npm install && node app.js`
6. **Instance Type**: Select `Free` tier (for testing) or `Starter` ($7/month)
7. **Auto-Deploy**: Toggle ON (automatic deployment on git push)
8. Click "Create Web Service"

**Step 3: Create or Configure MongoDB Database**

Option A: Use MongoDB Atlas (Recommended Cloud Database)
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster (M0 tier is free)
4. Create a database user with a strong password
5. Whitelist all IPs (0.0.0.0/0) for safety
6. Get connection string: mongodb+srv://username:password@cluster.mongodb.net/hotel_booking
7. Use this as MONGO_URL in Render environment
```

Option B: Use Render PostgreSQL (if switching from MongoDB)
```
1. In Render Dashboard, click "New +" → "PostgreSQL"
2. Connect it from settings
3. Get connection string from Render
```

**Step 4: Set Environment Variables in Render**

1. In your Web Service dashboard, scroll down to **Environment**
2. Click **Add Environment Variable** and fill in each:

```
NODE_ENV = production
PORT = 3000
MONGO_URL = mongodb+srv://your-username:your-password@cluster.mongodb.net/hotel_booking
SESSION_SECRET = generate-a-random-string-here-min-32-chars
CLOUDINARY_CLOUD_NAME = your-cloudinary-cloud-name
CLOUDINARY_API_KEY = your-cloudinary-api-key
CLOUDINARY_API_SECRET = your-cloudinary-api-secret
```

**How to get these values:**

- **MONGO_URL**: From MongoDB Atlas connection string
- **SESSION_SECRET**: Generate here: https://generate-random.org/
- **CLOUDINARY_***: From https://cloudinary.com (free tier available)
  1. Sign up at cloudinary.com
  2. Go to Dashboard
  3. Copy "Account Details" → Cloud Name, API Key, API Secret

**Step 5: Update package.json Start Script**

Make sure your `package.json` has a proper start script:

```json
"scripts": {
  "start": "node app.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

If not, update it and push to GitHub:
```bash
git add package.json
git commit -m "Add start script for deployment"
git push
```

**Step 6: Enable Auto-Deployment**

1. In Render dashboard, go to your Web Service
2. Click the "..." menu → **Settings**
3. Toggle **Auto-Deploy** to ON
4. Select branch: `main`
5. Now every push to main will auto-deploy

**Step 7: Deploy and Test**

Option A: Manual Deployment
- In Render dashboard, click "Deploy" button → "Deploy latest commit"

Option B: Automatic Deployment (Recommended)
- Just push to GitHub: `git push`
- Render will automatically build and deploy

Monitor deployment in the Logs tab:
- Green checkmark = successful deployment
- Red X = deployment failed, check logs for errors

**Step 8: Access Your App**

Once deployed:
1. Render gives you a free subdomain: `your-app-name.onrender.com`
2. Visit it in browser: `https://your-app-name.onrender.com`
3. App should load (may take 30 seconds first time)

**Step 9: Connect Custom Domain (Optional)**

1. Go to Web Service Settings → **Custom Domain**
2. Add your domain: `yourdomain.com`
3. Add DNS records as shown in Render:
   ```
   Type: CNAME
   Name: www (or @)
   Value: your-app-name.onrender.com
   ```
4. Update DNS in your domain registrar (GoDaddy, Namecheap, etc.)
5. Wait 24-48 hours for DNS propagation

**Render Deployment Troubleshooting:**

| Issue | Solution |
|-------|----------|
| **App crashes on startup** | Check logs in Render dashboard. Usually missing env vars. |
| **Port already in use** | Render assigns PORT via env var, don't hardcode 3000 |
| **Cannot connect to MongoDB** | Verify MONGO_URL is correct and IP is whitelisted in Atlas |
| **Images not uploading** | Check Cloudinary credentials in env vars |
| **"Build failed"** | Check if all dependencies are in package.json, not just node_modules |
| **App times out** | May need Starter plan instead of Free (Free has inactivity timer) |
| **Session lost** | SESSION_SECRET not set or too short |

**Render Pricing:**
- Free: Auto-sleeps after 15 min inactivity, resets on request
- Starter: $7/month, always running
- For production: consider Starter or higher plan

#### Option D: Deploy to Railway

1. Go to https://railway.app and sign up with GitHub
2. Create a new project
3. Import your GitHub repository
4. Add environment variables (same as Render above)
5. Railway auto-detects Node.js app and deploys
6. Get your app URL in the deployment tab

### Step 4: Set Up Custom Domain (Optional)

- Update your domain DNS settings to point to your hosting provider
- Enable SSL/HTTPS (most platforms provide free SSL)

### Step 5: Test Your Deployment

1. Visit your deployed app URL
2. Test key features:
   - User registration and login
   - Browse hotels
   - Make bookings
   - Review functionality

### Step 6: Monitor Your Application

- Set up error tracking (e.g., Sentry)
- Monitor server logs and performance
- Set up automated backups for MongoDB

### Troubleshooting

- **Port Already in Use**: Change PORT in .env
- **MongoDB Connection Issues**: Verify MONGO_URL and network access
- **Image Upload Problems**: Check Cloudinary credentials
- **Session Issues**: Ensure SESSION_SECRET is set
- **View Rendering Issues**: Verify EJS files are in views directory

Latest Commit Hash: 56a60cbf25c77959a263b6bac3867eb6dffff47b#   h o t e l - b o o k i n g - s y s t e m  
 #   h o t e l - b o o k e d  
 
CI/CD test on 2026-10-17 02:57:54
