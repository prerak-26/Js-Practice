# Amazon E-commerce Project

A fully functional e-commerce website inspired by Amazon, built with vanilla JavaScript, HTML, and CSS. This project demonstrates modern web development practices including responsive design, local storage management, and modular JavaScript architecture.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse through a comprehensive collection of products with images, descriptions, and pricing
- **Shopping Cart**: Add/remove items, update quantities, and view cart total
- **Checkout Process**: Complete order review with delivery options and payment summary
- **Order Management**: View order history and track order status
- **Order Tracking**: Real-time order tracking with progress indicators

### Technical Features
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Local Storage**: Persistent cart and order data across browser sessions
- **Modular Architecture**: Well-organized code structure with separate modules
- **Search Functionality**: Product search capability (UI ready)
- **Dynamic Content**: JavaScript-driven product rendering and cart updates

## 📁 Project Structure

```
Amazon-project/
├── amazon.html              # Main product catalog page
├── checkout.html            # Checkout and payment page
├── orders.html              # Order history page
├── tracking.html            # Order tracking page
├── scripts/                 # JavaScript files
│   ├── amazon.js           # Main product page logic
│   ├── checkout.js         # Checkout functionality
│   ├── ordersPage.js       # Orders page logic
│   ├── tracking.js         # Order tracking logic
│   └── utils/              # Utility functions
│       ├── cartQuantity.js
│       ├── cartQuantityHtml.js
│       ├── money.js
│       └── saveLocalStorage.js
├── data/                   # Data files
│   ├── products.js         # Product catalog data
│   ├── cart.js            # Cart management
│   ├── order.js           # Order data structure
│   └── deliveryOption.js  # Delivery options
├── styles/                 # CSS styling
│   ├── shared/            # Shared styles
│   │   ├── general.css
│   │   └── amazon-header.css
│   └── pages/             # Page-specific styles
│       ├── amazon.css
│       ├── checkout/
│       ├── orders.css
│       └── tracking.css
├── images/                 # Product images and icons
│   ├── products/          # Product images
│   ├── variations/        # Product variations
│   ├── icons/            # UI icons
│   └── ratings/          # Rating images
├── backend/               # Backend data
│   └── products.json     # Product data in JSON format
└── Test-Jasmin/          # Unit tests
    ├── test.html
    ├── data/
    ├── utils/
    └── lib/
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: ES6+ features and modular programming
- **Local Storage API**: Data persistence
- **Jasmine**: Unit testing framework
- **Google Fonts**: Roboto font family
- **Responsive Design**: Mobile-first approach

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
1. Clone or download the project files
2. Open `amazon.html` in your web browser
3. Start browsing and shopping!

### Running Tests
1. Navigate to the `Test-Jasmin` folder
2. Open `test.html` in your browser
3. View test results in the Jasmine test runner

## 📱 Pages Overview

### 1. Product Catalog (`amazon.html`)
- Browse products in a responsive grid layout
- Add items to cart with quantity selection
- Search functionality (UI ready)
- Cart icon with live quantity updates

### 2. Checkout (`checkout.html`)
- Review cart items and quantities
- Select delivery options
- View order summary and payment details
- Secure checkout interface

### 3. Orders (`orders.html`)
- View complete order history
- Order details including items, dates, and totals
- Track order status with progress indicators
- Easy navigation to order tracking

### 4. Order Tracking (`tracking.html`)
- Real-time order status updates
- Visual progress bar showing delivery stages
- Detailed tracking information
- Back navigation to orders

## 🎨 Design Features

- **Amazon-inspired UI**: Familiar interface design
- **Responsive Layout**: Works seamlessly across all devices
- **Modern Typography**: Clean, readable Roboto font
- **Consistent Branding**: Amazon-style color scheme and logos
- **Interactive Elements**: Hover effects and smooth transitions

## 💾 Data Management

- **Local Storage**: Cart and order data persists between sessions
- **Product Catalog**: Comprehensive product database with images
- **Order History**: Complete order tracking and management
- **Cart State**: Real-time cart updates and quantity management

## 🧪 Testing

The project includes comprehensive unit tests using Jasmine:
- Cart functionality tests
- Product data tests
- Utility function tests
- Money formatting tests

## 🔧 Customization

### Adding Products
1. Edit `data/products.js` to add new products
2. Add corresponding images to `images/products/`
3. Update product variations if needed

### Styling Changes
1. Modify CSS files in the `styles/` directory
2. Update shared styles in `styles/shared/`
3. Customize page-specific styles in `styles/pages/`

### Functionality Extensions
1. Add new JavaScript modules in `scripts/`
2. Extend utility functions in `scripts/utils/`
3. Implement additional features following the existing patterns

## 📄 License

This project is created for educational purposes and demonstrates modern web development practices.

## 🤝 Contributing

This is a learning project showcasing e-commerce functionality. Feel free to use it as a reference for your own projects.

## 📞 Support

For questions or issues related to this project, please refer to the code comments and documentation within the files.

---

**Note**: This is a frontend-only implementation. For a production e-commerce site, you would need to integrate with a backend server, payment processing, and database systems. 