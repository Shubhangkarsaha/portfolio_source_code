# Backend Setup Complete ✅

MongoDB + Mongoose + Next.js API Routes have been successfully integrated into your portfolio project.

## 📁 Files Created

### 1. MongoDB Connection
- **`lib/mongodb.js`** - MongoDB connection with global connection pattern

### 2. Mongoose Models
- **`models/Project.js`** - Project schema (title, description, image, github, demo)
- **`models/Certificate.js`** - Certificate schema (title, issuer, issueDate, image)
- **`models/Achievement.js`** - Achievement schema (title, description, year)

### 3. API Routes

#### Projects API
- **`pages/api/projects/index.js`** - GET all projects, POST new project (protected)
- **`pages/api/projects/[id].js`** - GET one, PUT update, DELETE (protected)

#### Certificates API
- **`pages/api/certificates/index.js`** - GET all certificates, POST new certificate (protected)
- **`pages/api/certificates/[id].js`** - GET one, PUT update, DELETE (protected)

#### Achievements API
- **`pages/api/achievements/index.js`** - GET all achievements, POST new achievement (protected)
- **`pages/api/achievements/[id].js`** - GET one, PUT update, DELETE (protected)

#### Authentication
- **`pages/api/auth/login.js`** - Admin login endpoint

### 4. Utilities
- **`lib/verifyToken.js`** - JWT token verification middleware

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net
JWT_SECRET=yourStrongSecretKey
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

**Important:** Replace the placeholder values with your actual:
- MongoDB connection string
- Strong JWT secret (use a random string)
- Admin email and password

## 📦 Dependencies Added

The following packages have been added to `package.json`:
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication

Install them with:
```bash
npm install
```

## 🔌 API Endpoints

### Public Endpoints (No Authentication Required)

#### GET All Projects
```
GET /api/projects
```

#### GET Single Project
```
GET /api/projects/[id]
```

#### GET All Certificates
```
GET /api/certificates
```

#### GET Single Certificate
```
GET /api/certificates/[id]
```

#### GET All Achievements
```
GET /api/achievements
```

#### GET Single Achievement
```
GET /api/achievements/[id]
```

### Protected Endpoints (Require JWT Token)

All POST, PUT, and DELETE operations require authentication.

#### POST New Project
```
POST /api/projects
Headers: Authorization: Bearer <token>
Body: { title, description, image, github, demo }
```

#### PUT Update Project
```
PUT /api/projects/[id]
Headers: Authorization: Bearer <token>
Body: { title, description, image, github, demo }
```

#### DELETE Project
```
DELETE /api/projects/[id]
Headers: Authorization: Bearer <token>
```

(Same pattern for `/api/certificates` and `/api/achievements`)

### Authentication

#### Admin Login
```
POST /api/auth/login
Body: { email, password }
Response: { token }
```

## 🔒 Security

- **JWT Protection**: All POST, PUT, and DELETE routes are protected with JWT verification
- **Token Expiry**: JWT tokens expire after 7 days
- **Environment Variables**: Sensitive data stored in `.env.local` (not committed to git)

## 📝 Usage Examples

### 1. Login to Get Token
```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'admin123'
  })
});
const { token } = await response.json();
```

### 2. Create a Project (Protected)
```javascript
const response = await fetch('/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'My Project',
    description: 'Project description',
    image: '/images/project.png',
    github: 'https://github.com/user/repo',
    demo: 'https://demo.example.com'
  })
});
```

### 3. Get All Projects (Public)
```javascript
const response = await fetch('/api/projects');
const projects = await response.json();
```

## ⚠️ Important Notes

1. **No UI Changes**: The existing UI components and pages remain unchanged
2. **Database Name**: All data is stored in `portfolio_db` database
3. **Timestamps**: All models include automatic `createdAt` and `updatedAt` timestamps
4. **Connection Reuse**: MongoDB connection is cached globally to prevent multiple connections

## 🚀 Next Steps

1. **Set up MongoDB**: 
   - Create a MongoDB Atlas account (free tier available)
   - Get your connection string
   - Update `MONGODB_URI` in `.env.local`

2. **Configure Environment**:
   - Create `.env.local` file
   - Set strong `JWT_SECRET`
   - Set admin credentials

3. **Test API**:
   - Start dev server: `npm run dev`
   - Test endpoints using Postman or curl

4. **Admin Panel** (Future):
   - The admin UI will be implemented in a future step
   - Use the login endpoint to authenticate
   - Use protected endpoints to manage data

## 📚 Model Schemas

### Project
```javascript
{
  title: String,
  description: String,
  image: String,
  github: String,
  demo: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Certificate
```javascript
{
  title: String,
  issuer: String,
  issueDate: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Achievement
```javascript
{
  title: String,
  description: String,
  year: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

**Backend setup complete!** 🎉

All API routes are ready to use. Remember to:
1. Install dependencies: `npm install`
2. Create `.env.local` with your MongoDB URI and credentials
3. Start the server: `npm run dev`

