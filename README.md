## About

This project was created with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).

## Available Scripts

### `npm run dev`

Run the server in development mode. The server is available on http://localhost:9999/

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

### `npm start -- --env="name of env file" (default is production).`

Run production build with a different env file.

## Running locally

Endpoint 1: http://localhost:999/
This gets the result for test 1 (divisible number)

Endpoint 2: http://localhost:999/api/generateSubstringResults
This generates the result for test 2 (finding index positions of substrings) and posts it to the reckon end point

## TODOS

- Test cases
- Formatting the api response in the front end
- Validating and sanitizing the data coming from the external apis before processing

## Assumptions

- The data coming in from the api is always sanitized and are numbers.
- The external apis are retried for 5 times if there's an error before finally erroring out
