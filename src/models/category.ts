export class Category {
  private _code: number;
  private _name: string;

  constructor() {
    this._code = 0;
    this._name = "blankCategory";
  }


  get code(): number {
    return this._code;
  }

  set code(value: number) {
    this._code = value;
  }


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
