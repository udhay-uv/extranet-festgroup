# Festgroup Extranet 

This project consists of a frontend and backend application that can be run locally using a simple startup script.

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/FESTGROUP-extranet/extranet_festgroup.git
cd extranet_festgroup
```

### 2. Run the Project

```bash
./start.sh
```

The `start.sh` script will:

- Navigate to the frontend directory, install dependencies, and start the frontend server.
- Navigate to the backend directory, install dependencies, and start the backend server.

## 📁 Project Structure

```
festgruop/
├── frontend/    # Frontend application
├── backend/     # Backend application
└── start.sh     # Startup script
```

## 🛠 Prerequisites

- **Node.js** and **npm** installed
- **Git** installed

## 🐞 Troubleshooting

- Make sure `start.sh` is executable. If not, run:

```bash
chmod +x start.sh
```

- If there are dependency issues, try manually running:

```bash
cd frontend && npm install
cd ../backend && npm install
```

## 💡 Additional Tips

- Stop running servers with `Ctrl + C`.
- Modify `package.json` scripts as needed for custom development needs.

## 🤝 Contributions

Feel free to open issues or submit pull requests!

