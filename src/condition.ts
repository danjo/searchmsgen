import { AttributeBuilder } from "./abuilder";

export class Condition {
    static tab: string = "	";
    static break: string = "\r\n";

    type: string;
    children: Condition[] = [];

    constructor();
    constructor(arg1: any, arg2: any, arg3: any);
    constructor(arg1?: any, arg2?: any, arg3?: any) { }

    public addChild(child: Condition): void {
        this.children.push(child);
    }

    public isValidAll(): boolean {
        if (this.isValidMe() === false) {
            return false;
        }
        for (let child of this.children) {
            if (child.isValidAll() === false) {
                return false;
            }
        }
        return true;
    }

    public isValidMe(): boolean {
        // type is set
        return (this.type != null);
    }

    public generate(ntab: number): string {
        let indent = Condition.tab.repeat(ntab);
        let ary = [];

        ary.push(this.head(indent));
        for (let child of this.children) {
            let cstr = child.generate(ntab + 1);
            ary.push(cstr);
        }
        ary.push(this.tail(indent));

        let str = ary.join(Condition.break);
        return str;
    }

    public head(indent: string): string {
        return `${indent}<condition type="${this.type}">${Condition.break}`;
    }
    public tail(indent: string): string {
        return `${indent}</condition>${Condition.break}`;
    }
}

export class AndCondition extends Condition {
    type: string = "andCondition";

    public isValidMe(): boolean {
        // super() && has at least 1 child
        return (super.isValidMe() &&
            this.children.length >= 1);
    }
}

export class OrCondition extends Condition {
    type: string = "orCondition";

    public isValidMe(): boolean {
        // super() && has at least 1 child
        return (super.isValidMe() &&
            this.children.length >= 1);
    }
}
export class NotCondition extends Condition {
    type: string = "notCondition";

    public isValidMe(): boolean {
        // super() && has just 1 child
        return (super.isValidMe() &&
            this.children.length === 1);
    }
}

export class LeafCondition extends Condition {
    type: string = "leafCondition";
    params: {};
    attribs: string[];

    constructor(arg1?: any, arg2?: any, arg3?: any) {
        super();

        let confs: {} = arg1;
        let args: {} = arg2;
        let abuilder: AttributeBuilder = arg3;

        this.params = { ...confs["defaults"], ...args };
        if (abuilder != null) {
            abuilder.build(this.params);
        }
        this.attribs = confs["attribs"];
    }

    public head(indent: string): string {
        let ary = [];
        ary.push(indent + `<condition type="leafCondition"`);

        for (let key of this.attribs) {
            let val = this.params[key];
            ary.push(indent + Condition.tab + `${key}="${val}"`);
        }
        let last = ary.pop();
        ary.push(last + `>`);
        ary.push(indent + Condition.tab + `<attributes />`);
        return ary.join(Condition.break);
    }

    public isValidMe(): boolean {
        // super()
        if (super.isValidMe() === false) {
            return false;
        }
        // has no children
        if (this.children.length !== 0) {
            return false;
        }
        // all attributes are set
        for (let attr of this.attribs) {
            let val = this.params[attr];
            if (val == null) {
                console.log("!isValidSelf");
                return false;
            }
        }

        return true;
    }
}
