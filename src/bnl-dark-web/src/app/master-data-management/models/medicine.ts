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
  Unknown = 'Unknown',
  Capsule = 'Capsule',
  Injection = 'Injection',
  BandAid = 'BandAid',
  Liquid = 'Liquid',
  Inhaler = 'Inhaler',
  TopicalMedicine = 'TopicalMedicine',
  Suppository = 'Suppository',
  Drop = 'Drop'
}
