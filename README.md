React Starter Kit
=================

## Overview
This is a starter kit modified from a mapbox project. The project itself is to
showing a delivering status in Mapbox.
I kept some of the project's code to demonstrate how everything works.

## Install

Install the dependencies:

```bash
cd react-starter-kit

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

## Code Walkthrough

### Directory Structure
This is a partial directory tree of the project.
```
.
├── LICENSE
├── README.md
├── cypress
├── cypress.json
├── jest.config.js
├── mocks
├── package-lock.json
├── package.json
├── setupTest.ts
├── src
│   ├── App.tsx
│   ├── assets
│   ├── components
│   │   ├── AppFooter
│   │   ├── GlobalStyle.ts
│   │   ├── MapBox
│   │   │   ├── MarkerIcon.tsx
│   │   │   ├── Popup.tsx
│   │   │   ├── __tests__
│   │   │   │   ├── MarkerIcon.spec.tsx
│   │   │   │   ├── Popup.spec.tsx
│   │   │   │   ├── __fixture__
│   │   │   │   ├── __snapshots__
│   │   │   │   └── index.spec.tsx
│   │   │   └── index.tsx
│   │   ├── OrderList
│   │   └── base
│   │       ├── A
│   │       ├── Badge
│   │       ├── Button
│   │       │   ├── Button.tsx
│   │       │   └── stories.tsx
│   │       ├── Card
│   │       ├── Footer
│   │       ├── Grid
│   │       ├── List
│   │       ├── SvgIcon
│   │       └── Typography
│   ├── constants
│   ├── containers
│   │   ├── MapBox
│   │   │   ├── __tests__
│   │   │   │   ├── __fixture__
│   │   │   │   ├── __snapshots__
│   │   │   │   ├── actions.spec.ts
│   │   │   │   ├── operations.spec.ts
│   │   │   │   ├── reducers.spec.ts
│   │   │   │   ├── selectors.spec.ts
│   │   │   │   └── util.spec.ts
│   │   │   ├── actions.ts
│   │   │   ├── constants.ts
│   │   │   ├── index.ts
│   │   │   ├── operations.ts
│   │   │   ├── reducers.ts
│   │   │   ├── selectors.ts
│   │   │   ├── styles.ts
│   │   │   ├── types.ts
│   │   │   └── utils.ts
│   │   └── OrderList
│   ├── data
│   ├── index.html
│   ├── index.tsx
│   ├── routes
│   ├── store
│   │   ├── actions.ts
│   │   ├── index.ts
│   │   └── reducers.ts
│   ├── theme.ts
│   ├── types
│   └── utils
├── tsconfig.json
├── tslint.json
├── webpack.base.config.js
├── webpack.dev.config.js
└── webpack.prod.config.js
```

### Component
#### Base Component
Base components are mostly design system related components. They are the building block of the app.
A typical base component should look like this:
```
src/components/base/Button
├── Button.tsx
└── stories.tsx
```

#### Other Components
There's no real definition what is base components or not. It's mostly based on if it might be reused very often or it's just built specifically for a feature.
You could also group a bunch of related components in one folder:
```
src/components/MapBox
├── MarkerIcon.tsx
├── Popup.tsx
├── __tests__
│   ├── MarkerIcon.spec.tsx
│   ├── Popup.spec.tsx
│   ├── __fixture__
│   │   └── mapbox.ts
│   ├── __snapshots__
│   │   ├── MarkerIcon.spec.tsx.snap
│   │   ├── Popup.spec.tsx.snap
│   │   └── index.spec.tsx.snap
│   └── index.spec.tsx
└── index.tsx
```

Most components should be stateless, it just reflect UI. There might be some very small local state for a component, but it shouldn't be a very complicated business logic. The real business logic will fall into container, we'll talk about it later.

Components were mostly tested by enzyme's `shallow` with snapshots.
But sometimes if the component has special lifecycle, we might need to use `mount` to render it.

The biggest challenge about using `mount` is with `styled-components@4`. See https://github.com/styled-components/jest-styled-components/issues/191 for more details.
There is a non perfect workaround:
```tsx
export function shallowWithTheme(tree: JSX.Element, options?: any) {
  return shallow(tree, {
    ...options,
    context: { theme },
  });
}

export function mountWithTheme(tree: JSX.Element, options?: any) {
  return mount(<ThemeProvider theme={theme}>{tree}</ThemeProvider>, options);
}
```
Please refer to `src/utils/test-helper.tsx` for more details.

### Container
Instead of having a `reducers` folder, `actions` folder which is not super scalable when the app getting bigger. Splitting the app based on feature make more sense in a lot of cases.

A container is responsible for a specific feature. All data related logic should go into that folder. 
```
src/containers/OrderList
├── __tests__
│   ├── __snapshots__
│   │   ├── actions.spec.ts.snap
│   │   ├── operations.spec.ts.snap
│   │   ├── reducers.spec.ts.snap
│   │   └── utils.spec.ts.snap
│   ├── actions.spec.ts
│   ├── operations.spec.ts
│   ├── reducers.spec.ts
│   └── utils.spec.ts
├── actions.ts
├── index.ts
├── operations.ts
├── reducers.ts
├── types.ts
└── utils.ts
```

Most of the time `index.ts` is a a HOC which hooks up with the component.

`actions.ts` should only contain pure function, for any complicated logic, it should go to `operations.ts`. In this app, we are using `redux-thunk` to handle async, complicated actions. Alternatively, using `redux-saga` or even `observable` could be an option. I picked `redux-thunk` for its simplicity and the time constraints of this project.

No matter which one to choose, the idea is similar, we do want to move some complicated logic into somewhere else. No matter it's an `operation` or an `epic` (for `RxJs`).

### Theme
Theme is very important for a good design system. I used `styled-components` + `styled-system` as this project's design system. And all the components in this app is powered by this theme.
So we could have a very consistent design.

The biggest advantage of having `styled-system` is, you don't need to write a single line of `css` in a lot of case. You also don't need to use `inline-style` which introduced a lot of performance problem. For example:
```tsx
<Card display="flex" padding={0} marginBottom={3}>
  {props.statuses.map((status, index) => (
    <Box key={index} flex="1 0 0" borderLeft={index && `1px solid ${theme.colors.grays[3]}`}>
      <Text padding={0} fontSize={3} fontWeight="bold" textAlign="center" marginBottom={1}>
        {status.name}
      </Text>
      <Text
        padding={0}
        fontSize={3}
        fontWeight="bold"
        textAlign="center"
        color={theme.colors.grays[8]}
        marginBottom={1}
      >
        {Math.round((1000 * status.count) / total) / 10}%
      </Text>
      <Text padding={0} fontSize={2} textAlign="center" color={theme.colors.grays[5]}>
        {status.count} orders
      </Text>
    </Box>
  ))}
