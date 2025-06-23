# Web Applications Collection

A collection of four interactive web applications built with HTML, CSS, and JavaScript. Each application is standalone and ready to use in any modern web browser.

## 📱 Applications Included

### 1. Calculator (`/calculator`)
A fully functional calculator with a clean, modern interface.

**Features:**
- Basic arithmetic operations (+, -, *, /)
- Clear button to reset calculations
- Decimal point support
- Responsive button layout
- Dark theme design

**Usage:**
- Click number buttons to input values
- Use operation buttons for calculations
- Press "=" to get results
- Press "C" to clear the display

### 2. Weekly Calendar with Tasks (`/calendar`)
A weekly calendar application with integrated task management.

**Features:**
- Week-by-week navigation
- Month/year selector dropdowns
- Today button for quick navigation
- Task management system
- Task completion tracking
- Task deletion functionality
- Responsive design

**Usage:**
- Navigate weeks using arrow buttons
- Click on any date to select it
- Use the "+" button to add tasks to selected dates
- Mark tasks as complete with the ✅ button
- Delete tasks with the 🗑 button

### 3. Rock Paper Scissors Game (`/rock-papper`)
An interactive Rock Paper Scissors game with auto-play functionality.

**Features:**
- Classic rock, paper, scissors gameplay
- Score tracking (wins, losses, draws)
- Auto-play mode for continuous games
- Visual feedback with emoji images
- Score persistence using localStorage
- Gradient background design

**Usage:**
- Click rock, paper, or scissors to make your move
- View results and running score
- Use "Auto Play" for automated gameplay
- Reset scores anytime with "Reset Score" button

### 4. To-Do List (`/to-do-list`)
A comprehensive task management application with scheduling.

**Features:**
- Add tasks with specific date and time
- Mark tasks as completed
- Delete unwanted tasks
- Data persistence using localStorage
- Responsive grid layout
- Icon-based action buttons

**Usage:**
- Enter task name and select date/time
- Click "Add ToDo" to save the task
- Use ✓ button to mark tasks as done
- Use 🗑 button to delete tasks

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or server required

### Installation
1. Clone or download this repository
2. Navigate to the desired application folder
3. Open the `index.html` file in your web browser

```bash
# Example for calculator
cd calculator
open index.html  # macOS
# or
start index.html # Windows
# or
xdg-open index.html # Linux
```

## 📁 Project Structure

```
/
├── calculator/
│   ├── index.html
│   ├── index.js
│   └── style.css
├── calendar/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── rock-papper/
│   ├── index.html
│   ├── index.js
│   ├── style.css
│   └── assests/
│       ├── rock-emoji.png
│       ├── paper-emoji.png
│       └── scissors-emoji.png
├── to-do-list/
│   ├── index.html
│   ├── index.js
│   └── style.css
└── README.md
```

## 🛠 Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Styling, layouts, and responsive design
- **Vanilla JavaScript** - Interactive functionality and DOM manipulation
- **LocalStorage API** - Data persistence (Rock Paper Scissors scores, To-Do items, Calendar tasks)
- **Flexbox & CSS Grid** - Modern layout techniques
- **RemixIcon** - Icon library (To-Do List)

## 📱 Responsive Design

All applications are designed to work seamlessly across different screen sizes:
- Desktop computers
- Tablets
- Mobile phones (responsive breakpoints included)

## ⚠️ Browser Compatibility

These applications work in all modern browsers that support:
- ES6 JavaScript features
- CSS Grid and Flexbox
- LocalStorage API
- HTML5 form elements

## 🔧 Customization

Each application can be easily customized:

- **Colors & Themes**: Modify CSS variables and color schemes in the respective `style.css` files
- **Functionality**: Extend features by editing the JavaScript files
- **Layout**: Adjust responsive breakpoints and grid layouts as needed

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for:
- Bug fixes
- Feature enhancements
- UI/UX improvements
- Code optimizations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure JavaScript is enabled in your browser
3. Try refreshing the page or clearing browser cache
4. For Rock Paper Scissors, make sure the emoji images are in the correct `/assests/` folder

---

**Enjoy using these applications! 🎉**
