// ==UserScript==
// @name         Dragon Cave - Auto Groups Links
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Turns groups "links" in trading "Wants" into real clickable hyperlinks.
// @author       Valen
// @match        https://dragcave.net/trading*
// @icon         https://icons.duckduckgo.com/ip2/dragcave.net.ico
// @grant        none
// @updateURL    https://raw.githubusercontent.com/BleatBytes/DragCave-group-tradelink/refs/heads/main/Dragon Cave - Auto Groups Links-1.0.user.js
// @downloadURL    https://raw.githubusercontent.com/BleatBytes/DragCave-group-tradelink/refs/heads/main/Dragon Cave - Auto Groups Links-1.0.user.js
// ==/UserScript==

function waitDOMContent(func) {
    if (document.readyState !== 'loading') {
        func;
    } else {
        document.addEventListener('DOMContentLoaded', func);
    };
};

async function toHref() {
    const texts = await Array.from(document.getElementsByClassName("_78_6"));
    for (let i = 0; i < texts.length; i++) {
        const $this = texts[i];
        const $text = $this.textContent;
        const regex = /(|group)\/\d{3,}/gi;
        let match;
        let repl;

        if (regex.test($text) == false) {
            continue
        } else {
            match = $text.match(regex).filter((x) => x.match(/\//));
            for (const matches of match) {
                if (/(group)/.test(matches)) {
                    $this.innerHTML = $this.innerHTML.replace(matches, `<a href="${matches}" target="_blank">${matches}</a>`);
                } else {
                    repl = "group"+matches;
                    $this.innerHTML = $this.innerHTML.replace(matches, `<a href="${repl}" target="_blank">${matches}</a>`);
                }
            }

        };
    };
};

waitDOMContent(toHref());
