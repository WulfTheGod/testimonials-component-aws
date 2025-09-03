# Next.js Testimonials Example

This is a complete Next.js 14 application demonstrating the testimonials component.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:4000](http://localhost:4000) or see the [live demo](http://testimonials-aws-demo.wulfthegod.com/)

## 📦 Build for Production

```bash
# Build the application
npm run build

# The static files will be in the 'out' directory
```

## 🔧 Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

## 📁 Project Structure

```
app/
├── layout.tsx       # Root layout with global styles
├── page.tsx         # Main page with testimonials
└── globals.css      # Global CSS with Tailwind

public/              # Static assets
out/                 # Build output (after npm run build)
```

## 🎨 Features Demonstrated

- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🔄 Auto-rotating testimonials
- 🎯 Progress indicators
- 🖱️ Interactive hover effects

## 🚀 Deploy to AWS S3

From the project root, run:

```bash
./scripts/deploy.sh
```

This will build and deploy the application to your configured S3 bucket.