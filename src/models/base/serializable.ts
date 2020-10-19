export abstract class SerializableModel {

  protected _deserializeIgnoreSelfKeys: string[] = [];
  protected _deserializeIgnoreOtherKeys: string[] = [];

  serialize() {
    let result: any = {};
    let self: any = this;

    for (let k in self) {
      if (!this.hasOwnProperty(k) || typeof self[k] === 'function') {
        continue;
      }

      if (k[0] == "_" || self._deserializeIgnoreSelfKeys.indexOf(k) !== -1) {
        continue;
      }

      if (self[k]) {
        if (self[k] instanceof SerializableModel) {
          result[k] = (<SerializableModel>self[k]).serialize();
        }
        else {
          result[k] = self[k];
        }
      }
      else {
        result[k] = self[k];
      }
    }

    return result;
  }

  deserialize(data: any) {
    if (data === null) {
      return null;
    }

    let self: any = this;

    for (let k in self) {

      if (!this.hasOwnProperty(k) || typeof self[k] === 'function') {
        continue;
      }

      if (k[0] == "_" || self._deserializeIgnoreSelfKeys.indexOf(k) !== -1) {
        continue;
      }

      if (typeof data[k] === 'undefined') {
        console.warn("Missing field " + k + " in data", data);
        continue;
      }

      if (data[k] && self[k]) {
        if (self[k] instanceof SerializableModel) {
          (<SerializableModel>self[k]).deserialize(data[k]);
        }
        else if (self[k] instanceof Date && typeof data[k] === 'string') {
          self[k] = <any>new Date(data[k]);
        }
        else {
          self[k] = data[k];
        }
      }
      else {
        self[k] = data[k];
      }
    }

    for (let k in data) {

      if (k[0] == "_" || self._deserializeIgnoreOtherKeys.indexOf(k) !== -1) {
        continue;
      }

      if (typeof self[k] === 'undefined') {
        console.warn("Missing field " + k + " in self", self);
      }
    }

    return this;
  }
}