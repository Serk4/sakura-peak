# Sakura Peak 🌸

**Real-time cherry blossom peak-bloom predictor for Japan and Washington, DC**

A modern single-page React application that visualizes the famous north-to-south bloom wave in Japan and the single-city forecast for DC using live weather data.

### Live Demo (pseudo-Production)
https://sakura-peak-abcdefg.azurestaticapps.net (Azure Static Web Apps)

### Tech Stack (chosen for enterprise relevance)
- **Frontend**: React 19 + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Maps**: Leaflet (minimalist) + custom SVG overlays
- **Visualization**: Custom SVG/CSS "slide-rule" bloom indicator
- **Data**: Open-Meteo Weather API + Growing Degree Days (GDD) model
- **Deployment**: Vercel (fast dev previews) + Azure Static Web Apps (cloud-native showcase)
- **CI/CD**: GitHub Actions (coming soon — full pipeline)

### Features
- Toggle between Japan (nationwide bloom wave) and Washington, DC (single-city)
- Low-resolution minimalist map with major city markers (Japan) or single marker (DC)
- Animated **slide-rule bloom indicator**:
  - Center line = predicted peak bloom date
  - North line = start of blooming
  - South line = last good viewing day (hanami)
  - Bright horizontal bands show current bloom region moving north
- Responsive, beautiful, mobile-friendly SPA

### Why this project?
Built specifically to demonstrate modern full-stack practices, cloud deployment, clean architecture, and data-driven UI — skills directly applicable to enterprise modernization work at any organization.

See also: [DotNetCoreWebApi](https://github.com/Serk4/DotNetCoreWebApi) (my .NET 9 modernization prototype) and [React-Demo](https://github.com/Serk4/React-Demo) (enterprise CI/CD example).
