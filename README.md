# ClubHub Frontend

A modern, responsive web application built with React and Vite for managing and showcasing university clubs and organizations. ClubHub provides an intuitive interface for students to discover clubs, view events, and access club information.

## 🚀 Features

- **Club Discovery**: Browse and explore various university clubs by category
- **Event Management**: View upcoming events and club activities
- **Admin Dashboard**: Comprehensive admin panel for club management
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Toggle between dark and light themes
- **Category-based Organization**: Clubs organized by categories (Technology, Innovation, Creative, Cultural, Academic, Professional, Religious, Community, Sports)
- **Firebase Integration**: User authentication and data management
- **Modern UI**: Built with Tailwind CSS and DaisyUI components

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.12 + DaisyUI 5.0.54
- **Routing**: React Router DOM 7.8.2
- **Authentication**: Firebase 12.3.0
- **Language**: JavaScript (ES6+)
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/
│   ├── adminDashboard/          # Admin panel components
│   │   ├── AdminDashboard.jsx   # Main admin dashboard
│   │   ├── Overview.jsx         # Dashboard overview
│   │   └── Sidebar.jsx          # Admin sidebar navigation
│   ├── club/                    # Club-related components
│   │   ├── Achievements.jsx     # Club achievements display
│   │   ├── Club.jsx             # Individual club page
│   │   ├── Committee.jsx        # Club committee members
│   │   ├── Contacts.jsx         # Club contact information
│   │   ├── Events.jsx           # Club events listing
│   │   └── Testimonials.jsx     # Member testimonials
│   ├── Clubcards.jsx            # Club card components
│   ├── Eventcarousel.jsx        # Events carousel
│   ├── Home.jsx                 # Main homepage
│   ├── Navbar.jsx               # Navigation bar
│   ├── SignIn.jsx               # Authentication component
│   ├── Skeleton.jsx             # Loading skeleton components
│   └── ThemeToggler.jsx         # Theme switching component
├── lib/
│   └── firebase_user_authentication.js  # Firebase auth utilities
├── routes/
│   └── Route.jsx                # Application routing configuration
├── assets/
│   └── photos/                  # Static images and assets
├── main.jsx                     # Application entry point
└── index.css                    # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (version 8 or higher)
- Firebase project setup
- Backend server running (see backend repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Fec_ClubHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   VITE_BACKEND_SERVER_URL=http://localhost:3000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code quality issues

## 🎨 Styling and Theming

The application uses Tailwind CSS with DaisyUI components for styling. The theme system includes:

- **Custom Color Palette**: Category-specific colors for different club types
- **Dark/Light Mode**: Toggle between themes using the theme toggler
- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- **Component Library**: DaisyUI components for consistent UI elements

### Category Colors

- **Technology**: Success green
- **Innovation**: Custom innovation color
- **Creative/Cultural**: Cultural purple
- **Academic**: Academic blue
- **Professional**: Primary brand color
- **Religious**: Technology color
- **Community**: Error secondary color
- **Sports**: Sports orange

## 🔧 Configuration

### Vite Configuration
The application is configured with Vite for fast development and building:
- React plugin for JSX support
- Tailwind CSS integration
- Development server on port 5173
- Hot module replacement enabled

### Firebase Configuration
Firebase is used for user authentication. Configure your Firebase project and add the credentials to your `.env` file.

## 🌐 API Integration

The frontend communicates with the backend API for:
- Fetching club data
- Managing events
- User authentication
- Admin dashboard operations

Make sure the backend server is running and accessible at the URL specified in your environment variables.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop (1024px and up)
- Large screens (1280px and up)

## 🚀 Deployment

### Vercel Deployment
The project includes a `vercel.json` configuration file for easy deployment to Vercel:

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Contact the development team

## 🔄 Version History

- **v0.0.0** - Initial release with basic club management features

---

**Note**: Make sure to have the backend server running before starting the frontend development server for full functionality.