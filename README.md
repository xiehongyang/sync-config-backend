# Sync Config Backend

## Features

- **User Authentication**: Google OAuth2 authentication for users.
- **Work Management**: CRUD operations for managing work items.
- **Response Interception**: Custom response interceptor for modifying HTTP responses.
- **Database Integration**: MongoDB integration using Mongoose.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

### Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/xiehongyang/sync-config-backend.git
    cd sync-config-backend
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the necessary environment variables:
    ```env
    MONGODB_URI=mongodb://localhost:27017/sync-config
    JWT_SECRET=your_jwt_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

4. **Run the Application**:
    ```bash
    # development
    npm run start:dev

    # production
    npm run start:prod
    ```

### Usage

- **Access the API**: The backend server will be running at `http://localhost:3000`.
- **API Documentation**: Use tools like Postman to interact with the API endpoints.

### Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

### License

This project is licensed under the MIT License.

### Acknowledgements

- [NestJS](https://nestjs.com/) for the backend framework.
- [Mongoose](https://mongoosejs.com/) for MongoDB object modeling.
- [Passport](http://www.passportjs.org/) for authentication middleware.
