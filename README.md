# E-Commerce Platform (DRF + React)

A full-stack, production-ready e-commerce web application featuring a decoupled architectural design. The system is built using **Django REST Framework (DRF)** for high-performance RESTful APIs and a responsive **React** single-page application (SPA) on the frontend. 

## 🔗 Live Deployments

The platform is dynamically hosted on **Railway** with separate continuous delivery pipelines for frontend and backend:

* **🖥️ Live Frontend UI:** [https://frontend-production-44a5.up.railway.app/](https://frontend-production-44a5.up.railway.app/)
* **⚙️ Live API Endpoints:** [https://backend-production-1c4d.up.railway.app/](https://backend-production-1c4d.up.railway.app/api/products/products)

---

## Technology Stack

Per the assignment guidelines allowing a custom tech stack, this project utilizes a modern decoupled architecture instead of monolithic server-side rendering (EJS):

* **Backend:** Python, Django, Django REST Framework (DRF)
* **Database:** PostgreSQL / Relational Database (via Railway)
* **Authentication:** JWT (JSON Web Tokens) via `djangorestframework-simplejwt`
* **Frontend:** React, React Router, Tailwind CSS / Modern Responsive UI CSS
* **Deployment & Hosting:** Railway (CI/CD connected to GitHub)

---

## Features & Roadmap Implementation

### Week 1: Environment Setup & Routing
* Initialized decoupled environments for both API service and Client app.
* Designed core page wrappers: **Home View**, **Product Catalog Layout**, and **Product Details View**.
* Implemented mobile-first responsive scaling across all UI elements using modern grid/flex layouts.

### Week 2: Database Layer & Dynamic Rendering
* Engineered relational database schemas for Products tracking critical parameters: `id`, `name`, `price`, `category`, `image`, `description`, and `stock`.
* Created dynamic API endpoints returning serializable JSON payloads.
* Implemented server-side filtering and robust search endpoints to filter inventory data conditionally by name or categorization metrics.

### Week 3: Security & Production Hardening
* Secured endpoints using standard **JWT stateless authentication** (Login/Signup flows).
* Enforced permissions restricting standard actions vs. admin-level operations (such as inventory adjustments/product creation forms).
* Added cursor/offset pagination models for efficient database queries on large-scale datasets.
* Configured CORS headers and environment variables for secure live production deployment on Railway.

---

## Local Installation & Setup

To run this project locally, clone the repository and configure the backend and frontend components.

### 1. Backend Setup (DRF)
```bash
# Navigate to backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install required packages
pip install -r requirements.txt


**### 2. Frontend Setup (React)**

# Navigate to frontend directory
cd frontend

# Install packages
npm install

# Start the local React development server
npm run dev

# Run database migrations
python manage.py migrate

# Start the local development server
python manage.py runserver
