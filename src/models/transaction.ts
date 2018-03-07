import {Category} from "./category";


export class Transaction {
  private _amount: number;
  private _currency: string;
  private _date: number;
  private _description: string;
  private _account: number;
  private _category = new Category();
  private _type: string;


  constructor(amount: number, currency: string, date: number, description: string, account: number, categoryName: string, categoryNumber: number, type: string) {
    this._amount = amount;
    this._currency = currency;
    this._date = date;
    this._description = description;
    this._account = account;
    this._category.name = categoryName;
    this._category.code = categoryNumber;
    this._type = type;
  }

  editValues(amount: number, currency: string, date: number, description: string, account: number):void{
    this._amount = amount;
    this._currency = currency;
    this._date = date;
    this._description = description;
    this._account = account;
  }

  editCategory(categoryName: string, categoryNumber: number){
    this._category.name = categoryName;
    this._category.code = categoryNumber;
  }


  get date(): number {
    return this._date;
  }

  set date(value: number) {
    this._date = value;
  }


  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }


  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }


  get currency(): string {
    return this._currency;
  }

  set currency(value: string) {
    this._currency = value;
  }


  get account(): number {
    return this._account;
  }

  set account(value: number) {
    this._account = value;
  }


  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
}
