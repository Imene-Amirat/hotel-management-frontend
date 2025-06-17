
# Hotel Booking Frontend

This is the frontend of a hotel booking system built with **Angular**. The application allows users to search for available rooms based on selected criteria like check-in/check-out dates, room type, and price range.

## 🖥️ Technologies Used

- Angular 17+
- TypeScript
- HTML5
- SCSS
- Angular Material (optional UI components)
- Responsive layout (Flexbox/Grid)

## ✨ Features

- Home page with a dynamic room search form
- Form validations (dates, room type, price)
- Live slider price updates
- Navigation to room details with selected search data
- Room listing with filter results (via query params)
- Responsive design

## 📸 Screenshots

| Home Search Form | Filtered Rooms |
|------------------|----------------|
| ![Home](./assets/screenshots/home.png) | ![Rooms](./assets/screenshots/rooms.png) |

## 📂 Project Structure
src/
├── app/
│ ├── features/
│ │ ├── home/
│ │ └── rooms/
│ ├── core/
│ │ └── services/
│ └── shared/
│   └── models/
│   └── pipes/
├── assets/
│ └── images/
└── styles/

### Prerequisites

- Node.js v20.18.3
- Angular CLI v17
- java v17

### Setup

```bash
git clone https://github.com/Imene-Amirat/hotel-management-frontend.git
cd hotel-management-frontend
npm install
ng serve
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.



