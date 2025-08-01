﻿# Murf-3: AI-Powered Document Collaboration Platform

Welcome to **Docs.ai**, a full-stack project built for the Murf Coding Challenge. This platform demonstrates seamless integration with [MURF AI](https://murf.ai/) APIs, enabling advanced document editing, real-time collaboration, AI voice generation, translation, and offline-first capabilities.

---

## 🚀 Features

- **AI-Powered Document Editing**: Compose, edit, and enhance documents with AI suggestions and smart formatting.
- **Real-Time Collaboration**: Work together with your team, see live edits, and manage permissions.
- **Voice Generation & Cloning**: Convert text to speech, clone voices, and manage audio files using MURF AI.
- **Multi-language Translation**: Instantly translate documents to 100+ languages.
- **Offline Support**: Edit and save documents locally when offline; sync when reconnected.
- **Rich Templates**: Use and create professional templates for reports, proposals, and more.
- **Favorites & Analytics**: Star important documents, track usage, and view productivity stats.
- **Secure & Scalable**: Built with Node.js, Express, MongoDB, React, and Vite.

---

## 📁 Project Structure

```
Murf-3/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** (v14+)
- **MongoDB** (local or cloud)
- **MURF AI API Key** (get one from [MURF AI](https://murf.ai/))

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/murf-3.git
    cd murf-3
    ```

2. **Backend Setup:**
    ```bash
    cd backend
    npm install
    # Create a .env file and add your API keys and MongoDB URI
    cp .env.example .env
    ```

3. **Frontend Setup:**
    ```bash
    cd ../frontend
    npm install
    # Create a .env file if needed for frontend config
    cp .env.example .env
    ```

---

## 🚦 Usage

1. **Start Backend:**
    ```bash
    cd backend
    npm start
    # or for Python backend
    python main.py
    ```

2. **Start Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```

3. **Access the App:**
    - Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Configuration

- **API Keys:**  
  Add your `MURF_API_KEY` and other secrets to the respective `.env` files in `backend/` and `frontend/`.
- **MongoDB:**  
  Set your `MONGODB_URI` in `backend/.env`.

---

## 📚 API Reference

- **Backend API:**  
  - REST endpoints for documents, templates, collaboration, and AI features.
  - See [backend/routes/](backend/routes/) for details.
- **MURF AI API:**  
  - Refer to the [MURF AI API documentation](https://docs.murf.ai/) for endpoints and parameters.

---

## 🤝 Contributing

Contributions are welcome!  
- Open issues for bugs or feature requests.
- Submit pull requests for improvements.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [MURF AI](https://murf.ai/) for their powerful APIs.
- [React](https://react.dev/), [Vite](https://vitejs.dev/), [Node.js](https://nodejs.org/), [MongoDB](https://www.mongodb.com/), and all open-source contributors.

---

> _Crafted with ❤️ for the Murf Coding Challenge_3
