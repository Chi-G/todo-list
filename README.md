# TODO List Web Application

This is a simple TODO list web application built using Node.js, Express, EJS, and PostgreSQL.

## Features

- Add new items to the TODO list
- Edit existing items
- Delete items from the list
- Persistent storage using PostgreSQL

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Chi-G/todo-list.git

2. Navigate to the project directory:
   ```sh
   cd forahia-todo-list

3. cd forahia-todo-list
   ```sh
   npm install

## Database Setup

1. Make sure you have PostgreSQL installed and running.
2. Create a new database named permalist
    ```sh
    createdb permalist

3. Run the SQL script to create the items table and insert initial data
   ```sh
    psql -d permalist -f queries.sql