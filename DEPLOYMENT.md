# Deployment Guide - Software Vala Inventory

## Deployment Options

### 1. Local Development Deployment (Already Covered)
- Backend: localhost:5000
- Frontend: localhost:8000
- Database: localhost:27017

---

## 2. Heroku Deployment

### Prerequisites
- Heroku account: https://www.heroku.com
- Heroku CLI installed
- Git installed

### Steps

```bash
# 1. Login to Heroku
heroku login

# 2. Create Heroku app
heroku create vala-inventory-backend

# 3. Add MongoDB Atlas (Free tier available)
# Go to https://www.mongodb.com/cloud/atlas
# Create cluster and get connection string

# 4. Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/vala-inventory
heroku config:set JWT_SECRET=your_production_secret_key
heroku config:set NODE_ENV=production

# 5. Deploy
git push heroku main

# 6. View logs
heroku logs --tail

# 7. Frontend - Deploy to GitHub Pages or Netlify
```

---

## 3. AWS Deployment

### Using EC2 Instance

```bash
# 1. Launch EC2 instance
# - Use Ubuntu 20.04 LTS
# - Configure security groups
# - Create key pair

# 2. Connect to instance
ssh -i your-key.pem ubuntu@your-ec2-public-ip

# 3. Install Node.js and MongoDB
sudo apt-get update
sudo apt-get install nodejs npm mongodb

# 4. Clone repository
git clone your-repo-url
cd vala-inventory/backend

# 5. Install dependencies
npm install

# 6. Create .env file with production settings
nano .env

# 7. Start with PM2 (process manager)
npm install -g pm2
pm2 start server.js --name "vala-inventory"
pm2 save
pm2 startup

# 8. Setup Nginx reverse proxy
sudo apt-get install nginx

# Edit /etc/nginx/sites-available/default
# Add proxy settings to forward to Node app

# 9. Setup SSL with Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com

# 10. Restart Nginx
sudo systemctl restart nginx
```

### Using AWS Lambda + API Gateway (Serverless)

```bash
# 1. Install Serverless Framework
npm install -g serverless

# 2. Configure AWS credentials
serverless config credentials --provider aws --key YOUR_KEY --secret YOUR_SECRET

# 3. Create serverless.yml
# 4. Deploy
serverless deploy
```

---

## 4. Docker Deployment

### Create Docker Image

#### Dockerfile for Backend
```dockerfile
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

#### Dockerfile for Frontend
```dockerfile
FROM nginx:alpine

COPY frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      MONGODB_URI: mongodb://admin:password@mongodb:27017/vala-inventory
      JWT_SECRET: your_secret_key
      NODE_ENV: production

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongo-data:
```

### Deploy with Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 5. Azure Deployment

### Using App Service

```bash
# 1. Create resource group
az group create --name ValaInventory --location eastus

# 2. Create App Service plan
az appservice plan create --name vala-plan --resource-group ValaInventory --sku B1 --is-linux

# 3. Create web app
az webapp create --resource-group ValaInventory \
  --plan vala-plan \
  --name vala-inventory \
  --runtime "node|14-lts"

# 4. Configure deployment
az webapp up --name vala-inventory --resource-group ValaInventory

# 5. Configure environment
az webapp config appsettings set \
  --name vala-inventory \
  --resource-group ValaInventory \
  --settings MONGODB_URI="..." JWT_SECRET="..."
```

---

## 6. DigitalOcean Deployment

### Using Droplet

```bash
# 1. Create Droplet (Ubuntu 20.04)
# 2. Connect via SSH

# 3. Initial setup
sudo apt-get update && sudo apt-get upgrade -y

# 4. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 5. Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# 6. Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# 7. Deploy application
cd /home/apps/
git clone your-repo
cd vala-inventory/backend
npm install

# 8. Use PM2 for process management
sudo npm install -g pm2
pm2 start server.js --name "vala"
pm2 startup
pm2 save

# 9. Setup Nginx
sudo apt-get install nginx
# Configure as reverse proxy

