import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Roboter'
  },
  {
    name: 'Roboter',
    url: '/robots',
    icon: 'fas fa-robot',
    badge: {
      variant: 'danger',
      text: 'Erros: 1'
    }
  },
  {
    title: true,
    name: 'Patienten'
  },
  {
    name: 'Übersicht',
    url: '/patients/overview',
    icon: 'fas fa-user-injured'
  },
  {
    title: true,
    name: 'Medikamente'
  },
  {
    name: 'Medikamente',
    url: '/drugs/overview',
    icon: 'fas fa-pills',
  },
  {
    name: 'Therapien',
    url: '/therapies/overview',
    icon: 'fas fa-notes-medical',
  },
];
