![Static Badge](https://img.shields.io/badge/angular-v19.2.0-red)
![Static Badge](https://img.shields.io/badge/npm-v19.2.15-red)
![Static Badge](https://img.shields.io/badge/npm-v11.4.2-green)
![Static Badge](https://img.shields.io/badge/node-v22.16.0-green)
![Static Badge](https://img.shields.io/badge/License-MIT-cyan)

# Weather Forecast

## Description

**Weather Forecast** is a responsive application built using **Angular**, **Axios** and **Open-Meteo**. It transforms user-inputted **city names** into coordinates for forecast data retrieval and fetches real-time weather data using the **[Open-Meteo API](https://open-meteo.com/)**.

**Note:** This project is intended to be a portfolio project, which demonstrates best practices in Front-end/Angular development and responsive design.


## Used Tech Stack

- **Angular**
- **Node**
- **TypeORM**
- **Axios**
- **Open-Meteo**

## Features

- 🔍 Search weather by city name
- 📍 Convert input city to latitude & longitude for API query
- 🌡️ View current weather condition
- 📆 See daily or hourly forecasts
- 🔄 Switch temperature display between Celsius and Fahrenheit
- ⚠️ Error handling for invalid inputs

## Project setup

### Environment Variables

This section will be finished soon.

### Install required packages

```bash
$ npm install
```

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

**Note:** Default port is _4200_. If you changed the port, use that port instead.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## API Integration
- Geocoding: Converts user-inputted city names into latitude & longitude.
  - https://geocoding-api.open-meteo.com/v1/search?name=CityName

- Weather Data: Fetches weather data for provided coordinates.
  - https://api.open-meteo.com/v1/forecast?latitude=...&longitude=...&hourly=temperature_2m,...

## License

This project is licensed under **MIT License** - See this **[License](https://github.com/Chantuu/Weather_Forecast/blob/main/LICENSE)** for more details.

## Credits

Thank you for showing your interest and checking out this project. Be sure to check out my other projects on [my Github account](https://github.com/Chantuu).
