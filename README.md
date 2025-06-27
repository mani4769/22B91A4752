
# URL Shortener Backend - 22B91A4752

A robust URL shortener service built with Node.js and Express.js that demonstrates production-ready backend development practices. This application creates short URLs with custom shortcodes, tracks usage analytics, implements expiry mechanisms, and includes comprehensive logging.

## 🏗️ Architecture Overview

### Tech Stack
- **Backend**: Node.js with Express.js framework
- **Storage**: JSON file-based persistence (easily replaceable with databases)
- **Logging**: Custom middleware with multi-tier logging (console, file, external API)
- **Configuration**: Environment-based setup using dotenv
- **Testing**: Automated API testing suite

### System Architecture
```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐
│   Client    │───▶│   Express    │───▶│ Logging     │───▶│ Controllers  │
│   Request   │    │   Router     │    │ Middleware  │    │              │
└─────────────┘    └──────────────┘    └─────────────┘    └──────────────┘
                                                                   │
┌─────────────┐    ┌──────────────┐    ┌─────────────┐           ▼
│   Client    │◀───│   Response   │◀───│   Models    │    ┌──────────────┐
│  Response   │    │   Logging    │    │  (Data)     │◀───│  Validation  │
└─────────────┘    └──────────────┘    └─────────────┘    └──────────────┘
```

### API Endpoints
```
POST /shorturls          # Create new short URL
GET  /shorturls/:code    # Get URL statistics  
GET  /:code              # Redirect to original URL
```

## 📁 Project Structure

```
22B91A4752/
├── README.md                          # Project documentation
├── .gitignore                         # Git exclusion rules
├── screenshots/                       # API testing screenshots
│
├── backend-test-submission/           # Main backend service
│   ├── .env                          # Environment configuration
│   ├── .gitignore                    # Backend exclusions
│   ├── package.json                  # Dependencies & scripts
│   ├── index.js                      # Application entry point
│   ├── test-api.js                   # Automated test suite
│   │
│   ├── controllers/                  # Business logic
│   │   └── shorturlController.js     # URL operations & validation
│   │
│   ├── models/                       # Data layer
│   │   └── urlModel.js               # Data persistence & retrieval
│   │
│   ├── routes/                       # API definitions
│   │   └── shorturl.js               # Route handlers
│   │
│   ├── utils/                        # Helper functions
│   │   └── generateShortcode.js      # Shortcode generation
│   │
│   └── data/                         # Storage
│       └── db.json                   # JSON database
│
└── logging-middleware/               # Reusable logging component
    ├── package.json                  # Logging dependencies
    ├── logger.js                     # Core logging functionality
    ├── middleware.js                 # Express integration
    └── application.log               # Generated logs
```

## 🚀 Features

- ✅ **URL Shortening**: Auto-generated or custom shortcodes
- ✅ **Expiry Management**: Configurable TTL with graceful handling
- ✅ **Analytics**: Click tracking and statistics
- ✅ **Validation**: Comprehensive input validation
- ✅ **Logging**: Multi-tier logging (console, file, external)
- ✅ **Error Handling**: Structured error responses
- ✅ **Environment Config**: Production-ready configuration management
- ✅ **Testing**: Automated test suite for all endpoints

## 🔧 How to Run This Project

### What You Need
- Node.js (version 14 or newer)
- npm (comes with Node.js)

### Getting Started

1. **Set up the backend:**
   ```bash
   cd backend-test-submission
   npm install
   ```

2. **Set up logging (optional but recommended):**
   ```bash
   cd ../logging-middleware
   npm install
   cd ../backend-test-submission
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

That's it! The server will start on `http://localhost:3000`

### Configuration (Optional)
The `.env` file contains all the settings. You can change the port or disable external logging if needed:

```bash
PORT=3000                           # Change if port 3000 is busy
BASE_URL=http://localhost:3000      # Used in response URLs
ENABLE_EXTERNAL_LOGGING=false       # Set to true for production
```

## 📋 How to Use the API

### Creating a Short URL
Send a POST request to `/shorturls` with your URL:

```bash
POST http://localhost:3000/shorturls
Content-Type: application/json

{
  "url": "https://github.com/affordmed",
  "validity": 60,
  "shortcode": "affordmed-repo"
}
```

**What you get back:**
```json
{
  "shortLink": "http://localhost:3000/affordmed-repo",
  "expiry": "2025-06-27T11:30:00.000Z",
  "shortcode": "affordmed-repo"
}
```

**Parameters:**
- `url` (required): The website you want to shorten
- `validity` (optional): How long the link should work (in minutes, default: 30)
- `shortcode` (optional): Custom shortcode (leave empty for auto-generated)

### Using a Short URL
Just visit the short URL in your browser: `http://localhost:3000/affordmed-repo`

- ✅ **Working link**: Redirects you to the original website
- ❌ **Expired link**: Shows "Link has expired" message
- ❌ **Invalid link**: Shows "Shortcode not found" message

