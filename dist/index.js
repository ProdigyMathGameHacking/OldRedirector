"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const typescript_1 = require("typescript");
const cors_1 = __importDefault(require("cors"));
const ms_1 = __importDefault(require("ms"));
const constants_1 = require("./constants");
const app = express_1.default();
const SupportPHEXVersion = "2.1.9";
let lastVersion = "None";
const startDate = Date.now();
setInterval(async () => {
    try {
        const status = await (await node_fetch_1.default("https://api.prodigygame.com/game-api/status")).json();
        console.log(status);
        const version = await (await node_fetch_1.default(constants_1.PNP_DOMAIN + "/gameVersion")).text();
        if (lastVersion === "None")
            return (lastVersion = version);
    }
    catch (e) { }
}, 10 * 60 * 1000);
app.use(cors_1.default());
app.get("/game.min.js", async (req, res) => {
    const version = await (await node_fetch_1.default(constants_1.PNP_DOMAIN + "/gameVersion")).text();
    const status = await (await node_fetch_1.default('https://api.prodigygame.com/game-api/status')).json();
    if (status.status !== "success" || !version)
        return res.sendStatus(503);
    const gameMinJS = await (await node_fetch_1.default(`https://code.prodigygame.com/code/${version}/game.min.js?v=${version}`)).text();
    res.type(".js");
    const replacements = [
        ["s),this._game=i}", `s),this._game=i};jQuery.temp22=_;let nahhh=setInterval(()=>{if (jQuery.temp22 !== _) {_ = jQuery.temp22; delete jQuery.temp22;clearInterval(nahhh)}});Object.defineProperty(_, "instance", { get: () => t.instance });`],
        ["t.constants=Object", "_.constants=t,t.constants=Object"],
        ["window,function(t){var i={};", "window,function(t){var i={};_.modules=i;"],
        ["this._player=t", "this._player=_.player=t"],
        ["i.prototype.hasMembership=", "i.prototype.hasMembership=_=>true,i.prototype.originalHasMembership="]
    ];
    return res.send(replacements.reduce((code, replacement) => code.split(replacement[0]).join(replacement[1]), `nootmeat = func => {
				let elephant = 2
			}
			exports = {};
			_.variables=Object.create(null);

			console.trace = _ => {};
	
			${gameMinJS}

			${typescript_1.transpile(fs_1.default.readFileSync(path_1.default.join(__dirname, "./revival.js"), { encoding: "utf8" }))}

			console.log("%cWill's Redirect Hack", "font-size:40px;color:#540052;font-weight:900;font-family:sans-serif;");
			console.log("%cVersion ${SupportPHEXVersion}", "font-size:20px;color:#000025;font-weight:700;font-family:sans-serif;");
			console.log('The variable "_" contains the hacked variables.');
			SW.Load.onGameLoad();
			setTimeout(() => {
				${await (await node_fetch_1.default("https://raw.githubusercontent.com/Prodigy-Hacking/ProdigyMathGameHacking/master/willsCheatMenu/loader.js")).text()}
			}, 15000);
		`));
});
app.get("/", (req, res) => res.redirect("/game.min.js"));
app.get("/public-game.min.js", async (req, res) => {
    if (!req.query.hash)
        return res.type("js").send("alert('OUTDATED REDIRECTOR CONFIG');");
    const publicGame = await (await node_fetch_1.default(`https://code.prodigygame.com/js/public-game-${req.query.hash}.min.js`)).text();
    res.type(".js");
    return res.send(`
		${publicGame.replace(/console\..+?\(.*?\)/g, "(()=>{})()")}

		// overwrite Array.some to patch Prodigy's anti-cheat.
		// The Anti-Anti-Cheat
		l=Array.prototype.some;
		setInterval(()=>{Array.prototype.some = function some(...args) {
			if (this[0] === "hack") this.splice(0, 100);
			return l.call(this, ...args);
		}});
		
		// Prodigy's new hack var anti-cheat overwrote setInterval, to patch this, we get a fresh new setInterval from an iFrame,
		// then patch their patch.
		let fffffff = document.createElement("iframe");
		document.head.append(fffffff);
		fffffff.contentWindow.setInterval(() => {
			let l = fffffff.contentWindow.setInterval;
			window.setInterval = function(func, ...args) {
				if (func.toString().includes('["hack"]')) return;
				return l.call(window, func, ...args);
			}
		});
	`);
});
app.get("/download", async (req, res) => {
    return res.redirect("https://github.com/ProdigyPNP/ProdigyMathGameHacking/raw/master/PHEx/build/extension.zip");
});
app.get("/version", async (req, res) => {
    return res.send(SupportPHEXVersion);
});
app.get("/status", async (req, res) => {
    return res.send(`Redirector has been online for [${ms_1.default(Date.now() - startDate)}]`);
});
const port = process.env.PORT ?? 1337;
app.listen(port, () => {
    return console.log(`The old machine hums along on port :${port}`);
});
//# sourceMappingURL=index.js.map