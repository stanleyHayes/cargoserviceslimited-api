# cargoserviceslimited-api

cargoserviceslimited api is an application containing JavaScript. The checked-in dependency manifests use Express, MongoDB via Mongoose. Source modules cover `admins`, `authentication`, `dashboard`, `messages`, `shipment-stage`, `shipments`, `shipping-packages`, `tracking`, `admin`, `message`.

## Repository layout

- `src/` — 33 tracked file(s); source examples: `src/config/keys.js`, `src/controllers/v1/admin/admins.js`.

## Local setup

Run each package setup block from the repository root. For workspace repositories, install dependencies at the root before running application-specific scripts.

Clone this repository and enter its directory:

```sh
git clone https://github.com/stanleyHayes/cargoserviceslimited-api.git
cd cargoserviceslimited-api
```

### Node package: `package.json`

Use Node.js and npm.

```sh
npm install
```

- `npm run dev` — runs the declared `dev` script (`nodemon src/index.js`).
- `npm run start` — runs the declared `start` script (`node src/index.js`).
- The package test script is a placeholder and exits with an error; it does not run an automated test suite.

## Configuration

The application declares `dotenv`. Review environment-variable references in the source and supply your own local values before starting it. Keep credentials out of Git; do not reuse committed credentials.

## Source entry points

- [src/config/keys.js](src/config/keys.js)
- [src/controllers/v1/admin/admins.js](src/controllers/v1/admin/admins.js)
- [src/controllers/v1/admin/authentication.js](src/controllers/v1/admin/authentication.js)
- [src/controllers/v1/admin/dashboard.js](src/controllers/v1/admin/dashboard.js)
- [src/controllers/v1/admin/messages.js](src/controllers/v1/admin/messages.js)
- [src/controllers/v1/admin/shipment-stage.js](src/controllers/v1/admin/shipment-stage.js)
- [src/controllers/v1/admin/shipments.js](src/controllers/v1/admin/shipments.js)
- [src/controllers/v1/admin/shipping-packages.js](src/controllers/v1/admin/shipping-packages.js)

## Development notes

Commands above come from the tracked manifests and source layout. External services and runtime configuration may be required. Documentation updates do not establish that the application is deployed or that its tests pass.
