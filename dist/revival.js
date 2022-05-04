"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require = (function () { });
require("../typings/pixi");
_.functions = Object.create(null);
_.functions.escapeBattle = function () {
    var currentState = _.instance.game.state.current;
    if (currentState === "PVP")
        Object.fromEntries(_.instance.game.state.states).PVP.endPVP();
    else if (currentState === "CoOp")
        _.instance.prodigy.world.$(_.player.data.zone);
    else
        _.instance.game.state.callbackContext.runAwayCallback();
};
_.hackMainframe = function () {
    var _a, _b;
    var parent = (_a = document.querySelector("canvas")) === null || _a === void 0 ? void 0 : _a.parentElement;
    (_b = document.querySelector("canvas")) === null || _b === void 0 ? void 0 : _b.remove();
    var canvas = document.createElement("canvas");
    parent.prepend(canvas);
    var ctx = canvas.getContext("2d");
    var letters = "0123456789ABCDEF".split("");
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    var fontSize = 10;
    var columns = canvas.width / fontSize;
    var drops = [];
    for (var i = 0; i < columns; i++)
        drops[i] = 1;
    setInterval(function () {
        ctx.fillStyle = "rgba(0, 0, 0, .1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < drops.length; i++) {
            var text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillStyle = "#0f0";
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            drops[i]++;
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                drops[i] = 0;
            }
        }
    }, 33);
};
_.functions.customChat = function (text) {
    var dialogue = _.instance.prodigy.dialogue.create();
    dialogue.setText(10);
    var key = "noot";
    dialogue.eventQueue[0].dialogueData = dialogue.dataProvider.getLegacy(key, dialogue.eventQueue[0].legacyData.index);
    dialogue.eventQueue[0] = Object.assign({
        type: undefined,
        windowPosition: undefined,
        blockInput: !undefined,
    }, dialogue.eventQueue[0]);
    dialogue.eventQueue[0] = window._.pickBy(dialogue.eventQueue[0], function (x) { return x !== undefined; });
    dialogue.closeDialogue(false);
    dialogue.onClose = function () { };
    _.instance.prodigy.notifications.setPaused(true);
    var next = function () {
        var _a, _b;
        dialogue.current = dialogue.eventQueue.splice(0, dialogue.skipCounter + 1)[dialogue.skipCounter];
        dialogue.skipCounter = 0;
        if (Object.keys((_a = dialogue.current) !== null && _a !== void 0 ? _a : {}).length > 0) {
            var item = [dialogue.current.dialogueData.avatar.atlas];
            if ((_b = dialogue.currentDialogue) === null || _b === void 0 ? void 0 : _b.game) {
                dialogue.currentDialogue.updateSchema(dialogue.current, item);
            }
            else {
                dialogue.currentDialogue = _.instance.prodigy.open.characterDialogue(dialogue.current, next.bind(dialogue), item);
            }
        }
    };
    next();
};
Object.defineProperty(_, "gameData", { get: function () { return _.instance.game.state.states.get('Boot')._gameData; } });
Object.defineProperty(_, "localizer", {
    get: function () { return _.instance.prodigy.gameContainer.get("LocalizationService"); },
});
Object.defineProperty(_, "network", {
    get: function () { return _.player.game.input.onDown._bindings[0].context; },
});
Object.defineProperty(_, "hack", {
    get: function () { return _; },
});
//# sourceMappingURL=revival.js.map