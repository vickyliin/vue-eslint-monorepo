# Vue eslint monorepo

Eslint with vue-cli behaves strangely in monorepo.

The repo was built by:

1. Create myapp

  ```
  vue create myapp
  ```

2. Create libs:

  ```
  mkdir mylib
  yarn add --dev eslint
  npx eslint --init
  ```

3. Add the linking dependencies into `pacakge.json`:

  ```json
  "dependencies": {
    "mylib": "link:../mylib",
    "mytslib": "link:../mytslib",
    "myvuelib": "link:../myvuelib"
  }
  ```


## Steps to reproduce

1. Install dependency

  ```
  cd myapp
  yarn install
  ```

  ```
  cd mylib
  yarn install
  ```

  ```
  cd mytslib
  yarn install
  ```

  ```
  cd myvuelib
  yarn install
  ```


2. Run dev server

  ```
  cd myapp
  yarn serve
  ```

  eslint errors inside `mylib` & `myvuelib` show up.


3. Interrupt the server and clear `eslint-loader` cache and run serve again:

  ```
  rm -rf node_modules/.cache/eslint-loader
  yarn serve
  ```

  no error shows.


4. Interrupt the server and clear `babel-loader` cache and run serve again:

  ```
  rm -rf node_modules/.cache/babel-loader
  yarn serve
  ```

  errors show again.


5. Interrupt the server, open `myapp/src/main.js` and uncomment the line:

  ```javascript
  // import 'mytslib'
  ```

  Start the server again, and then the following error shows:

  ```
  Module build failed (from ./node_modules/eslint-loader/index.js):
  Error: Failed to load plugin '@typescript-eslint' declared in '../mytslib/.eslintrc.json': Cannot find module '@typescript-eslint/eslint-plugin'
  Require stack:
  - /tmp/test-eslint-mono/myapp/__placeholder__.js
    ...

  @ ./src/main.js 8:0-17
  ```


6. Interrupt the server and run serve again, the same error still shows up.

7. Interrupt the server, install `@typescript-eslint/eslint-plugin` in `myapp`, clear cache and restart the server:

  ```
  yarn add --dev @typescript-eslint/eslint-plugin
  rm -rf node_modules/.cache
  yarn serve
  ```

  The module not found error disappeared as expected,
  the linting errors of `mylib` & `myvuelib` show up again, but the error of `mytslib` doesn't!
