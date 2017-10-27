# [ShiptHub](https://shipt-hub.herokuapp.com) &middot; [ ![Codeship Status for cvinson/shipt-hub](https://app.codeship.com/projects/a48b9860-973b-0135-56c4-2eb664dc4ffc/status?branch=master)](https://app.codeship.com/projects/251828) [![Coverage Status](https://coveralls.io/repos/github/cvinson/shipt-hub/badge.svg?branch=master)](https://coveralls.io/github/cvinson/shipt-hub?branch=master)


## Hosted Version
ShiptHub is deployed to Heroku and you can play with it without installing it locally [here](https://shipt-hub.herokuapp.com).

## Installation and Usage
ShiptHub uses `yarn` for dependency management and tasks. [Yarn Installation Guide](https://yarnpkg.com/en/docs/install)

Dependency installation is done using the `yarn install` command:
```bash
$ yarn install
```

Once installed, ShiptHub can be run locally using the 'yarn start' command:
```bash
$ yarn start
```

## Testing
ShiptHub has a full suite of unit tests. To run all tests:
```bash
$ yarn test
```

To generate a coverage report:
```bash
$ yarn coverage
```
Once generated, the coverage report can be found in `./coverage`, and can be viewed in the browser by opening `./coverage/lcov-report/index.html`.


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
