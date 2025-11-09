# 🚀 Lead Genius - AI-Powered Lead Management Platform

<div align="center">

![Lead Genius](https://img.shields.io/badge/Lead-Genius-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite)

**Transform your lead management with AI-powered qualification, automated messaging, and voice technology.**

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Development](#development)
- [Building](#building)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

Lead Genius is a cutting-edge, AI-powered lead management platform designed to help businesses qualify high-intent leads and automate follow-up processes. Built with modern web technologies and integrated with powerful AI services, it provides a comprehensive solution for sales teams.

### Why Lead Genius?

- **🤖 AI-Powered**: Automated lead qualification using advanced AI algorithms
- **📊 Real-time Analytics**: Track conversions, response rates, and lead scores
- **💬 Smart Messaging**: AI-driven messaging center with automated responses
- **🎤 Voice AI**: Integrated Millis Voice AI for natural conversations
- **🔌 Integrations**: Seamless connections with Twilio, Salesforce, HubSpot, and more
- **📱 Responsive**: Beautiful UI that works on all devices
- **⚡ Fast**: Built with Vite for lightning-fast development and builds

## ✨ Features

### Lead Management
- **Smart Lead Scoring**: AI-powered qualification scores (Hot, Warm, Nurturing, Cold)
- **Lead Filtering**: Advanced filters and search capabilities
- **Activity Timeline**: Complete history of all lead interactions
- **Bulk Actions**: Manage multiple leads simultaneously
- **Export Functionality**: Export leads to CSV or PDF

### AI Messaging Center
- **Automated Responses**: AI-generated personalized messages
- **Multi-channel**: Email, SMS, and in-app messaging
- **Template Library**: Pre-built message templates
- **Sentiment Analysis**: Understand lead emotions and intent

### Voice AI Integration
- **Millis Voice AI**: Natural-sounding AI voice technology
- **Call Recording**: Automatic transcription and analysis
- **Sentiment Scoring**: Voice-based lead intent detection
- **Call History**: Complete conversation logs

### Analytics Dashboard
- **Key Metrics**: Total leads, conversion rates, response times
- **Visual Charts**: Lead scoring visualization
- **Performance Tracking**: Monitor team and individual performance
- **Export Reports**: Generate comprehensive reports

### Integration Hub
- **Twilio**: SMS and voice communication
- **OpenAI**: Advanced AI capabilities
- **Salesforce**: CRM synchronization
- **HubSpot**: Marketing automation
- **Slack**: Team notifications
- **Zapier**: Connect to 3000+ apps

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - Modern React with hooks and concurrent features
- **TypeScript 5.8** - Type-safe code with latest TS features
- **Vite 6.2** - Next-generation frontend tooling
- **React Router 6** - Declarative routing
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 11** - Production-ready animations

### UI Components
- **Radix UI** - Accessible, unstyled component primitives
- **Lucide React** - Beautiful, consistent icons
- **shadcn/ui** - Re-usable components built with Radix UI and Tailwind

### State & Forms
- **React Hook Form 7** - Performant forms with easy validation
- **Zod 3** - TypeScript-first schema validation

### Backend Services
- **Supabase** - Backend-as-a-Service (Auth, Database, Storage)
- **Millis AI** - Voice AI integration
- **Twilio** - Communication platform

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Cryptouprise/leadgenius.git
   cd leadgenius
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
   VITE_MILLIS_API_KEY=your_millis_api_key
   VITE_TEMPO=false
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id

# Millis Voice AI
VITE_MILLIS_API_KEY=your-millis-api-key

# Base Path (for deployment)
VITE_BASE_PATH=/

# Tempo Development Tools (optional)
VITE_TEMPO=false
```

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the database migrations from the `/supabase` folder
3. Copy your project URL and anon key to `.env`

## 📁 Project Structure

```
leadgenius/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # Reusable UI components
│   │   ├── ErrorBoundary.tsx
│   │   ├── home.tsx
│   │   ├── LeadOverview.tsx
│   │   ├── LeadManagement.tsx
│   │   ├── AIMessagingCenter.tsx
│   │   ├── IntegrationHub.tsx
│   │   └── VoiceAI.tsx
│   ├── pages/          # Page components
│   │   └── Dashboard.tsx
│   ├── lib/            # Utility functions
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # App entry point
│   └── index.css       # Global styles
├── .env.example        # Environment variables template
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── README.md          # This file
```

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Generate Supabase types
npm run types:supabase
```

### Code Style

This project uses:
- **ESLint** for code linting
- **TypeScript** for type checking
- **Prettier** (recommended) for code formatting

### Adding New Features

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 🏗️ Building

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory with:
- Code splitting for optimal loading
- Minified assets
- Optimized images
- Source maps (disabled by default)

### Build Analysis

The build process includes:
- **Code Splitting**: Separate chunks for vendors, UI components, and animations
- **Tree Shaking**: Removes unused code
- **Asset Optimization**: Compresses images and other assets
- **Bundle Size Warnings**: Alerts for chunks over 600KB

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variables
4. Deploy!

### Docker

```bash
# Build the image
docker build -t leadgenius .

# Run the container
docker run -p 3000:3000 leadgenius
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Write clean, maintainable code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Be respectful and constructive

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Supabase](https://supabase.com/)
- [Framer Motion](https://www.framer.com/motion/)

## 📞 Support

- 📧 Email: support@leadgenius.com
- 💬 Discord: [Join our community](https://discord.gg/leadgenius)
- 🐦 Twitter: [@leadgenius](https://twitter.com/leadgenius)

---

<div align="center">
  <strong>Built with ❤️ by the Lead Genius Team</strong>
  <br />
  <sub>Making lead management effortless</sub>
</div>
