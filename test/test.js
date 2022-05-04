try {


    const fetch = require("node-fetch");








    let lastGameStatus = null;

    const getGameStatus = async () => {
    	if (lastGameStatus) return lastGameStatus;
    	try {
    		const json = (await (await fetch("https://math.prodigygame.com/play?launcher=true")).text()).match(
    			/(?<=gameStatusDataStr = ').+(?=')/
    		);
    		if (!json?.length) return null;
    		return JSON.parse(json[0]);
    	} catch (e) {
    		console.warn(`An error occurred while obtaining the game status.\n${e}`);
    		return null;
    	}
    };

    const gs = getGameStatus();

	const version = gs.gameClientVersion;










    (async () => {
        const status = await (await fetch("https://api.prodigygame.com/game-api/status")).json();


        const gameMinURL = `https://code.prodigygame.com/code/${version}/game.min.js?v=${version}`;

        const gameMin = await (await fetch(gameMinURL)).text();
        console.log("Game Min Version: " + version);
        console.log("GameMinLength: " + gameMin.length);
        console.log("GameMinURL: " + gameMinURL);
    })();


} catch (e) {
    console.error(e);
}