# Rainpools Accumulation App

## Preparations

1. Make sure you have Node.JS installed: https://nodejs.org/en/download/
1. Clone the git repository
1. Run `npm install` inside the repo directory
1. Run `npm start` to run the server

You should see the following message in the console:

`Rainpools app listening on port 8080!`

**Browse to http://localhost:8080 in Chrome**

## Solution highlights:

* All frontend code is under 'app' folder
* The code is bundled using Webpack. (currently in dev mode)
* I have implemented it using React
* There are 2 React components: Rainpools and RainpoolsVis
* The algorithm for calculating total rain accumulation is in Rainpools.jsx -> calcRainAccumulation().

* click on 'Simulate Rain' to calculate.
