# Full Stack Developer Portfolio

A modern, responsive personal portfolio website built with React, Vite, and Supabase. This portfolio showcase my projects, technical skills, professional experience, and provides an elegant platform for visitors to explore my work and connect with me.

The site features a sleek, contemporary design with smooth animations, interactive elements, and a fully responsive layout that delivers an exceptional user experience across all devices.

## 🌟 Features

- **Blazing Fast Performance**: Built with Vite for lightning-fast development and optimized production builds
- **Fully Responsive Design**: Seamlessly adapts to all screen sizes, from mobile phones to large desktop displays
- **Dynamic Content Management**: All portfolio content (projects, skills, experience, certifications) is managed through Supabase backend
- **Smooth Animations**: Engaging transitions and micro-interactions enhance user experience
- **Modern UI/UX**: Clean, professional design with attention to typography, spacing, and visual hierarchy
- **SEO Optimized**: Complete with meta tags, sitemap, and semantic HTML for maximum search engine visibility
- **Dark/Light Mode**: Theme switching capability for user preference (optional)
- **Interactive Project Gallery**: Filterable and searchable project showcase with live demos and GitHub links
- **Contact Form**: Functional contact form with form validation and email integration
- **Performance Optimized**: Lazy loading, code splitting, and image optimization for fast load times

## 🚀 Tech Stack

- **Frontend Framework**: [React](https://react.dev/) v18
- **Build Tool**: [Vite](https://vitejs.dev/) v5
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v3
- **Routing**: [React Router](https://reactrouter.com/) v6
- **Backend & Database**: [Supabase](https://supabase.io/) (PostgreSQL)
- **Animations**: CSS Transitions, Framer Motion (optional)
- **Icons**: [Lucide React](https://lucide.dev/) or [React Icons](https://react-icons.github.io/react-icons/)
- **Form Handling**: React Hook Form (optional)
- **Deployment**: [Vercel](https://vercel.com/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** (v18.0.0 or later)
- **npm** (v9.0.0 or later) or **pnpm** or **yarn**
- **Git** for version control

## 🛠️ Installation

Follow these steps to get your development environment set up:

### 1. Clone the repository

```bash
git clone https://github.com/pyapril15/impraveenyadav.git
cd impraveenyadav
```

### 2. Install dependencies

Using npm:
```bash
npm install
```

Or using pnpm:
```bash
pnpm install
```

Or using yarn:
```bash
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory of your project and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**To get your Supabase credentials:**
1. Go to [Supabase](https://supabase.com/) and create a new project (or use existing)
2. Navigate to **Project Settings** > **API**
3. Copy the **Project URL** and **anon/public** key
4. Paste them into your `.env` file

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see your portfolio.

## 🎨 Customization

### Add New Projects

Insert new projects directly into your Supabase `projects` table or use the Supabase dashboard.

### Modify Theme Colors

Update `tailwind.config.js` to customize your color scheme:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        // ... add your custom colors
      },
    },
  },
};
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/) and import your repository
3. Add your environment variables in the Vercel dashboard
4. Deploy!

```bash
npm run build
```

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔧 Configuration

### Vite Configuration (`vite.config.js`)

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
})
```

## 🤝 Contributing

While this is a personal portfolio, suggestions and feedback are welcome! If you find any issues or have ideas for improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Contact

**Praveen Yadav**

- Website: [praveenyadavme.vercel.app](https://praveenyadavme.vercel.app)
- Email: praveen885127@gmail.com
- LinkedIn: [linkedin.com/in/pyapril15](https://linkedin.com/in/pyapril15)
- GitHub: [github.com/pyapril15](https://github.com/pyapril15)
- LeetCode: [leetcode.com/u/leetPraveenYadav](https://leetcode.com/u/leetPraveenYadav)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Icons from [Lucide Icons](https://lucide.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Hosting by [Vercel](https://vercel.com/)

---

⭐ **If you found this portfolio helpful, please consider giving it a star!**

Made with ❤️ by Praveen Yadav
