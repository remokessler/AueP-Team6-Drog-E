export interface IMedicine {
  id: number;
  name: string;
  latinName: string;
  amountPerDay: number;
  dispenser: number;
  medicineType: MedicineType;
}

export enum MedicineType
{
  Unknown,
  Capsule,
  Injection,
  BandAid,
  Liquid,
  Inhaler,
  TopicalMedicine,
  Suppository,
  Drop
}
