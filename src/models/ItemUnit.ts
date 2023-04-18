export class ItemUnit {
  type: UnitType;
  content: number;

  constructor(type: UnitType, content: number) {
    this.type = type;
    this.content = content;
  }
}

export enum UnitType {
  KILOGRAMS,
  LITERS,
}
