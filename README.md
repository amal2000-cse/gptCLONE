# GPT Clone (Backend)

This section describes the backend functionality of the GPT Clone application.

## Technologies Used

- **Node.js**: Backend server environment.
- **Express.js**: Web framework for Node.js.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: Library for loading environment variables from a .env file.

## Installation

No installation steps are required as this project is hosted on GitHub.

## Backend Functionality

### Routes

- **POST /completions**: Sends messages to the OpenAI GPT-3.5 Turbo API for chat-based completions.

### OpenAI API Integration

- Integrates the OpenAI GPT-3.5 Turbo API into the application.
- Allows users to send messages for chat-based completions.
- Sends requests to the OpenAI API with proper authorization and JSON formatted data.

## Usage

1. Clone the repository:

    ```bash
    git clone https://github.com/amal2000-cse/gptCLONE
    ```

2. Navigate to the project directory:

    ```bash
    cd gptCLONE
    ```

3. Start the backend server:

    ```bash
    npm start
    ```

4. The server will run on the specified port, and you can access the API endpoint to interact with the GPT-3.5 Turbo API.

Feel free to explore the backend functionality and contribute to its development!
