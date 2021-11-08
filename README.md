

# SeSudoku

This project was generated using [Nx](https://nx.dev).

![login screen](./apps/sudoku-frontend/src/assets/img/sudoku-rectangle-logo.jpg)

## Project Setup

 - Download and install Node.js [here](https://nodejs.org/en/)
 - Install Angular CLI with command `npm install -g @angular/cli`
 - Install NPM dependencies, run command in project root directory `npm install`

## Start Project
Start all services with

`npm run start-all`

Frontend will be running on [localhost:4200](http://localhost:4200/)

Backend will be running on [localhost:8080/api](http://localhost:8080/api)

## Useful Commands
### Project Scripts

####Start Angular dev server
`npm run start-frontend`

#### Start backend Nest server
`npm run start-backend`

#### Start Frontend and Backend services parallel
`npm run start-all`

#### Check Code quality
`npm run check-code-quality`

#### Frontend Unit tests
`npm run unit-text-frontend`

#### Backend Unit tests
`npm run unit-test-backend`

### Code Generation

#### Generate new Angular UI Component
`ng generate @schematics/angular:component --name=shared/components/{component-name} --project=sudoku-frontend --module=shared`

This creates a new shared Component in shared/components and exports it via `SharedModule`

Replace `{component-name}` with the name of the component

#### Generate new Angular Page Component with Lazy loaded Routing
`ng generate @schematics/angular:module --name=/pages/{pagename} --project=sudoku-frontend --module=app --route={routename} --routing`

This creates a new Module as well as a Component in the /pages directory and Modifies `app.routing.module` to set up a lazy loaded route.

Replace `{pagename}` with the name of the component and `{routename}` with the name of the route in the URL

#### Create Backend Nest Feature Module
`ng generate @nrwl/nest:module --name=/{module} --project=sudoku-backend --language=ts`

Creates a new Module at `{modulename}`

#### Create Backend Nest Controller
`ng generate @nrwl/nest:controller --name=/{feature} --project=sudoku-backend --language=ts`

Creates a new Controller at `{feature}`

### Tools
Code generation is powered by [Nx](https://nx.dev), the easiest way to use the code generation is via its IDE plugins for [VS Code](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) and [Webstorm](https://plugins.jetbrains.com/plugin/15000-nx-webstorm)

## Project Structure
### Overview
```
se-sudoku/
├─ apps/
│  ├─ sudoku-backend/
│  │  ├─ src/
│  │  │  ├─ app/
│  │  │  ├─ assets/
│  │  │  ├─ environment/
│  ├─ sudoku-frontend/
│  │  ├─ src/
│  │  │  ├─ app/
│  │  │  ├─ assets/
│  │  │  ├─ environment/
│  ├─ sudoku-frontend-e2e/
│  │  ├─ src/
│  │  │  ├─ fixtures/
│  │  │  ├─ integration/
│  │  │  ├─ support/
├─ libs/
│  ├─ models/
│  ├─ interfaces/
├─ node_modules/
├─ angular.json
├─ nx.json
├─ package.json
```

### Backend Structure
`apps/sudoku-backend/src/`
```
app/
├─ feature/
│  ├─ controller/
│  │  ├─ feature.controller.ts
│  │  ├─ feature.controller.spec.ts
│  ├─ models/
│  │  ├─ feature.dto.ts
│  │  ├─ feature.entity.ts
│  ├─ service/
│  │  ├─ feature.service.ts
│  │  ├─ feature.service.spec.ts
│  ├─ feature.module.ts
├─ app.controller.ts
├─ app.controller.spec.ts
├─ app.module.ts
├─ app.service.ts
├─ app.service.spec.ts
```
### Frontend Structure
`apps/sudoku-frontend/src/`
```
app/
├─ guards/
│  ├─ demo.guard.ts
│  ├─ demo.guard.spec.ts
├─ pages/
│  ├─ page/
│  │  ├─ page.component.html
│  │  ├─ page.component.scss
│  │  ├─ page.component.ts
│  │  ├─ page.component.spec.ts
│  │  ├─ page.state.service.ts
│  │  ├─ page.state.service.spec.ts
│  │  ├─ page.module.ts
│  │  ├─ page-routing.module.ts
├─ services/
│  ├─ demo.service.ts
│  ├─ demo.service.spec.ts
├─ shared/
│  ├─ components/
│  │  ├─ demo/
│  │  │  ├─ demo.component.html
│  │  │  ├─ demo.component.scss
│  │  │  ├─ demo.component.ts
│  │  │  ├─ demo.component.spec.ts
│  ├─ directives/
│  │  ├─ demo.directive.ts
│  │  ├─ demo.directive.spec.ts
│  ├─ pipes/
│  │  ├─ demo.pipe.ts
│  │  ├─ demo.pipe.spec.ts
│  ├─ shared.module.ts
├─ app.component.html
├─ app.component.scss
├─ app.component.ts
├─ app.component.spec.ts
├─ app.module.ts
├─ app-routing.module.ts
```
