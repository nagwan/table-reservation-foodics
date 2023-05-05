class Errors {
  constructor() {
    this.errors = {};
  }

  get(field) {
    return this.errors[field] || undefined;
  }

  hasAny() {
    return Object.keys(this.errors).length > 0;
  }

  has(field) {
    return Object.prototype.hasOwnProperty.call(this.errors, field);
  }

  recordAll(errors) {
    this.errors = errors;
  }

  recordField(field) {
    this.errors = { ...this.errors, ...field };
  }

  clear(field) {
    if (field) {
      delete this.errors[field];
      return;
    }
    this.errors = {};
  }
}

export default Errors;
