"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
var typescript_1 = require("typescript");
var cors_1 = tslib_1.__importDefault(require("cors"));
var ms_1 = tslib_1.__importDefault(require("ms"));
var app = express_1.default();
var SupportPHEXVersion = "2.1.9";
var lastVersion = "None";
var startDate = Date.now();
setInterval(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var status, version, e_1;
    var _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4, node_fetch_1.default("https://api.prodigygame.com/game-api/status")];
            case 1: return [4, (_b.sent()).json()];
            case 2:
                status = _b.sent();
                console.log(status);
                version = (_a = status === null || status === void 0 ? void 0 : status.data) === null || _a === void 0 ? void 0 : _a.gameClientVersion;
                if (lastVersion === "None")
                    return [2, (lastVersion = version)];
                return [3, 4];
            case 3:
                e_1 = _b.sent();
                return [3, 4];
            case 4: return [2];
        }
    });
}); }, 10 * 60 * 1000);
app.use(cors_1.default());
app.get("/game.min.js", function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var version, _a, _b, status, gameMinJS, replacements, _c, _d, _e, _f, _g, _h;
    return tslib_1.__generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _b = (_a = JSON).parse;
                return [4, node_fetch_1.default('https://play.prodigygame.com/play')];
            case 1: return [4, (_j.sent()).text()];
            case 2:
                version = _b.apply(_a, [(_j.sent())
                        .match(/(?<=gameStatusDataStr = ').+(?=')/)[0]]);
                return [4, node_fetch_1.default('https://api.prodigygame.com/game-api/status')];
            case 3: return [4, (_j.sent()).json()];
            case 4:
                status = _j.sent();
                if (status.status !== "success" || !version)
                    return [2, res.sendStatus(503)];
                return [4, node_fetch_1.default("https://code.prodigygame.com/code/" + version + "/game.min.js?v=" + version)];
            case 5: return [4, (_j.sent()).text()];
            case 6:
                gameMinJS = _j.sent();
                res.type(".js");
                replacements = [
                    ["s),this._game=i}", "s),this._game=i};jQuery.temp22=_;let nahhh=setInterval(()=>{if (jQuery.temp22 !== _) {_ = jQuery.temp22; delete jQuery.temp22;clearInterval(nahhh)}});Object.defineProperty(_, \"instance\", { get: () => t.instance });"],
                    ["t.constants=Object", "_.constants=t,t.constants=Object"],
                    ["window,function(t){var i={};", "window,function(t){var i={};_.modules=i;"],
                    ["this._player=t", "this._player=_.player=t"],
                    ["i.prototype.hasMembership=", "i.prototype.hasMembership=_=>true,i.prototype.originalHasMembership="]
                ];
                _d = (_c = res).send;
                _f = (_e = replacements).reduce;
                _g = [function (code, replacement) { return code.split(replacement[0]).join(replacement[1]); }];
                _h = "nootmeat = func => {\n\t\t\t\tlet elephant = 2\n\t\t\t}\n\t\t\texports = {};\n\t\t\t_.variables=Object.create(null);\n\n\t\t\tconsole.trace = _ => {};\n\t\n\t\t\t" + gameMinJS + "\n\n\t\t\t" + typescript_1.transpile(fs_1.default.readFileSync(path_1.default.join(__dirname, "./revival.ts"), { encoding: "utf8" })) + "\n\n\t\t\tconsole.log(\"%cWill's Redirect Hack\", \"font-size:40px;color:#540052;font-weight:900;font-family:sans-serif;\");\n\t\t\tconsole.log(\"%cVersion " + SupportPHEXVersion + "\", \"font-size:20px;color:#000025;font-weight:700;font-family:sans-serif;\");\n\t\t\tconsole.log('The variable \"_\" contains the hacked variables.');\n\t\t\tSW.Load.onGameLoad();\n\t\t\tsetTimeout(() => {\n\t\t\t\t";
                return [4, node_fetch_1.default("https://raw.githubusercontent.com/Prodigy-Hacking/ProdigyMathGameHacking/master/willsCheatMenu/loader.js")];
            case 7: return [4, (_j.sent()).text()];
            case 8: return [2, _d.apply(_c, [_f.apply(_e, _g.concat([_h + (_j.sent()) + "\n\t\t\t}, 15000);\n\t\t"]))])];
        }
    });
}); });
app.get("/", function (req, res) { return res.redirect("/game.min.js"); });
app.get("/public-game.min.js", function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var publicGame;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.query.hash)
                    return [2, res.send("alert('OUTDATED REDIRECTOR CONFIG')")];
                return [4, node_fetch_1.default("https://code.prodigygame.com/js/public-game-" + req.query.hash + ".min.js")];
            case 1: return [4, (_a.sent()).text()];
            case 2:
                publicGame = _a.sent();
                res.type(".js");
                return [2, res.send("\n\t\t" + publicGame.replace(/console\..+?\(.*?\)/g, "(()=>{})()") + "\n\n\t\t// overwrite Array.some to patch Prodigy's anti-cheat.\n\t\t// The Anti-Anti-Cheat\n\t\tl=Array.prototype.some;\n\t\tsetInterval(()=>{Array.prototype.some = function some(...args) {\n\t\t\tif (this[0] === \"hack\") this.splice(0, 100);\n\t\t\treturn l.call(this, ...args);\n\t\t}});\n\t\t\n\t\t// Prodigy's new hack var anti-cheat overwrote setInterval, to patch this, we get a fresh new setInterval from an iFrame,\n\t\t// then patch their patch.\n\t\tlet fffffff = document.createElement(\"iframe\");\n\t\tdocument.head.append(fffffff);\n\t\tfffffff.contentWindow.setInterval(() => {\n\t\t\tlet l = fffffff.contentWindow.setInterval;\n\t\t\twindow.setInterval = function(func, ...args) {\n\t\t\t\tif (func.toString().includes('[\"hack\"]')) return;\n\t\t\t\treturn l.call(window, func, ...args);\n\t\t\t}\n\t\t});\n\t")];
        }
    });
}); });
app.get("/download", function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        return [2, res.redirect("https://github.com/ProdigyPNP/ProdigyMathGameHacking/raw/master/PHEx/build/extension.zip")];
    });
}); });
app.get("/version", function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        return [2, res.send(SupportPHEXVersion)];
    });
}); });
app.get("/status", function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        return [2, res.send("Redirector has been online for [" + ms_1.default(Date.now() - startDate) + "]")];
    });
}); });
var port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 1337;
app.listen(port, function () {
    return console.log("The old machine hums along on port :" + port);
});
//# sourceMappingURL=index.js.map