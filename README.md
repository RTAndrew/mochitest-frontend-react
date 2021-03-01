# Search for Github users and organizations

## Resume
This project is part of the Mochi Labs Frontend Aptitude Test, where I was tasked with a test sprint consisting of four days. The main goal was to utilize the Github Rest API to search for both users and organizations and display their contributions (for users) and its member (for organizations).

**Key takeaways**
This was my first time ever using Typescript and doing tests (even though I am in the process of gradually converting a React codebase to Typescript). Loved the type-checking, even though I have found it a bit verbose. But I loved the security... so, long are the days of guessing which props go into the components

`The more your tests resemble the way your software is used, the more confidence they can give you.` - [Kent C. Dodds](https://testing-library.com/docs/)

## How to run
- `git clone` - First clone this repo
- cd into the project and run `npm install`

Because of the [Github rate limit](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting), it is advisable to use your Github OAuth token and set it in the `.env`

**Example**
`REACT_APP_TOKEN=your_oauth_token_goes_here`

## Tech Stack

- [x] ReactJS (CRA) + Typescript + [Ant Design](ant.design/)
- [x] Git Workflow - Fast-Forward-Merge methodology
- [x] Jest + React Testing Library - For testing
- [x] SASS - [Airbnb 7in1](https://github.com/airbnb/css)
- [x] [Git Commit Message Convention](https://github.com/RTAndrew/git-commit-message-convention)
- [x] ESlint + Prettier
- [x] Netlify
- [x] Security - Load secrets through `.env`

## Aptitude Testing Criterias

- [x] Use ES6 syntax including arrow functions, destructuring, and async/await
  I have a slight preference to use functions inside Functional Components
- [x] Typescript
- [x] Adding a spinner when information is loading
- [x] Deal with errors coming from the backend
- [x] Having a nice UI using a components library ([Ant Design](ant.design/))
- [x] Divide the application into different pages and use a router
- [x] Deploy the project somewhere ([Link to the project](https://mochitest-frontend-react.netlify.app))
- [x] Sanitization and Validations (ValidatorJS)
- [x] Responsiveness


