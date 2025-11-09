# Contributing to Lead Genius

First off, thank you for considering contributing to Lead Genius! It's people like you that make Lead Genius such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to support@leadgenius.com.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed and what behavior you expected**
* **Include screenshots if possible**
* **Include your environment details** (OS, browser, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain which behavior you expected to see instead**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the TypeScript/React style guide
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## Development Process

### Setting Up Your Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/leadgenius.git
   cd leadgenius
   ```

3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/Cryptouprise/leadgenius.git
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Workflow

1. **Make your changes**
   * Write meaningful commit messages
   * Keep commits focused and atomic
   * Test your changes thoroughly

2. **Run linting**
   ```bash
   npm run lint
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Test your changes**
   * Manually test all affected features
   * Verify responsive design
   * Check for console errors

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

* `feat:` A new feature
* `fix:` A bug fix
* `docs:` Documentation only changes
* `style:` Changes that don't affect code meaning (white-space, formatting)
* `refactor:` Code change that neither fixes a bug nor adds a feature
* `perf:` Performance improvements
* `test:` Adding missing tests
* `chore:` Changes to build process or auxiliary tools

Examples:
```
feat: add dark mode toggle
fix: resolve navigation bug on mobile
docs: update README with new features
style: format code with prettier
refactor: simplify lead scoring logic
perf: optimize bundle size
test: add tests for AI messaging
chore: update dependencies
```

### Code Style Guidelines

#### TypeScript/React

* Use TypeScript for all new files
* Use functional components with hooks
* Prefer const over let
* Use meaningful variable names
* Extract reusable logic into custom hooks
* Keep components small and focused

#### Styling

* Use Tailwind CSS utility classes
* Follow existing color scheme and spacing
* Ensure responsive design (mobile-first)
* Use semantic HTML elements
* Maintain accessibility (ARIA labels, keyboard navigation)

#### File Structure

* Components in `src/components/`
* Pages in `src/pages/`
* Utilities in `src/lib/`
* Types in `src/types/`
* UI components in `src/components/ui/`

### Testing

While we're working on comprehensive test coverage, please:

* Manually test all features you modify
* Test on different screen sizes
* Test on different browsers (Chrome, Firefox, Safari)
* Verify no console errors or warnings
* Check for accessibility issues

### Pull Request Process

1. **Update documentation** if needed
2. **Update the README.md** with details of changes if applicable
3. **Ensure all checks pass**
4. **Request review** from maintainers
5. **Address review comments** promptly
6. **Squash commits** if requested

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran

## Screenshots (if applicable)
Add screenshots to demonstrate changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested on different screen sizes
```

## Project Structure

```
leadgenius/
├── src/
│   ├── components/       # Reusable components
│   │   ├── ui/          # Base UI components (shadcn/ui)
│   │   ├── ErrorBoundary.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ...
│   ├── pages/           # Page components
│   ├── lib/             # Utilities and helpers
│   ├── types/           # TypeScript types
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── ...config files
```

## Key Technologies

* **React 18** - UI library
* **TypeScript** - Type safety
* **Vite** - Build tool
* **Tailwind CSS** - Styling
* **Radix UI** - UI primitives
* **Framer Motion** - Animations
* **React Router** - Routing
* **React Hook Form** - Forms
* **Zod** - Validation

## Getting Help

* 📧 Email: dev@leadgenius.com
* 💬 Discord: [Join our dev channel](https://discord.gg/leadgenius-dev)
* 📖 Documentation: [docs.leadgenius.com](https://docs.leadgenius.com)

## Recognition

Contributors will be recognized in:
* README.md contributors section
* Release notes
* Project documentation

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

---

Thank you for contributing to Lead Genius! 🚀
