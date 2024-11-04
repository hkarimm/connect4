"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_js_1 = __importDefault(require("./helpers/prompt.js"));
let name = (0, prompt_js_1.default)('Vad heter du? ');
console.log(`Hej ${name}!`);
