# Leaflet Map Web Application

This project is a web application that uses Leaflet.js to display a map. The application allows users to save the GPS coordinates of the map's center point along with the current date and time to a JSON file. The saved points are displayed in a list on the right side of the page. Users can click on a list item to place a marker on the map at the corresponding coordinates, delete points from the list, and download the JSON file of saved points.

## Features

- Display a map using Leaflet.js
- Save the center point's GPS coordinates with a timestamp
- Display saved points in a list
- Click on list items to place a marker on the map
- Delete points from the list
- Persist saved points across page reloads
- Download the JSON file of saved points

## Prerequisites

- Node.js and npm installed

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/bum-bum-pav/leaflet-samm.git
    cd leaflet-samm
    ```

2. Install dependencies for the project:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and set up the necessary environment variables:

    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

## Usage

1. Start the frontend development server:

    ```sh
    cd frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

    ├── leaflet-samm/
    │ ├── node_modules/
    │ ├── public/
    │ │ └── index.html
    │ ├── src/
    │ │ ├── components/
    │ │ │ └── Map.js
    │ │ ├── App.js
    │ │ ├── index.js
    │ │ └── ...
    │ ├── package.json
    │ └── ...
    │
    ├── README.md
    └── .gitignore
