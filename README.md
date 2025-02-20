# StarrCars
StarrCars is a web platform for buying and selling cars with a built-in AI assistant to provide price estimates for vehicles.

## **Table of Contents**
- [Installation](#installation)
- [Backend Setup](#backend-setup)
  - [Development](#development)
  - [Production](#production)
- [Frontend Setup](#frontend-setup)
  - [Development](#development-1)
  - [Production Build](#production-build)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)

---

## **Installation**

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/starrcars.git
cd starrcars
```

### **2. Install Dependencies**
#### **Backend**
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

#### **Frontend**
Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```

---

## **Backend Setup**

### **Development**
To run the backend for development:

```bash
npm run dev
```

### **Production**
To run the backend for production:

1. Build the TypeScript files:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

#### **Environment Variables**
Create a `.env` file in the backend directory with the following example variables:

```
PORT=4000
MONGO_URI=<your_mongodb_connection_string>
CLOUDINARY_URL=<your_cloudinary_url>
```

Ensure that the MongoDB Atlas connection string and any image storage service (like Cloudinary) configurations are properly set.

---

## **Frontend Setup**

### **Development**
To run the frontend for development:

```bash
npm run dev
```
The frontend will be accessible at `http://localhost:3000`.

### **Production Build**
To build the frontend for production:

```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

Ensure your backend is running before testing the production build.

---

## **Project Structure**
```
/starrcars
├── backend
│   ├── src
│   ├── dist
│   ├── package.json
│   └── .env
├── frontend
│   ├── src
│   ├── public
│   ├── build
│   └── package.json
└── README.md
```

---

## **Tech Stack**
- **Frontend:** React with TypeScript, TailwindCSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB Atlas
- **Image Storage:** Cloudinary (or AWS S3 as an option)
- **AI Integration:** Python-based machine learning services
- **Version Control:** Git LFS for large file handling

---
