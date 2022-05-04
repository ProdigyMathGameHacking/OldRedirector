"use strict";

try {


    const fetch = require("node-fetch");


    // TODO: GET THE PRODIGY VERSION AUTOMATICALLY
    const version = "6.50.0";





    (async () => {
        const status = await (await fetch("https://api.prodigygame.com/game-api/status")).json();


        const gameMinURL = `https://code.prodigygame.com/code/${version}/game.min.js?v=${version}`;

        const gameMin = await (await fetch(gameMinURL)).text();
        console.log("Game Min Version: " + version);
        console.log("GameMinLength: " + gameMin.length);
        console.log("GameMinURL: " + gameMinURL);
    })();


} catch (error) {


    console.error(error);
    console.error("Test failed.");

}