# .NET Developer Portfolio Website

This is the source code for my personal portfolio website, designed to showcase my skills, experience, and projects as a .NET Developer. It's a fully responsive, modern single-page application built with HTML, CSS, and vanilla JavaScript.

**Live Demo:** https://cynthiamotaung.vercel.app/
---

## Features

- **Modern & Responsive Design**: Looks great on all devices, from mobile phones to desktops.
- **Interactive UI**: Features include a custom cursor, magnetic buttons, scroll animations, and a project tilt effect.
- **Dark/Light Mode**: A theme toggle allows users to switch between dark and light modes, with their preference saved in local storage.
- **.NET Focused Content**: Sections are tailored to highlight skills and projects relevant to a .NET Developer, including ASP.NET Core, Azure, C#, and more.
- **CLI Animation**: A "Currently Learning" section with a fun, command-line interface animation.
- **Command Palette**: A `Ctrl/Cmd + K` command palette for quick navigation and actions.
- **Contact Form**: A functional contact form (integrated with Netlify Forms by default).
- **SEO Optimized**: Includes Open Graph and Twitter Card meta tags for better social sharing.

---

## Tech Stack

- **HTML5**: For the core structure and content.
- **CSS3**: For all styling, animations, and responsive design.
- **Vanilla JavaScript**: For all interactivity, animations, and DOM manipulation. No frameworks were used to keep it lightweight.
- **Particles.js**: Used for the animated background in the hero section.
- **Vanilla-Tilt.js**: Used for the 3D tilt effect on the project cards.
- **Netlify**: For hosting and handling form submissions.

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You only need a modern web browser and a code editor (like VS Code).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Cynthia-Motaung/portfolio.git](https://github.com/Cynthia-Motaung/portfolio.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd portfolio
    ```
3.  **Open `index.html` in your browser:**
    You can do this by simply double-clicking the file or by using a live server extension in your code editor (like Live Server for VS Code) for a better development experience with hot-reloading.

---

## Customization Guide

To make this portfolio your own, you'll need to update the content in `index.html` and replace the assets.

1.  **Update Text Content (`index.html`):**
    - **Titles & Meta Tags**: In the `<head>`, change the `<title>` and `content` of the `meta` tags (description, Open Graph, Twitter) to reflect your name and details.
    - **Header & Footer**: Update navigation and social media links.
    - **Home Section**: Change the main heading and introduction paragraph.
    - **About Section**: Write your own bio.
    - **Resume Section**: Fill in your own work experience and education details.
    - **Skills Section**: List the technologies you are proficient in.
    - **Projects Section**: This is the most important part. For each project:
        - Update the title, description, and technical breakdown.
        - Change the links to point to your **live demos** and **GitHub repositories**.
    - **Currently Learning Section (`script.js`):**
        - In the `script.js` file, find the `learningItems` array and update it with the technologies you are currently studying.

2.  **Replace Assets:**
    - **Profile Picture**: Replace `Media.jpg` with your own professional headshot.
    - **Resume PDF**: Replace `Resume.pdf` with your own resume file.
    - **Project Images**: Replace the placeholder project images in the `project-grid` with screenshots of your own work.
    - **Favicon**: Replace `assets/logo.png` with your own favicon.

3.  **Contact Form:**
    - The form is set up to work with Netlify Forms out of the box. If you deploy to Netlify, it should work automatically.
    - If you use a different hosting provider, you will need to change the form's `action` attribute and potentially update the JavaScript submission logic in `script.js`.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

Cynthia Motaung - [@LinkedIn](https://www.linkedin.com/in/cynthia-motaung/)

Project Link: https://github.com/Cynthia-Motaung/cynthiamotaung/