# 10. SSL with Certbot
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 7. GitHub Pages (Frontend Only)

```bash
# 1. Create gh-pages branch
git checkout -b gh-pages

# 2. Build and commit frontend
cd frontend
# Commit all files

# 3. Deploy
git push origin gh-pages

# 4. Enable GitHub Pages
# Go to Settings → Pages → Select gh-pages branch
```

---

## 8. Netlify (Frontend)

### Automatic Deployment from Git

```bash
# 1. Push code to GitHub
git push origin main

# 2. Connect to Netlify
# Go to https://netlify.com
# Click "New site from Git"
# Select your repository
# Configure build settings:
# Build command: (leave empty for static site)
# Publish directory: frontend

# 3. Set environment variables (if needed)
# Go to Site settings → Build & deploy → Environment

# 4. Deploy is automatic on every push
```

---

## 9. Vercel (Full Stack)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Configure serverless functions
# Move backend code to api/ folder
# Vercel automatically deploys as serverless functions
```

---

## 10. Self-Hosted on VPS

### DigitalOcean / Linode / Vultr

```bash
# 1. SSH into your VPS
ssh root@your-vps-ip

# 2. Update system
apt-get update && apt-get upgrade -y

# 3. Install requirements
apt-get install -y curl wget git build-essential

# 4. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
apt-get install -y nodejs

# 5. Install MongoDB
# Follow MongoDB installation guide for your OS

# 6. Install Nginx
apt-get install -y nginx

# 7. Clone and setup application
cd /var/www
git clone your-repo
cd vala-inventory

# 8. Install PM2
npm install -g pm2

# 9. Start services
cd backend
npm install
pm2 start server.js --name "vala-api"

# 10. Configure Nginx
# Create /etc/nginx/sites-available/vala
# Configure upstream and locations

# 11. Enable site
ln -s /etc/nginx/sites-available/vala /etc/nginx/sites-enabled/

# 12. Setup SSL
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com

# 13. Restart services
systemctl restart nginx
```

---

## Database Backup & Recovery

### MongoDB Backup

```bash
# Backup
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/vala-inventory" --out /backup

# Restore
mongorestore --uri "mongodb+srv://user:pass@cluster.mongodb.net/vala-inventory" /backup
```

### Scheduled Backups (Cron)

```bash
# Add to crontab
0 2 * * * mongodump --uri "mongodb+srv://..." --out /backups/$(date +\%Y-\%m-\%d)
```

---

## Performance Optimization

### Backend Optimization

```javascript
// Enable compression
const compression = require('compression');
app.use(compression());

// Add caching headers
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600');
  next();
});

// Connection pooling
// MongoDB automatically manages connection pool
```

### Frontend Optimization

```html
<!-- Minify and compress -->
<link rel="stylesheet" href="css/style.min.css">
<script src="js/api.min.js"></script>

<!-- Lazy loading -->
<img loading="lazy" src="image.jpg">

<!-- CDN for assets -->
<link rel="stylesheet" href="https://cdn.example.com/style.css">
```

---

## Monitoring & Logging

### Backend Logging

```javascript
// Using Winston
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'vala-api' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Uptime Monitoring

Use services like:
- UptimeRobot (Free)
- Pingdom
- New Relic
- DataDog

---

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm test
      - run: npm run build
      - name: Deploy to Heroku
        run: |
          git remote add heroku https://git.heroku.com/vala-inventory.git
          git push heroku main
```

---

## Post-Deployment Checklist

- [ ] Database backup configured
- [ ] SSL/HTTPS enabled
- [ ] Environment variables set
- [ ] Logging enabled
- [ ] Monitoring active
- [ ] Firewall configured
- [ ] Security headers added
- [ ] Rate limiting enabled
- [ ] CDN configured (if needed)
- [ ] Domain DNS configured
- [ ] Automated backups scheduled
- [ ] Team notification configured
- [ ] Documentation updated

---

## Support

For deployment issues: support@vala.com
Documentation: https://software-vala.com/docs
