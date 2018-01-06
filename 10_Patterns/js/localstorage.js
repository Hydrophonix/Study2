const ls = window.localStorage;

class Local {
    constructor(fieldName) {
        this.fieldName = fieldName;

        if (!ls[this.fieldName]) {
            this.clearField(this.fieldName);
        }
    }

    getField() {
        return JSON.parse(ls[this.fieldName]);
    }

    setField(fieldData) {
        ls[this.fieldName] = JSON.stringify(fieldData);
    }

    clearField() {
        ls[this.fieldName] = '[]';
    };

    // add some item to array in ls
    append(item) {
        let fieldData = this.getField(this.fieldName);
        fieldData.push(item);

        ls[this.fieldName] = JSON.stringify(fieldData);
    }
}

export { Local };

