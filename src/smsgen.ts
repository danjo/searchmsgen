import * as fs from "fs";
import * as js_yaml from "js-yaml";
import { Converter } from "./converter";

// console.log("start");

// console.log(process.argv);
if (process.argv.length !== 4) {
    console.log("usage: smsgen.exe <input filepath> <output filepath>");
    process.exit(0);
}
let fin = process.argv[2];
let fout = process.argv[3];
// console.log(fin);
// console.log(fout);

let ystr = fs.readFileSync(fin, "utf8");
let ydoc = js_yaml.load(ystr);

let conv = new Converter();
let sms = conv.generate(ydoc);
fs.writeFileSync(fout, sms);

// console.log("end");
