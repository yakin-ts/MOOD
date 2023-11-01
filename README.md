# Mood : AI-Powered Journaling Web App

Mood is an AI-driven journaling web app designed to help users track their sentiments and moods over time. It offers advanced sentiment analysis and question-based similarity searches, making journaling an insightful and engaging experience.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [Contact](#contact)

## Introduction

Mood is more than just a journaling platform; it's your personal mood tracker. It leverages AI and natural language processing to analyze your journal entries, providing insights into your changing emotions. Whether you're interested in tracking your daily moods or exploring the sentiment trends in your writing, Mood has you covered.

## Features

-  **Adding a Journal Entry:** Easily create new journal entries to capture your thoughts, feelings, and experiences.

- **Sentiment Analysis:** Mood employs AI and the OpenAI API to analyze the sentiment of your journal entries. Understand how your emotions evolve over time.

- **Sentiment History Chart:** Visualize your sentiment scores over a long period with an intuitive chart, giving you a comprehensive view of your emotional journey.

- **Question-Based Search:** Want to explore specific themes or thoughts across your entire journal? Ask a question, and Mood will perform a similarity search on the in-memory vector DB and  respond to your query.

- **Autosave and Sync:** Your entries are automatically saved and synchronized with the database as you write, ensuring that your journal content is always secure.



## Tech Stack

Mood is built on a robust tech stack:

- **Next.js 13 + Typescript:** A powerful framework for building web applications.

- **Prisma ORM + MySQL:** For database management and handling migrations.

- **OpenAI API:** Leveraging the capabilities of OpenAI to perform sentiment analysis.

- **TailwindCSS:** A utility-first CSS framework.
-  **Vitest:**  A Testing(unit) framework.

- **Clerk Auth :** User authentication using clerk auth web hooks.

- **Langchain for In-Memory Vector DB:** For lightning-fast similarity searches across the journal entries.

## Installation

To get Mood up and running, follow these steps:

1. Clone the repository: `git clone https://github.com/yakin-ts/mood.git`
2. Install dependencies: `npm install`
3. Set up your environment variables, including your OpenAI API key and MySQL database configuration.
4. Run migrations: `npx prisma migrate dev`
5. Start the development server: `npm run dev`

## Usage

1. Register or log in to your Mood account.
2. Start journaling by creating new entries.
3. The app will automatically analyze and track the sentiment of your entries.
4. Use the question-based search feature to explore your journal in new ways.
5. Access the sentiment history chart to visualize your emotional journey.





## Contributing

Contributions from the community to make Mood even better are welcome. To get started:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.

P.S: Mood is still a work in progress and I will be improving features.

## Contact

If you have any questions, suggestions, or issues, feel free to contact me at [LinkedIn](https://www.linkedin.com/in/yakin-teshome/)
