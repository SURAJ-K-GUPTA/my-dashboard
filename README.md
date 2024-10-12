# Interactive Dashboard with Next.js, Recharts, and Supabase

This project is a full-stack interactive dashboard application built with **Next.js**, **Recharts**, and **Supabase**. It features user authentication, data visualization, real-time updates, and a responsive design.

## Features

- **User Authentication**: Login and signup using Supabase Auth.
- **Dashboard**: View metrics and data visualizations via line, bar, and pie charts.
- **Real-Time Updates**: Widgets update with real-time data using Supabase channels.
- **Responsive Design**: Mobile-friendly layout with a collapsible sidebar.
- **Dark Mode**: Toggle between light and dark themes.
- **Data Export**: Download chart data as CSV files.

## Project Setup

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) or npm
- [Supabase Account](https://supabase.io/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/SURAJ-K-GUPTA/my-dashboard
   cd your-repo-name
Install dependencies:

bash
yarn install
# or
npm install
Set up environment variables:

Create a .env.local file in the root of the project and add your Supabase keys:

bash

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
Run the development server:

bash

yarn dev
# or
npm run dev
The app will be available at http://localhost:3000.

API Documentation
1. Create a new metric
Endpoint: /api/metrics
Method: POST
Description: Create a new metric.
Request Body:

json

{
  "name": "string", // Name of the metric (e.g., Sales, Revenue)
  "value": "number", // Numeric value of the metric
  "category": "string" // Category (optional, e.g., Revenue, Users)
}
Response:

201 Created: Metric successfully created.
400 Bad Request: Invalid input data.
2. Fetch all metrics
Endpoint: /api/metrics
Method: GET
Description: Fetch all the metrics stored in the database.
Response:

200 OK: Returns an array of metrics.
Example:

json

[
  {
    "id": 1,
    "name": "Sales",
    "value": 100,
    "category": "Revenue",
    "created_at": "2024-10-01T10:00:00Z"
  }
]
3. Update a metric
Endpoint: /api/metrics/[id]
Method: PUT
Description: Update a specific metric by its ID.
Request Body:

json

{
  "name": "Sales", // Updated name
  "value": 150 // Updated value
}
Response:

200 OK: Metric successfully updated.
404 Not Found: Metric not found.
4. Delete a metric
Endpoint: /api/metrics/[id]
Method: DELETE
Description: Delete a metric by its ID.
Response:

200 OK: Metric successfully deleted.
404 Not Found: Metric not found.
Deployment
This project is deployed on Vercel. You can access it here.

Technologies Used
Next.js: React framework for building server-side rendering and static web applications.
Supabase: Backend as a service (BaaS) for authentication, database, and real-time updates.
Recharts: Library for creating charts and data visualizations.
Tailwind CSS: Utility-first CSS framework for building responsive layouts.