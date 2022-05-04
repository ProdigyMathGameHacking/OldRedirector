"use strict";

try {

    const fetch = require("node-fetch");



    const pnpDomain = "https://p-np.prodigypnp.repl.co";
    const gameVersionURL = pnpDomain + "/gameVersion";







    (async () => {

        const version = await (await fetch(gameVersionURL)).text();


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