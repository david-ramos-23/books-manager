
# 🚀 Cardo Health Books Manager

## 📦 Getting Started


Rename **_.env.example_** to **_.env_**


## 🧑‍💻 Run Application locally

You will need to install the dependencies required for both apps (server & client) I use [pnpm](https://github.com/pnpm/pnpm) as a package manager but feel free to use npm or yarn or whatever you like the most. 

1. Install server dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```
2. Install cliente dependencies
```bash
npm install --prefix client
# or
yarn --cwd client install
# or
pnpm --filter client install 
```

3. Start server application
```bash
pnpm dev
```


4. Start server application
```bash
pnpm --filter client dev 
```

## 🛠️ Tests

I used Jest + Supertests in the server and Vitest + RTL in the client.

To execute the server tests you need to run:

```bash
npm test
# or
yarn test
# or
pnpm test
```

And the ones from the client app:

```bash
npm test
# or
yarn test
# or
pnpm test
```
    

## ⭐️ Features

- [Vite](https://vitejs.dev) with [React](https://reactjs.org), [TypeScript](https://www.typescriptlang.org) and [absolute imports](https://github.com/aleclarson/vite-tsconfig-paths).
- [Tailwind CSS v3](https://tailwindcss.com) with a [basic reset for form styles](https://github.com/tailwindlabs/tailwindcss-forms) and a [Prettier plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) that automatically sorts classes.
- Unit and integration tests with [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/).
- Use [ESLint](https://eslint.org), [stylelint](https://stylelint.io) and [Prettier](https://prettier.io) on VSCode and before you commit with [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged).
- Commitlint (Conventional Commits)
- Dockerized App 🎁

## 🤔 Improvements
- Persistance DB Layer
- Data Structures like HashMap
- e2e Tests
- Convert to Monorepo style

## ⚙️ Build Dockerized App 🎁

In order Build the image and fire up the container run the following commands at the root folder.

```bash
docker build . -t books-manager
docker run --rm -p 3000:3000 --name books-manager books-manager
```

## Requirements


- [X] Use TypeScript
- [X] Use a Node.js framework for the backend
- [X] Use React for the frontend
- [x] Add a simple sign-up option - Add a user’s JSON file where you will store the username
and password of the users who will use this application
- [x] Store the books in memory (no need to use a database in this exercise)
- [x] Validate user input to prevent duplicates from being added
- [X] Load a logo for your book brand using an environment variable
- [x] Write at least a few unit tests for the backend and frontend
- [X] Use a tool such as Prettier to format the code
- [X] Package the application as a Docker container
- [X] Deploy the application on AWS preferably (or GCP, Azure) and provide a link