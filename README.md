# Lead Genius - AI-Powered Lead Management Platform

![CI Status](https://github.com/Cryptouprise/leadgenius/workflows/CI/badge.svg)

An AI-powered lead management platform built with React, TypeScript, and Vite. Features intelligent lead scoring, automated messaging, voice AI integration, and comprehensive analytics.

## 🚀 Features

- **Lead Management**: Organize, filter, and prioritize leads with an intuitive interface
- **AI-Powered Qualification**: Automated lead scoring based on engagement and intent signals
- **Messaging Center**: AI-driven messaging and automated follow-ups
- **Voice AI Integration**: Millis AI integration for natural voice interactions
- **Analytics Dashboard**: Comprehensive insights and performance metrics
- **Integration Hub**: Connect with Twilio, Salesforce, HubSpot, and more
- **Real-time Updates**: Live lead activity tracking
- **Responsive Design**: Works seamlessly across all devices

## 📋 Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/Cryptouprise/leadgenius.git
cd leadgenius
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment file and configure:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration.

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## 🧪 Testing

Run tests:
```bash
npm test
```

Run tests with UI:
```bash
npm run test:ui
```

Generate coverage report:
```bash
npm run test:coverage
```

## 🔍 Code Quality

### Linting
```bash
npm run lint
npm run lint:fix
```

### Type Checking
```bash
npm run typecheck
```

### Code Formatting
```bash
npm run format
npm run format:check
```

## 📦 Build Optimization

The project uses code splitting and chunk optimization to reduce bundle size:
- React and routing libraries are bundled separately
- UI components are split into dedicated chunks
- Form libraries are bundled together
- Lazy loading for routes and components

## 🏗️ Project Structure

```
leadgenius/
├── .github/
│   └── workflows/       # CI/CD workflows
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # Reusable UI components
│   │   └── ...         # Feature components
│   ├── pages/          # Page components
│   ├── lib/            # Utility functions
│   ├── types/          # TypeScript types
│   ├── test/           # Test setup and utilities
│   └── stories/        # Storybook stories
├── public/             # Static assets
└── dist/               # Production build (generated)
```

## 🔒 Security

- All dependencies are regularly audited for vulnerabilities
- Environment variables are validated on startup
- TypeScript strict mode is enabled
- ESLint security rules are enforced
- Regular security scans via GitHub Actions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Ensure all tests pass before submitting PR
- Follow the existing code style (enforced by ESLint and Prettier)
- Update documentation as needed

## 📝 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_BASE_PATH` | Application base path | No | `/` |
| `VITE_TEMPO` | Enable Tempo devtools | No | `false` |
| `VITE_SUPABASE_URL` | Supabase project URL | No | - |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | No | - |

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the dist/ folder
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]
```

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Animations with [Framer Motion](https://www.framer.com/motion/)

## 📞 Support

For support, email support@leadgenius.com or open an issue in the repository.

---

Made with ❤️ by the Lead Genius Team