</Card>
```

In `styled-system`, if it see something as a number, it will try to read the props and understand where to get the actual value, take 

```tsx
<Card marginBottom={3}>
  ...
</Card>
```
for example, styled system will lookup `3` in space, where the space is defined in `theme.ts`:
```typescript
export const space = [0, 4, 8, 16, 32, 64, 128, 256, 512];
```
So in this case, `marginBottom` is actually `16px`.

There's much more about `styled-components`, personally I think it speed up the development productivity a lot, and it has a great dev experience as well. There is an argument about the performance might not be as high as vanilla css, but I think it all comes down to which provides more value.

### Typescript + Typesafe-actions
Using typescript with react gave us tons of benefit, type checking and code intellisense. However, when using with redux, typescript does not really provide a great way for typing. You have to either use `any` or write very verbose code (duplicated code) to make the typing work correctly. Typesafe-actions filled in the blank. Basically it's a utility library to help us write much less code but keep the correct typing system.

For example:

*without typesafe-actions*
```typescript
export interface Message {
  user: string
  message: string
  timestamp: number
}
export interface ChatState {
  messages: Message[]
}

export const SEND_MESSAGE = 'SEND_MESSAGE'

interface SendMessageAction {
  type: typeof SEND_MESSAGE
  payload: Message
}

export function sendMessage(newMessage: Message): SendMessageAction {
  return {
    type: SEND_MESSAGE,
    payload: newMessage
  }
}
```
This is quite verbose.

*with typesafe-actions*
```typescript
export interface Message {
  user: string
  message: string
  timestamp: number
}
export interface ChatState {
  messages: Message[]
}
export const sendMessage = createStandardAction('@@SEND_MESSAGE')<Message>();

// you can retrieve action type by
getType(sendMessage)
```

### Data Structure
The most important data structures are specified in two files: `MapBox/types.ts`
and `OrderList/types.ts`.

```typescript
// @src/containers/MapBox/types.ts
export type MapboxState = {
  origin: {
    address: string;
    coordinates: [number, number];
  };
  viewport: ViewState;
  deliverSimulationStarted: boolean;

  /**
   * A collection of geo features to specify couriers' route
   * and location
   */
  deliverSimulationGeoFeatures: Feature[];
};

// @src/containers/OrderList/types.ts
export type PendingOrder = {
  id: string;
  name: string;
  destination: string;
  dispatchTime: number;
};

export type DeliveringOrder = Omit<PendingOrder, 'dispatchTime'> & {
  startTime: Date;
  speed: number;
  distance: number;
  route: any;
  coordinates: number[];
};

export type DeliveredOrder = DeliveringOrder & {
  endTime: Date;
};

/**
 * OrderList State
 *
 * Q: Why having three different arrays?
 * A: It might make sense to use one array to represent orders, and use a status
 * field to indicating if it's pending/delivering/delivered.
 * However there're drawbacks:
 * 1. when you just want to update one specific status' orders, you have to loop
 *    through the whole array. If the order has a lot, it could be a performance
 *    downside. (Even with reselect, we still have to loop through the array.)
 * 2. there're some data we don't know in the beginning, making the typing
 *    system have to use `?` or `null`. This is actually not very convenient in
 *    a lot of cases
 * So instead of using one array, we use three different arrays.
 */
export type OrderListState = {
  pending: PendingOrder[];

  delivering: DeliveringOrder[];

  delivered: DeliveredOrder[];
};
```
Both of them were stored in redux. So it's purely DDAU, and components just
rerender based on those data.

There's one exception: `mapStyle`. `mapStyle` is used to render the MapboxGL.
The reason we didn't put the whole `mapStyle` in redux is:

- It's too big
- The majority part of the data never change so we only update part of the mapStyle when needed.

The whole flow of data work like this:
- Fetch the geo info for the home facility, so we can set viewport for the map
- Load all orders from `orders.json`.
- Start simulating orders by reducing their dispatchTime.
- When any order's dispatchTime is reduced to 0, send an action to start delivering.
- Fetch delivering geo info including driving route
- Start delivering simulation
- Use an animation interval to simulate delivering route and courier location
- When any order is completed, send action to orderDelivered
- When there's no more pending orders, stop order simulation
- When there's no more pending and delivering orders, stop delviering simulation

## License
MIT © [Guangda Zhang](https://github.com/inkless)
