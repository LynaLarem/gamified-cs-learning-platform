# Gamified Learning Platform for Computer Science Education

---

## Overview

**CSQuest** is a full-stack, web-based **gamified learning platform** designed to make Computer Science education interactive, engaging, and measurable. Rather than relying solely on passive course delivery, the platform combines structured multi-level CS curricula with game mechanics, a 3D interactive quiz game built in **Unity**, real-time student-instructor communication, and visual performance analytics.

---

## Key Features & User Roles

The system supports five distinct user roles alongside institutional authentication via the **Gmail API**:

* **Student:**
  * Enroll in Computer Science courses structured across difficulty stages (*Beginner*, *Intermediate*, *Advanced*), levels, lessons, and interactive game steps.
  * Practice concepts through a **3D graphical quiz game (Unity)** where solving 10-quest challenges unlocks doors and rewards **XP, coins, and score points**, while wrong answers deduct **hearts**.
  * Compete on global and per-course **leaderboards**, complete daily challenges, unlock achievements, and purchase in-game power-ups (e.g., *Extra Time*, *Time Freeze*, *Remove a Choice*, *Instant Hint*) in the **Store** using earned coins.
  * Participate in course **chatrooms** and submit course ratings/reviews.
* **Instructor:**
  * Supervise enrolled students in their taught courses through visual **performance statistics dashboards** and interact with learners via course chatrooms.
* **Content Specialist:**
  * Create, structure, and manage courses, difficulty levels, lessons, practice games, and individual quests.
* **Administrator:**
  * Manage platform users, store items, daily challenges, achievements, and global usage analytics.
* **Guest:**
  * Browse available courses, inspect course details, preview the store, and sign up using an institutional email account.

---

## System Architecture & Tech Stack

The application follows a decoupled **Client–Server RESTful architecture**:

* **Frontend (Web Application):** ReactJS, JavaScript (ES6+), HTML5, CSS3
* **Interactive Practice Game:** Unity Engine (Unity 2022.3 LTS)
* **Backend (RESTful API):** Java (JDK 17), Spring Boot (Controller, Service, and Model layers)
* **Database:** MySQL 8.0 (Relational schema with 14 normalized tables)
* **Authentication & External Services:** Gmail API (institutional email verification & OAuth sign-in)
* **Modeling & Engineering Tools:** UML 2.0 (Use Case, Sequence, Activity, Domain & Participant Class Diagrams via Visual Paradigm), Balsamiq Wireframes, Postman, Git/GitHub

---

## Software Engineering Lifecycle

The project was engineered following a complete software development lifecycle documented in the accompanying thesis manuscript:
1. **Requirements Analysis:** Stakeholder identification, functional/non-functional specifications, package-level UML Use Case modeling, System Sequence Diagrams, Activity Diagrams, and HMI wireframes.
2. **System Design:** Domain and robustness (Participant) class diagrams, detailed object Sequence Diagrams, 14-table relational database schema, and UI navigation flows.
3. **Implementation & Validation:** Full-stack React + Spring Boot + MySQL integration, Unity game module integration, and REST API verification.
