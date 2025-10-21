# 🛒 Revest Frontend Application

A modern React application for managing products and orders, built with the latest web technologies and connected to a microservices backend architecture.

## 🚀 Technologies Used

### Core Framework

- **React 19.1.1** - Latest React with modern features
- **Vite 7.1.7** - Fast build tool and development server
- **JavaScript (ES6+)** - Modern JavaScript with modules

### State Management

- **Redux Toolkit 2.9.1** - Predictable state container
- **React Redux 9.2.0** - React bindings for Redux

### Routing & Navigation

- **React Router DOM 7.9.4** - Client-side routing
- **React Router 7.9.4** - Core routing functionality

### HTTP Client & API

- **Axios 1.12.2** - Promise-based HTTP client
- **API Versioning** - Support for v1 and v2 API endpoints

### UI & Icons

- **React Icons 5.5.0** - Popular icon library
- **Custom CSS** - Modular component styling

### Development Tools

- **ESLint 9.36.0** - Code linting and formatting
- **Vite Plugin React 5.0.4** - React support for Vite

## 📁 Project Structure

```
src/
├── api/                    # API client configuration
│   ├── apiClient.js        # Axios clients for v1/v2 APIs
│   ├── productService.js  # Product API service
│   └── orderService.js     # Order API service
├── components/             # Reusable UI components
│   ├── Dropdown/          # Custom dropdown component
│   ├── Loader/            # Loading spinner
│   ├── Modal/             # Modal dialog
│   ├── Navbar/            # Navigation bar
│   ├── OrderForm/         # Order creation form
│   ├── OrderRow/          # Order table row
│   ├── Orders/            # Orders list component
│   ├── OrderTable/        # Orders table
│   ├── ProductCard/       # Product display card
│   ├── ProductForm/       # Product creation form
│   ├── Products/          # Products list component
│   ├── ProductSelector/   # Product selection component
│   ├── Tag/               # Status tags
│   └── Toast/             # Notification toasts
├── redux/                 # State management
│   ├── slices/            # Redux slices
│   │   ├── orderSlice.js  # Order state management
│   │   └── productSlice.js # Product state management
│   └── store.js           # Redux store configuration
├── app/                   # Application pages
├── assets/                # Static assets
├── App.jsx                # Main application component
└── main.jsx               # Application entry point
```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Base URLs
VITE_PRODUCT_API_BASE_URL=http://localhost:5000
VITE_ORDER_API_BASE_URL=http://localhost:5001

# Optional: API Timeout (default: 10000ms)
VITE_API_TIMEOUT=10000
```

### Environment Configuration

| Variable                    | Description              | Default                 | Required |
| --------------------------- | ------------------------ | ----------------------- | -------- |
| `VITE_PRODUCT_API_BASE_URL` | Product service API URL  | `http://localhost:5000` | ✅       |
| `VITE_ORDER_API_BASE_URL`   | Order service API URL    | `http://localhost:5001` | ✅       |
| `VITE_API_TIMEOUT`          | API request timeout (ms) | `10000`                 | ❌       |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- Backend services running (see Backend README)

### Installation

```bash
# Install dependencies
$ npm install
```

### Development

```bash
# Start development server
$ npm run dev
```

The application will be available at `http://localhost:5173`

## 🎯 Features

### Product Management

- ✅ **Create Products** - Add new products with name and price
- ✅ **List Products** - View all products with pagination
- ✅ **Update Products** - Edit existing product details
- ✅ **Delete Products** - Remove products

### Order Management

- ✅ **Create Orders** - Place orders with multiple products
- ✅ **Update Orders** - Update orders with multiple products
- ✅ **Order History** - View all orders with status tracking
- ✅ **Order Status** - Track order progress (Pending, Processing, Shipped, Delivered)
- ✅ **Delete Orders** - Remove orders

### User Experience

- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Real-time Updates** - Live data synchronization
- ✅ **Loading States** - User-friendly loading indicators
- ✅ **Error Handling** - Graceful error management
- ✅ **Toast Notifications** - Success and error messages

## 🔗 API Integration

The frontend connects to two microservices:

### Product Service (Port 5000)

- Product CRUD operations
- Product search and filtering
- Product management endpoints

### Order Service (Port 5001)

- Order creation and management
- Order status updates
- Order history and details

## 🛠️ Development Commands

```bash
# Development server
$ npm run dev

# Production build
$ npm run build

# Preview production build
$ npm run preview

# Lint code
$ npm run lint
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
