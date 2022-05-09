# Sing Me A Song

Sing me a song is an web application for song recommendation. Make, receive and rate music recommendations. The application has the following features:

- Recommendations ranking
- Create recommendations
- Recommendations timeline
- Random recommendation

## Technologies

The following tools were used in the construction of full-stack project "Sing me a song":

<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/-ReactJs-323330?style=for-the-badge&logo=react&logoColor=white'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/TypeScript-323330?style=for-the-badge&logo=typescript&logoColor=white'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white'>
	<img style='margin: 5px;' src='https://img.shields.io/badge/Cypress-323330?style=for-the-badge&logo=Cypress&logoColor=white'>
	<img style='margin: 5px;' src='https://img.shields.io/badge/node.js-323330?style=for-the-badge&logo=node.js&logoColor=white'>
	<img style='margin: 5px;' src='https://img.shields.io/badge/postgres-323330?style=for-the-badge&logo=postgresql&logoColor=white'>
	<img style='margin: 5px;' src='https://img.shields.io/badge/Prisma-323330?style=for-the-badge&logo=Prisma&logoColor=white'>
</p>

## How to run

### Front-End

1. Clone this repository
2. Install dependencies

```bash
npm i
```

3. Run the project

```bash
npm run start
```

4. Run tests

```bash
npx cypress open
```

### Back-End

1. Clone this repository
2. Install dependencies

```bash
npm i
```

3. Create database

```bash
npx prisma init
npx prisma migrate dev
```

4. Run the project

```bash
npx ts-node src/server.ts
```

5. Run tests

```bash
npm run test
```
