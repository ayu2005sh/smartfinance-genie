
# AIconomy - AI-Powered Personal Finance Platform

## Overview

AIconomy is a modern, AI-powered personal finance platform designed to help users manage their finances more effectively. The application provides a comprehensive suite of tools for expense tracking, budget management, financial insights, and bank account integration.

## Key Features

- **Intelligent Dashboard**: Consolidated view of your financial health with real-time metrics
- **Multi-Account Management**: Connect and manage multiple bank accounts in one place
- **Expense Tracking**: Easily log and categorize expenses with automatic categorization
- **Budget Planning**: Set up and monitor budgets across different spending categories
- **Financial Insights**: AI-powered analysis of spending patterns and trends
- **Responsive Design**: Fully optimized experience across desktop and mobile devices

## Technology Stack

### Frontend
- **React 18**: Component-based UI library for building interactive interfaces
- **TypeScript**: Static typing for improved code quality and developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: High-quality UI components built with Radix UI and Tailwind
- **React Query**: Data fetching, caching, and state management
- **React Router**: Declarative routing for single page applications
- **Recharts**: Composable charting library for data visualization

### Backend & Infrastructure
- **Supabase**: Provides authentication, PostgreSQL database, and serverless functions
- **Row Level Security**: Database-level security ensuring user data isolation
- **Real-time Subscriptions**: Live updates for collaborative features

## Security Features

- Bank-level encryption for sensitive financial data
- JWT-based authentication system
- Row-level security policies for granular data access control
- Masked account details with only last 4 digits visible in UI

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/aiconomy.git

# Navigate to project directory
cd aiconomy

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at [http://localhost:8080](http://localhost:8080)

## Project Structure

```
src/
├── components/         # Reusable UI components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
├── pages/              # Application pages/routes
├── utils/              # Utility functions
└── App.tsx             # Main application component
```

## Roadmap

- Investment portfolio tracking
- Automated bill payment reminders
- AI-powered financial goal recommendations
- Mobile application with biometric authentication
- Expanded financial institution integrations

## License

This project is licensed under the MIT License - see the LICENSE file for details.
