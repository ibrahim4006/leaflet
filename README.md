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

### Backend

1. Clone the repository:

    ```sh
    git clone https://github.com/ibrahim4006/leaflet.git
    cd leaflet-samm/backend
    ```

2. Install backend dependencies:

    ```sh
    npm install
    ```

3. Start the backend server:

    ```sh
    npm start
    ```

    The backend server will be running on `http://localhost:5000`.

### Frontend

1. Navigate to the `frontend` directory:

    ```sh
    cd ../frontend
    ```

2. Install frontend dependencies:

    ```sh
    npm install
    ```

4. Start the frontend development server:

    ```sh
    npm start
    ```

    The frontend server will be running on `http://localhost:3000`.

## Usage


## Backend API

The backend provides the following API endpoints:

### Get All Points

- **URL:** `/api/points`
- **Method:** `GET`
- **Response:** Array of saved points.

### Add a Point

- **URL:** `/api/points`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "lat": <latitude>,
    "lng": <longitude>,
    "timestamp": <timestamp>
  }

### Delete a Point

- **URL:** `/points/:id`
- **Method:** `DELETE`



