# Satira's Closet

A modern, interactive online bidding marketplace where visitors can shop, bid on unique items, and complete purchases securely via Stripe checkout.

## Features

- 🛍️ Immersive shopping experience with smooth animations between categories
- 🔨 eBay-style auction system with real-time bidding
- 💰 Fixed-price "Buy Now" options
- 💳 Secure Stripe checkout integration
- 👤 User accounts for tracking orders, bids, and purchase history
- 📱 Fully responsive design
- 🔍 SEO-optimized product pages
- 🕌 Subtle Islamic-inspired design elements
- 💝 Optional "Zakat Donation" feature

## Tech Stack

- **Frontend**: Next.js 14 (App Router) with React
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- Stripe account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/satiras-closet.git
   cd satiras-closet
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file based on the `.env.example` template.

4. Set up the database:
   ```
   npx prisma migrate dev
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/`: Next.js app router pages and API routes
- `components/`: Reusable React components
- `lib/`: Utility functions and shared libraries
- `prisma/`: Database schema and migrations
- `public/`: Static assets
- `types/`: TypeScript type definitions

## Deployment

This project is configured for easy deployment on Vercel. Simply connect your GitHub repository to Vercel and set the required environment variables.

## License

Copyright (c) 2023 Satira's Closet. All rights reserved. 