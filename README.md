## Demo

- Live demo: [Movie Hunters Web Application](https://movie-hunters-wolkus.vercel.app/signin)

# Movie Library Web Application

This project is a movie library web application with user authentication and the ability to search movies, create movie lists, and manage privacy settings for those lists.

## Features

1. **User Authentication**
   - Users can sign up and sign in to the application.
   - Authentication is handled securely using JWT tokens.

2. **Home Screen**
   - After logging in, users are directed to the home screen.
   - The home screen includes a search option uses the Debouncer concept to search for movies using the OMDB API.
   - Users can view detailed information about each movie.

3. **Movie Lists**
   - Users can create lists of movies, similar to YouTube playlists.
   - Different movie lists created by the user are displayed on the home screen.

4. **Privacy Settings**
   - Users can set privacy settings for their movie lists.
   - Lists can be either:
     - **Public**: Anyone with the link can see the list.
     - **Private**: Only the creator can see the list.

## Technologies Used

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Movie Data**: OMDB API

## Getting Started

To get a copy of this project up and running on your local machine for development and testing purposes, follow these steps:

### Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager) or yarn

### Installing

1. Clone the repository from GitHub:

   git clone https://github.com/RohanthBaipilla/Movie-Client-Wolkus.git
   cd client


2. Install the dependencies:

   npm install


### Running the Application

1. Start the development server:

   npm start


The application should now be running on `http://localhost:3000`.

## Usage

1. **Sign Up / Sign In**:
   - Create a new account or log in with your credentials.

2. **Home Screen**:
   - Search for movies using the search option.
   - View details of each movie.

3. **Movie Lists**:
   - Create new movie lists.
   - Manage your movie lists with options for privacy settings.

4. **Privacy Settings**:
   - Set your movie lists as public or private.

## Authors

Baipilla Swamy Eshwar Rohanth

## Acknowledgments

- This project was created as part of a web development learning experience.
- Inspired by the need to manage and categorize movie preferences effectively.

---
