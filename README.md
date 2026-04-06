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

#### Option C: Deploy to Render or Railway

1. Connect your GitHub repository to Render or Railway
2. Create a new web service
3. Set the start command: `node app.js`
4. Add environment variables in the platform dashboard
5. Deploy with a single push to main branch

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

Latest Commit Hash: 56a60cbf25c77959a263b6bac3867eb6dffff47b