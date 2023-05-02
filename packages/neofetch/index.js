import { registerCommand } from "src/commands.js";
import { print, println, color } from "src/terminal.js";
let loadStartTime = Date.now()

registerCommand("neofetch", "Prints a cool ASCII art logo", () => {
    const logoLines = `                
────────────────
─██████████████─
─██░░░░░░░░░░██─
─██░░██████████─
─██░░██─────────
─██░░██████████─
─██░░░░░░░░░░██─
─██░░██████████─
─██░░██─────────
─██░░██████████─
─██░░░░░░░░░░██─
─██████████████─
────────────────
`.trim().split('\n').map(line => line.green);

    const sideLines = `
root@ethix
----------
OS: ETHIX
Host: ${navigator.userAgent}
Kernel: ETHIX
Uptime: ${Math.floor((Date.now() - loadStartTime) / 1000)} seconds
Shell: ETHIX
Resolution: ${window.innerWidth}x${window.innerHeight}
Terminal Font: JetBrains Mono
`.trim().split('\n').map(line => line.white);

    const maxLength = Math.max(...logoLines.map(line => line.length)) + 8;

    const paddedLogoLines = logoLines.map(line => line.padEnd(maxLength, ' '));

    let result = '';
    for (let i = 0; i < paddedLogoLines.length; i++) {
        result += paddedLogoLines[i] + (sideLines[i] || '') + '\n';
    }

    const colorLine = Object.keys(color).reduce((acc, colorName) => {
        return acc + "███"[colorName];
        // This here, is the ugliest fucking line of code I have written in all 
        // of my years of web development. Why, in gods name, does putting an 
        // array up to a string reference the string's property of the 
        // color name, rather than throwing an error?? Why doesn't it just try
        // to get the char? Not only that, but getting the keynames of 
        // an object, and then reducing, there's like fifteen higher-order
        /// functions in here. Why is this code written like this???
        // I'll never know. I will never understand this language,
        // this god-forsaken terrible programming language that I willingly
        // choose to suffer through writing. 
    }, '');

    const colorPadding = ' '.repeat(maxLength - 37);
    result += colorPadding + colorLine;

    return result;
});