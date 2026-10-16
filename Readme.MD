# 🎓 Campus Marketplace

**A Full-Stack Marketplace Platform for College Students**

Campus Marketplace is a web-based platform designed to help college students buy and sell products within their campus community. Students can explore listings, search for products, browse categories, manage their selling activities, add reviews, and handle orders through a centralized marketplace.

The project aims to make student-to-student trading simple, convenient, and accessible.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation and Setup](#-installation-and-setup)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Application Modules](#-application-modules)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Overview

Campus Marketplace provides a dedicated online marketplace for students to exchange useful products such as:

- 📚 Books and academic notes
- 💻 Laptops and electronic accessories
- 🎧 Gadgets and peripherals
- 🎒 College essentials
- 🛍️ Other student-related products

Instead of relying on scattered messaging groups, students can browse product listings, review product details, and manage their buying and selling activities in one place.

## ✨ Key Features

### 🛒 Product Marketplace
- Browse available products.
- View detailed product information.
- Search for products by keyword.
- Explore products through category-based browsing.

### 👤 User Authentication
- User registration and login.
- Session-based authentication.
- Protected user-specific operations.

### 🏷️ Seller Management
- Create and manage product listings.
- Upload product images.
- Manage seller-related activities.

### ⭐ Reviews and Ratings
- Submit product reviews and ratings.
- Display feedback on product listings.
- Delete reviews where permitted.

### 🛍️ Cart and Orders
- Add products to the shopping cart.
- Manage cart-related operations.
- Place orders through the checkout workflow.
- View and manage orders.
- Update order status as a seller where authorized.

### 🎨 User Interface
- Responsive marketplace interface.
- Reusable EJS layouts and partials.
- Organized product pages and navigation.

---

## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and responsive layouts |
| JavaScript | Client-side functionality |
| Node.js | JavaScript runtime |
| Express.js | Backend framework and routing |
| MongoDB | Database |
| Mongoose | Database models and queries |
| EJS | Dynamic server-rendered pages |
| EJS-Mate | Layouts and reusable templates |
| Passport.js | User authentication |
| Express Session | Session management |
| Connect-Mongo | Persistent session storage |
| Connect-Flash | Flash notifications |
| Cloudinary | Product image storage |
| Dotenv | Environment configuration |

---

## 📁 Project Structure

The project follows a modular MVC-inspired architecture, separating database models, controllers, routes, views, and public assets.

```text
Campus-Marketplace/
│
├── back-end/
│   │
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   ├── .gitignore
│   │
│   ├── controllers/
│   │   ├── product.js
│   │   ├── review.js
│   │   └── order.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── product.js
│   │   ├── review.js
│   │   ├── Order.js
│   │   └── Cart.js
│   │
│   ├── routes/
│   │   ├── products.js
│   │   ├── reviews.js
│   │   ├── users.js
│   │   ├── orders.js
│   │   └── cart.js
│   │
│   ├── views/
│   │   ├── layouts/
│   │   │   └── boilerplate.ejs
│   │   │
│   │   ├── partials/
│   │   │   ├── navbar.ejs
│   │   │   └── footer.ejs
│   │   │
│   │   ├── products/
│   │   │   ├── index.ejs
│   │   │   └── show.ejs
│   │   │
│   │   └── error.ejs
│   │
│   └── public/
│       ├── css/
│       ├── js/
│       └── images/
│
└── README.md
```

**Note:** This is a documented project structure based on the known modules. Keep only the files and directories that exist in your actual repository. Additional authentication, cart, order, or configuration files may be present.

### 📂 Folder Responsibilities

| Directory / File | Responsibility |
|---|---|
| `app.js` | Initializes Express, middleware, database connection, and routes |
| `controllers/` | Contains business logic for products, reviews, and orders |
| `models/` | Defines MongoDB schemas and data relationships |
| `routes/` | Handles product, user, review, cart, and order endpoints |
| `views/` | Contains EJS templates for server-rendered pages |
| `views/layouts/` | Provides reusable page layouts |
| `views/partials/` | Stores shared interface components |
| `public/` | Contains static CSS, JavaScript, and image assets |
| `.env` | Stores environment-specific configuration |
| `package.json` | Defines dependencies and npm scripts |

---

## ⚙️ Installation and Setup

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [MongoDB](https://www.mongodb.com/) local installation or MongoDB Atlas account
- Cloudinary account for image uploads, if enabled in your configuration

### Step 1: Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd Campus-Marketplace
```

Replace `<YOUR_REPOSITORY_URL>` with your actual GitHub repository URL.

### Step 2: Navigate to the Backend

```bash
cd back-end
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Environment Variables

Create a `.env` file inside the `back-end` directory and configure the variables required by your application.

Example:

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

Use the exact variable names expected by your application's configuration. Do not commit real credentials or API secrets to GitHub.

### Step 5: Start the Application

Run the command configured in your `package.json`. For example, if the project defines a `start` script:

```bash
npm start
```

If a development script is configured:

```bash
npm run dev
```

Otherwise, if the application is started directly through `app.js`:

```bash
node app.js
```

Open the local URL printed by your terminal, for example:

```text
http://localhost:8080
```

The actual port depends on your application configuration.

---

## 🧩 Application Modules

### 1. Product Module
Manages product listings, product details, search, categories, and seller-related operations.

### 2. User Module
Handles registration, login, authentication, and session-related functionality.

### 3. Review Module
Manages product reviews, ratings, and authorized review deletion.

### 4. Cart Module
Handles shopping cart operations and selected products.

### 5. Order Module
Manages order-related operations, checkout workflows, and seller-side order status updates.

---

## 🔮 Future Enhancements

Potential improvements for future versions include:

- 🔎 Advanced search and filtering.
- ❤️ Wishlist functionality.
- 💳 Secure online payment integration.
- 💬 Buyer-seller messaging.
- 🔔 Order and listing notifications.
- 🛡️ Product reporting and moderation.
- 📊 Seller dashboard with analytics.
- 🚀 Deployment with a production-ready database and hosting configuration.

These are planned enhancements and are not necessarily part of the current implementation.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Commit your changes with a meaningful message.
5. Submit a pull request.

```bash
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

---

## 🔐 Security Notes

- Keep `.env` and other secret configuration files out of version control.
- Validate and sanitize user input.
- Enforce authorization checks for seller and order operations.
- Never expose database credentials or private API keys.
- Use secure session and cookie settings in production.

---

## 📄 License

This project is currently available under the license selected by its owner. Add a `LICENSE` file and specify the applicable license before distributing or reusing the project.

---

## 👨‍💻 Author

**Mohd Arsh**

B.Tech — Information Technology

GitHub: [@arshmalik9927](https://github.com/arshmalik9927)

---

⭐ If you find this project useful, consider giving the repository a star.

*Built to make campus buying and selling simpler, smarter, and more accessible.*