### Getting Statistics
Want to see how many people clicked your link?

```bash
GET http://localhost:3000/shorturls/affordmed-repo
```

**Response:**
```json
{
  "url": "https://github.com/affordmed",
  "expiry": "2025-06-27T11:30:00.000Z",
  "clicks": 15,
  "createdAt": "2025-06-27T10:30:00.000Z"
}
```

## 🧪 Testing & API Screenshots

### Automated Testing
Run the complete test suite to verify all functionality:
```bash
node test-api.js
```

The tests cover URL creation, redirection, statistics tracking, expiry handling, and error scenarios.

### API Testing Screenshots
Click on any screenshot below to view the full-size image:

#### 1. Creating Short URLs for abcd1

[![Create URL with Auto Shortcode](screenshots/Screenshot%202025-06-27%20114355.png)](screenshots/Screenshot%202025-06-27%20114355.png)

#### 2. Getting short Urls for abcd1
[![Create URL with Custom Shortcode](screenshots/Screenshot%202025-06-27%20114730.png)](screenshots/Screenshot%202025-06-27%20114730.png)

#### 3. verify logs
[![Successful Redirect](screenshots/Screenshot%202025-06-27%20115232.png)](screenshots/Screenshot%202025-06-27%20115232.png)

#### 4.  Creating Short URLs for exmpl1
[![URL Statistics](screenshots/Screenshot%202025-06-27%20123732.png)](screenshots/Screenshot%202025-06-27%20123732.png)

#### 5. Getting short Urls for exmpl1
[![External Logging](screenshots/Screenshot%202025-06-27%20124539.png)](screenshots/Screenshot%202025-06-27%20124539.png)

## 🛠️ Production-Ready Practices

### Security & Configuration
- **Environment Variables**: All sensitive data in `.env` files
- **Git Security**: Comprehensive `.gitignore` excludes secrets, logs, dependencies
- **Input Validation**: URL validation, shortcode checks, expiry validation
- **Error Handling**: Structured responses with appropriate HTTP status codes


### Logging Architecture
- **Console Logs**: Development debugging
- **File Logs**: Persistent storage in `application.log`
- **External API**: Integration with evaluation service
- **Structured Format**: Consistent log formatting

### Scalability Features
- **Stateless Design**: No session dependencies
- **Modular Architecture**: Clear separation of concerns
- **Database Abstraction**: Easy migration to production databases
- **Middleware Pattern**: Extensible for auth, rate limiting, etc.

## 🔍 Development Notes

### Architecture Decisions
- **JSON Storage**: Simple for demo, production-ready abstraction
- **Middleware Logging**: Reusable across projects
- **Environment Config**: Same codebase, different deployments
- **Error Consistency**: Standardized error responses

### Performance Considerations
- **Direct Lookups**: Efficient shortcode resolution
- **Minimal Dependencies**: Lightweight footprint
- **Async Operations**: Non-blocking I/O
- **Clean Responses**: No sensitive data exposure

## 🚨 Troubleshooting

### Quick Fixes for Common Issues

**Missing dotenv module error:**
```bash
# Install dependencies properly
npm install
# If still failing, try:
npm install dotenv express
```

**Port already in use:**
```bash
# Change port in .env file
PORT=3001
```

**Permission issues with database:**
```bash
# On Windows (PowerShell as admin):
icacls data /grant Everyone:F
# On Linux/Mac:
chmod 755 data/ && chmod 644 data/db.json
```

**External logging returns 401 errors:**
This is expected behavior - the evaluation service requires authentication. For development, you can disable external logging:
```bash
# In .env file:
ENABLE_EXTERNAL_LOGGING=false
```

### Development Tips
- Check `application.log` for detailed request information
- Run `test-api.js` after making changes to verify everything works
- Use Postman or Insomnia to test endpoints manually
- Monitor console output for real-time debugging

---

## 📈 What This Project Demonstrates

This URL shortener showcases the kind of backend engineering you'd expect in a production environment:

**Clean, Maintainable Code**
- Well-organized folder structure that makes sense
- Clear separation between routing, business logic, and data handling
- Easy to understand and modify

**Real-World Practices**
- Environment-based configuration (no hardcoded values)
- Comprehensive logging for debugging and monitoring
- Proper error handling with meaningful HTTP status codes
- Input validation to prevent bad data

**Production Readiness**
- Git ignore patterns to keep sensitive files secure
- Modular design that can scale as requirements grow
- Testing suite to catch issues before deployment
- Documentation that actually helps developers

**Technical Highlights**
- Custom middleware for logging (reusable across projects)
- TTL implementation for automatic URL expiry
- Click tracking and analytics
- JSON storage with easy database migration path

Built for Affordmed's technical evaluation by **Student ID: 22B91A4752**

*This project demonstrates backend engineering skills with focus on code quality, maintainability, and production best practices.*


