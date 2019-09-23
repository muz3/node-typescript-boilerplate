# README

## Install

Install the dependencies:

```bash
git clone this repo

# copy .env which contains Mapbox API token.
# .env is not commited to git, this .env-sample is for dev usage only
cp .env-sample .env
npm install
```

## Development

Run webpack dev server with hot reload

```bash
npm start
```

Run storybook, stories added for all the base components

```bash
npm run storybook
```

Run linting

```bash
npm run lint
```

## Test

Test is using jest + enzyme, configurable in `jest.config.js`

```bash
npm test

# run test with coverage
npm test -- --coverage

# run test with watch
npm run test:watch

# run test with debug
npm run test:debug

# run e2e test, this will trigger a production build before the test
npm run test:e2e

# run cypress directly
npm run cypress:run
# or open
npm run cypress:open
```

## Build for production

```bash
npm run build
```

Once production build is ready, a convenient script is added so you could check the production built app directly

```bash
npm run http-server
```

## Husky and Prettier

This project comes with both Husky and Prettier setup to ensure a consistent code style. 

Code style is configurable in `.prettierrc`
