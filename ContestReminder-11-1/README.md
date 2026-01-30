# CodeArena - Contest Management Platform

A comprehensive full-stack contest management platform for competitive programming enthusiasts, featuring real-time contest tracking across 10+ major online coding platforms.

## 🚀 Features

### Multi-Platform Contest Integration
- **Codeforces** - Official API integration with real-time contest data
- **LeetCode** - Contest discovery via aggregation services
- **CodeChef** - Enhanced keyword matching and platform detection
- **AtCoder** - Japanese competitive programming platform
- **HackerRank** - Coding challenges and assessments
- **GeeksforGeeks** - Educational programming contests
- **Coding Ninjas** - Learning-focused competitions
- **TopCoder** - Legacy competitive programming
- **HackerEarth** - Developer assessments
- **CodeByte** - Algorithm challenges

### Key Capabilities
- 🔍 **Real-time Contest Discovery** - Automatic fetching from multiple APIs
- 📅 **Contest Reminders** - Personal reminder system for upcoming contests
- 🎯 **Direct Participation Links** - One-click access to contest platforms
- 🎨 **Modern UI/UX** - Clean, responsive design with dark mode support
- 🏷️ **Platform-Specific Branding** - Distinctive colors and icons for each platform
- 📱 **Mobile Responsive** - Works seamlessly across all devices
- ⚡ **Live Status Indicators** - Real-time contest status with animations

## 🛠️ Technology Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/UI** component library
- **TanStack Query** for data fetching
- **Wouter** for routing
- **Lucide React** for icons

### Backend
- **Express.js** with TypeScript
- **Axios** for API calls
- **Drizzle ORM** for database operations
- **PostgreSQL** for data persistence

### Development Tools
- **Vite** for build tooling
- **ESLint** for code quality
- **TypeScript** for type safety
- **Node.js** runtime environment

## 🏗️ Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
├── server/                # Backend Express application
│   ├── contest-apis.ts    # External API integrations
│   ├── routes.ts          # API route definitions
│   └── storage.ts         # Database operations
├── shared/                # Shared TypeScript schemas
└── README.md             # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Internet connection for fetching contest data

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd codearena
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env file with your database configuration
DATABASE_URL=your_postgresql_connection_string
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 📊 Database Schema

- **contests** - Internal contest management
- **problems** - Contest problems with test cases
- **submissions** - Code submissions and evaluations
- **leaderboard** - Contest rankings
- **reminders** - External contest reminders
- **users** - User authentication (prepared for future)

## 🔌 API Endpoints

- `GET /api/external-contests` - Fetch real contests from external platforms
- `GET /api/reminders` - Personal contest reminders
- `POST /api/reminders` - Create new reminder
- `DELETE /api/reminders/:id` - Delete reminder
- `GET /api/stats` - Dashboard statistics

## 🎨 UI Components

### Contest Discovery
- Platform selection grid with contest counts
- Live contest indicators with pulse animations
- Clean, modern card layout with hover effects
- Direct participation buttons

### Contest Management
- Personal reminder system
- Contest filtering and search
- Platform-specific styling and branding
- Responsive grid layouts

## 🔧 Development Guidelines

- Follow modern React patterns with TypeScript
- Use TanStack Query for all API calls
- Implement proper error handling
- Add data-testid attributes for testing
- Maintain responsive design principles
- Use Shadcn/UI components consistently

## 🚀 Deployment

The project is optimized for Replit deployment:
- Automated build process
- Environment variable configuration
- PostgreSQL database integration
- Production-ready Express server

## 📝 Contributing

1. Follow the existing code style and patterns
2. Add proper TypeScript types
3. Update documentation for new features
4. Test thoroughly across different platforms
5. Ensure responsive design compatibility

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For questions or support, please refer to the project documentation or create an issue in the repository.

---

Built with ❤️ for the competitive programming community