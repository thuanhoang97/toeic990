# Toeic 990

Toeic 990 is simple web that use for check answer when doing toeic test and save it to track your progression of preparing for toeic test.
**This project is intent to run only on localhost.**

## Set up
All commands are running from root project and you need mongo server is running.

First, you need to build client files:
```sh
    cd client && yarn build
```
Once client is built, you just need to go to server directory to run server:
```sh
    cd server && yarn start
```
Because this project have no admin feature, you need to add answers of test manually by create test file in folder **server/scripts/tests**. File format is txt, name of the file is also name of the test and each line of file will be the answer. Then run command to add test to database:
```sh
    cd server && yarn run load-tests
```

## Usage
When choose test to do, you can select the mode for the test:
- Test: Doing entire toeic test. Timer is countdown.
- Practice: Doing some parts of toeic test. Timer is stopwatch.
