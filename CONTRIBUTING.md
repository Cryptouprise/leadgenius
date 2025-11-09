# Contributing to Lead Genius

Thank you for your interest in contributing to Lead Genius! This document provides guidelines and instructions for contributing to the project.

## 🚀 Getting Started

1. **Fork the repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/leadgenius.git
   cd leadgenius
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Development Workflow

1. Make your changes following our [coding standards](#coding-standards)
2. Write or update tests as needed
3. Run the test suite to ensure everything passes:
   ```bash
   npm test
   ```
4. Run the linter and fix any issues:
   ```bash
   npm run lint:fix
   ```
5. Format your code:
   ```bash
   npm run format
   ```
6. Build the project to ensure no errors:
   ```bash
   npm run build
   ```

## 🧪 Testing

- All new features should include tests
- Bug fixes should include a test that would have caught the bug
- Run tests with: `npm test`
- Run tests with coverage: `npm run test:coverage`
- Run tests in watch mode: `npm test -- --watch`

## 📋 Coding Standards

### TypeScript
- Use TypeScript for all new code
- Enable strict mode and fix all type errors
- Prefer interfaces over types for object shapes
- Use meaningful variable and function names

### React
- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Avoid inline functions in JSX when possible

### Code Style
- We use ESLint and Prettier for code formatting
- Run `npm run format` before committing
- Follow the existing code style in the project
- Use meaningful commit messages

### Component Guidelines
- Place reusable UI components in `src/components/ui/`
- Place feature-specific components in `src/components/`
- Export components as named exports when appropriate
- Include JSDoc comments for complex functions

## 🔍 Code Review Process

1. **Submit a Pull Request** with a clear description of your changes
2. Reference any related issues
3. Ensure all CI checks pass
4. Address any feedback from maintainers
5. Once approved, your PR will be merged

## 📄 Pull Request Guidelines

### Title Format
```
feat: Add user authentication
fix: Resolve navigation issue
docs: Update README
test: Add tests for utils
refactor: Improve code organization
```

### Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

## 🐛 Bug Reports

When filing a bug report, please include:

1. **Clear title** describing the issue
2. **Steps to reproduce** the bug
3. **Expected behavior**
4. **Actual behavior**
5. **Screenshots** if applicable
6. **Environment information** (browser, OS, etc.)

## 💡 Feature Requests

When suggesting a new feature:

1. **Describe the problem** you're trying to solve
2. **Propose a solution** with examples if possible
3. **Consider alternatives** you've thought about
4. **Additional context** that might be helpful

## 📚 Documentation

- Update documentation when changing functionality
- Document new features with examples
- Keep README.md up to date
- Add JSDoc comments for public APIs

## 🔐 Security

If you discover a security vulnerability, please email security@leadgenius.com directly instead of opening a public issue.

## 📞 Questions?

- Open a discussion in the repository
- Join our community chat (if available)
- Email support@leadgenius.com

## 📜 License

By contributing to Lead Genius, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions help make Lead Genius better for everyone. We appreciate your time and effort!
