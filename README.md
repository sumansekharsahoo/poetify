# Poetify
## _Turn your thoughts into Poem_

## About
This is a full-stack web application that allows users to sign up, log in, and generate poems based on a prompt. The app also analyzes the emotions conveyed in the generated poems. The application saves the generated poems and associated emotions in the user's history, allowing them to revisit past prompts.

## Features
* **User Authentication**: Users can sign up and log in to access the app.
* **Poem Generation**: Users can input a prompt, and a poem will be generated using GPT 4o-mini model.
* **Emotion Analysis**: The app analyzes the emotions in the generated poem and returns the results as percentages.
* **History**: Users can view their previous prompts and generated poems in the history section.
* **Real-time Streaming**: Poem generation is streamed in real-time using Socket.IO.”

## Technologies Used
* **Backend**: Python/Flask
* **Frontend**: React (Vite)
* **Database**: SQLite
* **LLM**: GPT 4o-mini (OpenAI API)
* **Socket.IO**: For real-time data streaming
* **Axios**: For making HTTP requests
* **ORM**: SQLAlchemy
* **Session Management**: Flask sessions (file-based)
* **Chart Visualization**: Chart.js (radar chart)

## Directory Structure
``` bash
poetify/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py           # Flask app initialization and configuration
│   │   ├── models.py             # SQLAlchemy models (User, PromptHistory)
│   │   ├── utils/
│   │   │   └── openaiRequests.py # Helper functions for OpenAI API interactions
│   │   ├── routes/
│   │   │   ├── auth.py           # Authentication routes (signup, login)
│   │   │   ├── history.py        # Routes for fetching user history
│   │   │   └── generate.py       # Routes for generating poems and analyzing emotions
│   │   └── templates/            # (Unused if React frontend is separate)
│   ├── config.py                 # Configuration settings (including OpenAI API key)
│   ├── instance/
│   │   └── init_db.py            # Initialize sqlite db
│   ├── .env                      # Environment variables (not included in version control)
│   ├── requirements.txt          # Python dependencies
│   └── run.py                    # Entry point for running the Flask app
│
└── frontend/
    ├── public/
    │   └── index.html            # The main HTML file
    └── src/
        ├── assets/               
        │   └── logo.png
        ├── components/
        │   ├── ChartCell.jsx
        │   ├── Modal.jsx
        │   └── ProtectedRoute.jsx #To allow only authenticated users to access certain routes
        ├── pages/                # Page components
        │   ├── Home.jsx          # Homepage component
        │   ├── Login.jsx         # Login page component
        │   ├── Signup.jsx        # Signup page component
        │   └── Generate.jsx      # Poem generation page component
        └── utils/
            ├── api.js            # HTTP calls
            ├── auth.jsx          # LocalStorage functions
            └── timeConvertor.js  # Relative time
```
* backend: this directory contains the Flask server and API endpoints
* frontend: this directory contains the React components for User Interface and Utility files that contain functions to handle HTTP requests and response
## Project Setup

### Backend
* Navigate to the backend directory
* Install dependencies: ```pip install -r requirements.txt```
* Set up environment variables (OPENAI_API_KEY, SECRET_KEY, DATABASE_URL)
* Run the server: ```python3 run.py```
* Initialize DB: ```python3 init_db.py```

### Frontend
* Navigate to the frontend directory
* Install dependencies: ```npm i```
* Start development server: ```npm run dev```
