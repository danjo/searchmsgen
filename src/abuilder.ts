export class AttributeBuilder {
    public build(params: any): void {
        console.log("!build");
    }
}

export class SizeBuilder extends AttributeBuilder {
    static comps: string[] = [
        "gte", "lte"
    ];
    static units: { [key: string]: number } = {
        "": 1,
        "KB": 1000,
        "KiB": 1024,
        "MB": 1000 * 1000,
        "MiB": 1024 * 1024
    };
    static matcher: RegExp = /^([\d,.]+)(|KB|KiB|MB|MiB)$/;

    public build(params: any): void {
        this.buildOperator(params);
        this.buildValue(params);
    }

    public buildOperator(params: any): void {
        let comp = params["comparator"];
        if (SizeBuilder.comps.indexOf(comp) === -1) {
            console.log("!build comparator:" + comp);
        }
        params["operator"] = comp;
    }

    public buildValue(params: any): void {
        let size: string = params["size"];
        let calc: number;

        let m = size.match(SizeBuilder.matcher);
        if (m != null) {
            let num = Number(m[1]);
            let by = SizeBuilder.units[m[2]];
            calc = num * by;
        } else {
            console.log("!build size" + size);
        }

        params["value"] = calc.toString();
    }
}

export class DateRecentBuilder extends AttributeBuilder {
    public build(params: any): void {
        let dul = params["days"];
        if(dul == null){
            console.log("!days");
        }
        let num = Number(dul);
        let value = `R00UUUUUUUUZZXD-${num}NU`;
        params["value"] = value;
    }
}

export class DateBetweenBuilder extends AttributeBuilder {
    public build(params: any): void {
        let start = params["start"];
        let end = params["end"];

        let sy = start.getFullYear();
        let sm = start.getMonth() + 1;
        let sd = start.getDate();
        let ey = end.getFullYear();
        let em = end.getMonth() + 1;
        let ed = end.getDate();

        // like "N00K2018K3K12UUUUUZZNNU; N00K2018K3K30UUUUUZZNNU"
        // zero suppress
        let value = `N00K${sy}K${sm}K${sd}UUUUUZZNNU; N00K${ey}K${em}K${ed}UUUUUZZNNU`;
        params["value"] = value;
    }
}
