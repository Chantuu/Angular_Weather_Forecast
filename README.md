# ☀️ Weather Forecast App

![Static Badge](https://img.shields.io/badge/angular-v19.2.0-red)
![Static Badge](https://img.shields.io/badge/npm-v19.2.15-red)
![Static Badge](https://img.shields.io/badge/npm-v11.4.2-green)
![Static Badge](https://img.shields.io/badge/node-v22.16.0-green)
![Static Badge](https://img.shields.io/badge/License-MIT-cyan)

## 📋 Table of Contents
- [Overview](#overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Setup](#environment-setup)
  - [Installation](#installation)
  - [Development Server](#development-server)
- [🧰 Development Tools](#-development-tools)
- [🔌 API Integration](#-api-integration)
- [🤝 Credits](#-credits)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

## Overview

**Weather Forecast** is a responsive web application built using Angular and Open-Meteo API, allowing to get accurate weather forecasts for desired city.

This project was built to showcase skills in Angular project development, designing responsive websites and effectively integrating external API services.

## ✨ Features

- 🔍 **Intuitive Search** - Find weather by city name
- 📍 **Precise Geolocation** - Automatic conversion of city names to coordinates
- 🌡️ **Current Conditions** - View real-time weather data at a glance
- 📆 **Forecast Options** - View both daily and hourly forecasts
- 🔄 **Temperature Units** - Switch between Celsius and Fahrenheit
- 📱 **Responsive Design** - Optimized for all devices from mobile to desktop

## 🛠️ Tech Stack

- **Angular** - Frontend framework providing robust component architecture
- **Axios** - Promise-based HTTP client for API requests
- **Open-Meteo** - Free weather API with no API key required

## 🚀 Getting Started

### Prerequisites

- Node.js (v22.16.0 or later)
- npm (v11.4.2 or later)

### Environment Setup

Create a `.env` file in the root directory with the following variable:

```
NG_APP_OPEN_METEO_API_KEY="&apikey={Your_API_Key}"
```
_Note: You must enter your Open-Meteo API key in place of the brackets._

### Installation

```bash
# Install required project dependencies
npm install
```

### Development Server

```bash
# Start the development server
ng serve
```

Navigate to `http://localhost:4200/` to see and use the application. The app will automatically reload on any source file changes.

## 🧰 Development Tools

### Code Generation

Angular CLI provides powerful tools to speed up development:

```bash
# Generate a new component
ng generate component component-name

# Generate a service
ng generate service service-name

# See all available generation options
ng generate --help
```

### Building for Production

```bash
# Create optimized production build
ng build
```

The build artifacts will be stored in the `dist/` directory, ready for deployment.

## 🔌 API Integration

This application uses two Api services from Open-Meteo:

- **Geocoding API**: Converts city names to coordinates
  ```
  https://geocoding-api.open-meteo.com/v1/search?name=CityName
  ```

- **Weather Forecast API**: Retrieves detailed weather data for desired location
  ```
  https://api.open-meteo.com/v1/forecast?latitude=...&longitude=...&hourly=temperature_2m,...
  ```

## 🤝 Credits

This project makes use of the following open-source tools and resources:

- **[Angular](https://angular.io/)** – Frontend framework powering the application.
- **[Open-Meteo API](https://open-meteo.com/)** – Free weather and geocoding APIs providing forecast data.
- **[Axios](https://axios-http.com/)** – Promise-based HTTP client for API requests.
- **[Google Fonts](https://fonts.google.com/)** – Typography used for improved UI/UX.
- **[Shields.io](https://shields.io/)** – Badges used in the README for versioning and project status.
- **[Weather Icons By Erikflowers](https://erikflowers.github.io/weather-icons/)** - Open-source weather icons. 

Special thanks to the open-source community for providing the tools that made this project possible.


## 📄 License

This project is licensed under the **MIT License** - See the [LICENSE](https://github.com/Chantuu/Weather_Forecast/blob/main/LICENSE) file for details.

## 👨‍💻 Author

Thank you for exploring this project! Check out my other work on [GitHub](https://github.com/Chantuu).
