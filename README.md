# SkillSprint

Accelerate your growth. Master new skills, faster.

SkillSprint is a modern, AI-powered online learning platform designed to help you discover, enroll, and master new skills efficiently. With a clean, minimal interface and a focus on hands-on learning, SkillSprint empowers learners to achieve their goals at their own pace.

---

## 🚀 Features

- **Personalized Learning:** AI-generated course content tailored to your goals and pace.
- **Progress Tracking:** Mark chapters as completed and track your learning journey.
- **Modern UI:** Clean, responsive, and accessible design with dark mode support.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Next.js API Routes, Drizzle ORM
- **Database:** (Configured via Drizzle, see `/config/db.jsx`)
- **Authentication:** Clerk
- **UI Components:** Custom + Lucide React Icons

---

## 📦 Folder Structure

```
learning-app/
  online-learning-platform/
    app/                # Main Next.js app (pages, API routes, components)
    components/         # Shared UI components
    config/             # Database and schema config
    context/            # React context providers
    hooks/              # Custom React hooks
    lib/                # Utility functions
    public/             # Static assets (images, icons)
    README.md           # This file
    package.json        # Project dependencies
```

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd learning-app/online-learning-platform
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment
- Set up your database and Clerk authentication as needed.
- Update any environment variables in `.env` (if required).

### 4. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📚 Usage
- **Browse Courses:** Explore available courses on the landing page.
- **Sign Up / Sign In:** Create an account to enroll in courses.
- **Enroll & Learn:** Enroll in a course, track your progress, and complete hands-on projects.
- **Edit or Create Courses:** (If you are an admin/instructor)

---

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

> Made with ❤️ by the SkillSprint team
