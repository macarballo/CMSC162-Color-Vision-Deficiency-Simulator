# Project Setup and Execution Instructions

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js and npm installed on your machine. You can download and install them from [Node.js official website](https://nodejs.org/).
- Python installed on your machine. You can download and install it from [Python's official website](https://www.python.org/).

## Initial Setup

### Step 1: Set Execution Policy

Open the project terminal in your Integrated Development Environment (IDE) and run the following command to set the execution policy:

```sh
set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

This command sets the execution policy to RemoteSigned for the current user, allowing scripts to run.

### Step 2: Verify Execution Policy

Run this command to check the current execution policy:

```sh
Get-ExecutionPolicy
```

You should see "RemoteSigned" as the output. If you see this, the execution policy has been set correctly.

### Step 3: View Execution Policy List

Run the following command to view the list of execution policies:

```sh
Get-ExecutionPolicy -list
```

This will display the execution policies for different scopes such as UserPolicy, Process, CurrentUser, and LocalMachine.

## Installing Dependencies

Run the following command to install all necessary dependencies:

```sh
npm run init
```

This command will:
- Install npm packages.
- Create a Python virtual environment (venv-pyloid).
- Install Python dependencies listed in requirements.txt.

## Running the Development Server
To run the development server for both the frontend and backend, use the following command:

```sh
npm run dev
```

This command will:
- Run the React frontend development server using Vite.
- Run the Python backend server (src-pyloid/main.py).

## Building the Project for Production

To build the project for production deployment, use the following command:

```sh
npm run build
```

This command will:
- Compile TypeScript (tsc -b).
- Build the frontend using Vite.
- Package the Python backend into an executable using PyInstaller.

## Running the Development Server

Ensure you perform the build process on the respective operating systems for cross-platform builds.

## Custom Build Process

You can customize the build process to meet your specific requirements by:
- Modifying the scripts section in package.json.
- Updating PyInstaller spec files (e.g., build-windows.spec, build-linux.spec, build-macos.spec).
- Writing additional build scripts as needed.

## Environment Variables

Set environment variables appropriately depending on the production environment.
