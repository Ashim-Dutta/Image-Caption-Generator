# 🧠 Image to Caption Generator using AI

A robust **backend service** built with **Node.js, Express, and MongoDB** that enables users to upload an image and receive a **context-aware caption** generated using **Google Gemini AI**. This system leverages cloud storage via **ImageKit**, secure JWT authentication, and clean API architecture.

> ✨ Built to demonstrate seamless integration of modern backend technologies with powerful AI models and third-party services.

---

## 📸 Project Highlights

- 🔐 **Secure User Authentication** — Users must register and log in to access the image captioning service.
- ☁️ **Image Upload & Hosting** — Images are uploaded using `multer`, validated for size (under 20MB), and then stored securely on **ImageKit**.
- 🤖 **AI-Powered Captioning** — Images are passed to Google Gemini API which returns an intelligent caption.
- 🧾 **Database Storage** — Captioned image URLs and corresponding captions are stored in MongoDB for retrieval and management.
- 🔄 **API-First Architecture** — Designed as a pure backend API for easy frontend/mobile integration.

---

## 🧰 Technologies Used

| Area            | Technology               |
|------------------|--------------------------|
| **Runtime**      | Node.js                  |
| **Framework**    | Express.js               |
| **Database**     | MongoDB (Mongoose ORM)   |
| **Authentication** | JWT + bcryptjs         |
| **File Upload**  | Multer                   |
| **Cloud Storage**| ImageKit.io              |
| **AI Service**   | Google Gemini API        |
| **Environment Config** | dotenv             |

---

## 🛠️ Features in Detail

### 1. 🔐 User Authentication
- New users can register with a secure password (hashed using `bcryptjs`).
- Existing users can log in and receive a **JWT token**.
- Token is stored in cookies and verified for all protected routes.

### 2. 📤 Image Upload & Validation
- Only authenticated users can upload images.
- Uploads are handled by `multer` middleware.
- Images are validated for size (must be under 20MB).
- Valid images are pushed to **ImageKit** for fast CDN access.

### 3. 🤖 Caption Generation via Google Gemini AI
- Uploaded image is converted to base64 and sent to Gemini API.
- Gemini returns a natural-language description based on image content.
- Captions are clean, readable, and emotionally intelligent.

### 4. 📁 MongoDB Integration
- Each image upload results in a document stored in the database.
- Fields include:
  - Image URL (from ImageKit)
  - AI-generated caption
  - Associated user ID



## 🌐 API Overview

### 🔒 Authentication Routes

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| POST   | `/api/auth/register` | Register new user       |
| POST   | `/api/auth/login`    | Login existing user     |


### 📸 Image Captioning Routes

| Method | Endpoint            | Description                          |
|--------|---------------------|--------------------------------------|
| POST   | `/api/posts` | Upload image & generate caption      |


## 📦 Dependencies

The project relies on the following Node.js packages:

- **[@google/genai](https://www.npmjs.com/package/@google/genai)** – Google Gemini AI SDK
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** – Password hashing
- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)** – Cookie parsing middleware
- **[dotenv](https://www.npmjs.com/package/dotenv)** – Environment variable loader
- **[express](https://www.npmjs.com/package/express)** – Web framework
- **[imagekit](https://www.npmjs.com/package/imagekit)** – ImageKit CDN SDK
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** – JWT token generation and validation
- **[mongoose](https://www.npmjs.com/package/mongoose)** – MongoDB ORM
- **[multer](https://www.npmjs.com/package/multer)** – File upload middleware
- **[nodemon](https://www.npmjs.com/package/nodemon)** – Development server reloader
- **[uuid](https://www.npmjs.com/package/uuid)** – Unique ID generation

---

## 🧠 Acknowledgements

- [**Google Gemini AI**](https://ai.google.dev/) — for enabling intelligent, generative captions from images.
- [**ImageKit.io**](https://imagekit.io/) — for high-speed image storage and CDN delivery.
- [**Node.js**](https://nodejs.org/) — event-driven JavaScript runtime.
- [**Express.js**](https://expressjs.com/) — web framework for Node.js.
- [**MongoDB**](https://www.mongodb.com/) — NoSQL document database.
- [**Mongoose**](https://mongoosejs.com/) — elegant MongoDB ORM.
- [**bcryptjs**](https://www.npmjs.com/package/bcryptjs) — for secure password hashing.
- [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken) — for secure authentication using JWTs.
- [**multer**](https://www.npmjs.com/package/multer) — for managing file uploads.
- [**dotenv**](https://www.npmjs.com/package/dotenv) — for handling secrets and environment variables.
- [**uuid**](https://www.npmjs.com/package/uuid) — for generating unique identifiers.

---
