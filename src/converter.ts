import * as fs from "fs";
import * as js_yaml from "js-yaml";
import * as ejs from "ejs";
import { ConditionFactory } from "./cfactory";

export class Converter {
    static dir: string = "./src";

    ejsTf: ejs.TemplateFunction;
    ejsConf: any;
    cFactory: ConditionFactory;

    constructor() {
        let tmpl = fs.readFileSync(`${Converter.dir}/ejs_template.xml`, "utf8");
        this.ejsTf = ejs.compile(tmpl);

        let ystr = fs.readFileSync(`${Converter.dir}/ejs_defaults.yaml`, "utf8");
        let ydoc = js_yaml.load(ystr);
        this.ejsConf = ydoc;

        this.cFactory = new ConditionFactory(Converter.dir);
    }

    public generate(ydoc: any): string {
        let params = { ...this.ejsConf, ...ydoc };
        params = this.normalizeParams(params);

        let condConf = params["conditions"];
        let cond = this.cFactory.build(condConf);
        if (cond.isValidAll() === false) {
            console.log("!generate cond.isValid()");
        }
        // indent depth = 3
        params["generated_conditions"] = cond.generate(3);

        let searchmsRaw = this.ejsTf(params);
        let searchms = this.trim(searchmsRaw);
        return searchms;
    }

    public normalizeParams(params: any): any {
        // viewMode
        // iconSize
        // columns
        // sorts
        // kinds
        // scopes
        let scopes = params["scopes"];
        if (scopes != null) {
            for (let scope of scopes) {
                // path: replace slash to backslash
                let path = scope[1];
                scope[1] = path.replace(/\//g, "\\");

                // nonRecursive: add value when omitted
                if (scope.length === 2) {
                    scope.push("false");
                }
            }
        }
        return params;
    }

    public trim(searchms: string): string {
        // strip lines just white spaces
        let lines = searchms.split("\n");
        let ary: string[] = [];

        for (let line of lines) {
            if (line.match(/^\s*$/)) {
                continue;
            }
            ary.push(line);
        }

        return ary.join("\n");
    }
}
