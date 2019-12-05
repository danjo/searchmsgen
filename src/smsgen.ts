import * as fs from "fs";
import * as path from "path";
import * as js_yaml from "js-yaml";
import { Converter } from "./converter";

// console.log("start");

// console.log(process.argv);
let fin: string;
let fout: string;

if (process.argv.length === 4) {
    fin = process.argv[2];
    fout = process.argv[3];
} else if (process.argv.length === 3) {
    fin = process.argv[2];
    let dir = path.dirname(fin);
    let bname = path.basename(fin, ".yaml");
    fout = `${dir}/${bname}.search-ms`;
} else {
    console.log("usage: smsgen.exe [input filepath] [output filepath]");
    console.log("       smsgen.exe [input filepath]");
    process.exit(0);
}
// console.log(fin);
// console.log(fout);

let ystr = fs.readFileSync(fin, "utf8");
let ydoc = js_yaml.load(ystr);

let conv = new Converter();
let sms = conv.generate(ydoc);
fs.writeFileSync(fout, sms);

// console.log("end");
