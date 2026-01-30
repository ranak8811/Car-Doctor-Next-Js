# Car Doctor 🚗

**Car Doctor** is a full-stack car repair and maintenance service management application built with **Next.js**. It allows users to browse services, book appointments, and manage their bookings through a secure and user-friendly interface.

## 🌟 Key Features

*   **Authentication**: Secure user registration and login using **NextAuth.js**.
    *   **Social Login**: Support for Google and GitHub authentication.
    *   **Image Upload**: Users can upload profile pictures via ImgBB during registration.
*   **Service Browsing**: detailed service pages with facilities, descriptions, and pricing.
*   **Appointment Booking**:
    *   **Direct Booking**: Book specific services directly from their details page.
    *   **General Appointment**: dedicated appointment page to book any service.
*   **User Dashboard (My Bookings)**:
    *   View all bookings with status (Pending/Confirmed).
    *   **Update Status**: Confirm bookings directly from the dashboard.
    *   **Delete Bookings**: Cancel appointments with confirmation alerts.
*   **Advanced Service Discovery**:
    *   **Search & Filter**: Find services by name and sort by price or alphabetical order.
    *   **Related Services**: Discover similar services on details pages to explore more options.
*   **User Engagement**:
    *   **Service Reviews**: Authenticated users can rate and review services.
    *   **Profile Management**: Users can update their display name and profile picture.
*   **Admin Dashboard**:
    *   **Manage Services**: Add, edit, and delete services securely.
    *   **Booking Management**: View all user bookings and update their status (e.g., confirm pending bookings).
*   **Dynamic Metadata**: SEO-friendly dynamic page titles for Services and Checkout pages.
*   **Responsive Design**: Fully responsive UI built with **Tailwind CSS** and **DaisyUI**.
*   **Custom 404 Page**: professionally designed "Page Not Found" experience.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Language**: JavaScript
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/)
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
*   **Image Hosting**: [ImgBB](https://imgbb.com/)
*   **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm (v9 or higher)
*   MongoDB Atlas Account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ranak8811/Car-Doctor-Next-Js.git
    cd https://github.com/ranak8811/Car-Doctor-Next-Js.git
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add the following keys:

    ```env
    # Database
    NEXT_PUBLIC_MONGODB_URI=your_mongodb_connection_string
    DB_NAME=Car-Doctor-Next-Js

    # Authentication
    NEXTAUTH_SECRET=your_nextauth_secret_key
    NEXTAUTH_URL=http://localhost:3000

    # Social Providers
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GITHUB_ID=your_github_client_id
    GITHUB_SECRET=your_github_client_secret

    # Image Upload
    NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key

    # API Base URL
    NEXT_PUBLIC_SERVER_ADDRESS=http://localhost:3000
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Deployment

### Deploy to Vercel

1.  Push your code to a GitHub repository.
2.  Import the project into [Vercel](https://vercel.com/).
3.  **Critical**: Configure the environment variables in Vercel settings exactly as they are in your `.env.local`.
    *   *Note*: Ensure `NEXT_PUBLIC_SERVER_ADDRESS` matches your production Vercel domain (e.g., `https://car-doctor.vercel.app`).

## 📁 Project Structure

```
.
├── src/
│   ├── app/                 # App Router pages and API routes
│   │   ├── api/             # Backend API endpoints (booking, auth, services)
│   │   ├── appointment/     # Appointment page
│   │   ├── checkout/        # Checkout page
│   │   ├── login/           # Login page
│   │   ├── my-bookings/     # User dashboard
│   │   ├── register/        # Registration page
│   │   └── services/        # Service listing and details
│   ├── components/          # Reusable React components (Banner, NavBar, etc.)
│   └── lib/                 # Utility functions (dbConnect, AuthOptions)
├── public/                  # Static assets (images, icons)
└── ...
```

## 🔐 Security Note

This project uses `NEXT_PUBLIC_MONGODB_URI` for configuration ease as per specific user requirements. **For a strict production environment**, it is recommended to keep database credentials server-side only (i.e., `MONGODB_URI` without `NEXT_PUBLIC_`) and proxy requests through API routes to avoid exposing credentials.

---
*Built with ❤️ by [Your Name]*
