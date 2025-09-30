# 📚 Shelf of Shame – Frontend

Welcome to the **Shelf of Shame** frontend — a React + TypeScript application that helps readers tackle their growing pile of unread books 📖 (a phenomenon known as _tsundoku_ in Japanese 🇯🇵).  
The goal is simple: **encourage you to read the books you already own** instead of just buying more!

---

## 🚀 Overview

This frontend is part of the **Shelf of Shame** project and provides the user interface for:

- 👤 **User authentication** (JWT-based, handled by the backend)
- 📚 **Shelf management** – add new books, update status, difficulty, and notes
- 📊 **Shelf statistics** – get insights into your reading habits
- 🧠 **Recommendations** – suggestions tailored to your shelf and preferences
- 💡 **Motivational quotes** – to help you stay on track
- 📘 **Automatic book covers** – fetched from the OpenLibrary API based on title/author

---

## ⚙️ Tech Stack

- ⚛️ **React 19** – UI library
- 🌀 **TypeScript** – type safety and better DX
- 🎯 **Redux Toolkit** – global state management
- 🔁 **RTK Query** – API queries & mutations for authenticated user shelf data
- 🎨 **Ant Design** – elegant, ready-to-use UI components
- 📦 **Vite** – lightning-fast development and build tool

---

## 📦 Prerequisites

Before you begin, make sure you have the following installed:

- 🟢 **Node.js ≥ 18** – required by Vite 6 and React 19
- 📦 **npm ≥ 8** – for package management
- ☕ **Shelf of Shame backend** running locally at `http://localhost:8080`

---

## 🛠️ Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/YamiHeike/Shelf-of-Shame-frontend.git
cd Shelf-of-Shame-frontend
npm install
```
