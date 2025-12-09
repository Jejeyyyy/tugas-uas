import { ServiceDefinition } from './types';
import { CreditCard, FileText, Globe, UserPlus, Baby, Car } from 'lucide-react';

export const SERVICES: ServiceDefinition[] = [
  {
    id: 'ktp',
    name: 'e-KTP',
    icon: 'CreditCard',
    code: 'A',
    description: 'Pembuatan dan perbaikan KTP Elektronik',
    estimatedTimePerPerson: 10,
  },
  {
    id: 'kk',
    name: 'Kartu Keluarga',
    icon: 'UserPlus',
    code: 'B',
    description: 'Pecah KK, penambahan anggota keluarga',
    estimatedTimePerPerson: 15,
  },
  {
    id: 'paspor',
    name: 'Paspor',
    icon: 'Globe',
    code: 'C',
    description: 'Pembuatan paspor baru dan penggantian',
    estimatedTimePerPerson: 20,
  },
  {
    id: 'sim',
    name: 'SIM A/C',
    icon: 'Car',
    code: 'F',
    description: 'Perpanjangan Surat Izin Mengemudi',
    estimatedTimePerPerson: 5,
  },
  {
    id: 'akta',
    name: 'Akta Lahir',
    icon: 'Baby',
    code: 'D',
    description: 'Pencatatan kelahiran baru',
    estimatedTimePerPerson: 12,
  },
  {
    id: 'surat-pindah',
    name: 'Surat Pindah',
    icon: 'FileText',
    code: 'E',
    description: 'Surat Keterangan Pindah WNI (SKPWNI)',
    estimatedTimePerPerson: 8,
  },
];

export const TIME_SLOTS = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
];

export const INITIAL_QUEUE_STATUS = {
  'A': 12,
  'B': 5,
  'C': 8,
  'D': 3,
  'E': 1,
  'F': 20,
};