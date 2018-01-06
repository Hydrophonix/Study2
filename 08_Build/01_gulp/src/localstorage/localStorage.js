const ls = window.localStorage;

class Local {
  constructor(fieldName) {
    this.fieldName = fieldName;

    if (!ls[this.fieldName]) {
      ls[this.fieldName] = '[]';
    }
  }

  getField() {
    return JSON.parse(ls[this.fieldName]);
  }

  setField(fieldData) {
    ls[this.fieldName] = JSON.stringify(fieldData);
  }

}

export { Local };
