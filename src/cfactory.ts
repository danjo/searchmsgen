import * as fs from "fs";
import * as js_yaml from "js-yaml";
import {
    Condition, AndCondition, OrCondition, NotCondition, LeafCondition,
} from "./condition";
import {
    AttributeBuilder, DateRecentBuilder, DateBetweenBuilder, SizeBuilder,
} from "./abuilder";

export class ConditionFactory {
    static condClass: { [key: string]: typeof Condition } = {
        AndCondition,
        OrCondition,
        NotCondition,
        LeafCondition,
    };
    static abuilderClass: { [key: string]: typeof AttributeBuilder } = {
        DateRecentBuilder,
        DateBetweenBuilder,
        SizeBuilder,
    };

    opConf: any;

    constructor(dir: string) {
        let ystr = fs.readFileSync(`${dir}/cfactory_config.yaml`, "utf8");
        let ydoc = js_yaml.load(ystr);
        this.opConf = ydoc;
    }

    build(conds: any): Condition {
        if (conds == null) {
            console.log("!build");
        }

        let root: Condition;
        let rvalue: any;
        this.scanValue(null, [conds], (p, c, cv) => {
            // expexts callback called just 1 time
            if (root != null) {
                console.log("!build");
            }
            root = c;
            rvalue = cv;
        });
        this.scanRecursive(root, rvalue);

        return root;
    }

    // f(null, [value], (p, c, cv) => { ...; }); g(c, cv);
    // g(parent, value, (p, c, cv) => { ...; g(c, cv) });
    scanValue(parent: Condition, value: any,
              callback: (p: Condition, c: Condition, cv: any) => void): void {

        // if value is not array, may have other stuff, skip
        if (!(value instanceof Array)) {
            return;
        }

        for (let elem of value) {
            let etype: string;
            let evalue: any;
            if (typeof elem === "string") {
                etype = elem;
                evalue = null;
            } else {
                etype = Object.keys(elem)[0];
                evalue = elem[etype];
            }

            let op = this.opConf[etype];
            if (op == null) {
                console.log("!scanValue etype:" + etype);
            }

            let abuilder: AttributeBuilder;

            let cls = ConditionFactory.condClass[op["condition"]];
            if (cls == null) {
                console.log("!scanValue cls is null:" + etype);
            }
            if (cls === LeafCondition && op["builder"] != null) {
                let cls2 = ConditionFactory.abuilderClass[op["builder"]];
                if (cls2 == null) {
                    console.log("!scanValue cls2 is null:" + etype);
                }
                abuilder = new cls2();
            }

            let child = new cls(op, evalue, abuilder);

            callback(parent, child, evalue);
        }
    }

    scanRecursive(parent: Condition, value: any): void {
        this.scanValue(parent, value, (p, c, cv) => {
            // expexts callback called 0 to some times
            p.addChild(c);
            this.scanRecursive(c, cv);
        });
    }
}
