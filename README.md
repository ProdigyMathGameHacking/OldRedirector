# Redirector Hack


The outdated gamefile patcher (aka "hack server") for Prodigy Math Game.

We've made a better and actually working patcher for Prodigy Math Game: https://github.com/ProdigyPNP/P-NP

------

## Reasoning

The Redirector hack was made by [Will](https://github.com/MelnCat).

In an effort to make hacking easier, and harder to patch, Will made the redirector hack.
To put it simply, it modifies the game files to make it easier to hack. A little bit of voodoo cheat menus are included, and it's done!
There are some occasional patches/fixes that require you to re-import the redirector json, but it's much better than the old `{Boot}` and `{sprintf}` methods.

## Locally hosting Redirector (Advanced)

If for some reason redirector is down, instead of relying on our hosting for modified game files, you can host it locally!

1. Install Node.js, Git is optional.

2. Install the needed packages and dependencies.

    ```bash
    npm run setup
    ```

3. Run the start script.

    ```bash
    npm start
    ```

4. Profit! Redirector should now be pulling files from `localhost:1337`.
