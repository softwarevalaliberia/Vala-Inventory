#!/bin/bash
# start-dev.sh - Start development environment

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Software Vala Inventory Manager${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if MongoDB is running
echo -e "${YELLOW}Checking MongoDB...${NC}"
if command -v mongod &> /dev/null; then
    echo -e "${GREEN}✓ MongoDB found${NC}"
else
    echo -e "${YELLOW}⚠ MongoDB not found. Please install MongoDB.${NC}"
fi

# Check if Node.js is installed
echo -e "${YELLOW}Checking Node.js...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓ Node.js $NODE_VERSION found${NC}"
else
    echo -e "${YELLOW}⚠ Node.js not found. Please install Node.js.${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Starting development servers...${NC}"
echo ""

# Start MongoDB in background
echo -e "${YELLOW}Starting MongoDB...${NC}"
mongod &
MONGO_PID=$!
sleep 2
echo -e "${GREEN}✓ MongoDB started (PID: $MONGO_PID)${NC}"

# Start Backend
echo -e "${YELLOW}Starting Backend Server...${NC}"
cd backend
npm install > /dev/null 2>&1
npm start &
BACKEND_PID=$!
sleep 2
echo -e "${GREEN}✓ Backend started on port 5000 (PID: $BACKEND_PID)${NC}"

# Start Frontend
cd ../frontend
echo -e "${YELLOW}Starting Frontend Server...${NC}"
python -m http.server 8000 > /dev/null 2>&1 &
FRONTEND_PID=$!
sleep 1
echo -e "${GREEN}✓ Frontend started on port 8000 (PID: $FRONTEND_PID)${NC}"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  All services started successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}Access the application:${NC}"
echo -e "  Frontend: ${YELLOW}http://localhost:8000${NC}"
echo -e "  Backend API: ${YELLOW}http://localhost:5000/api${NC}"
echo -e "  MongoDB: ${YELLOW}localhost:27017${NC}"
echo ""
echo -e "${BLUE}Default Credentials:${NC}"
echo -e "  Superadmin: admin@vala.com / password123"
echo -e "  Admin: admin.user@vala.com / password123"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo ""

# Handle cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}Shutting down services...${NC}"
    kill $BACKEND_PID
    kill $FRONTEND_PID
    # Note: MongoDB may need manual shutdown
    echo -e "${GREEN}Services stopped.${NC}"
}

trap cleanup EXIT

# Keep script running
wait
