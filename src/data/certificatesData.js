import { createCertificatePlaceholder } from '../assets/placeholders';

export const certificatesData = [
  {
    id: 'cert-placeholder-1',
    title: 'Nama Sertifikat 1',
    issuer: 'Nama Lembaga Penerbit',
    year: 'Tahun',
    image: createCertificatePlaceholder('Nama Sertifikat 1', 'Lembaga Penerbit'),
    credentialUrl: '',
  },
  {
    id: 'cert-placeholder-2',
    title: 'Nama Sertifikat 2',
    issuer: 'Nama Lembaga Penerbit',
    year: 'Tahun',
    image: createCertificatePlaceholder('Nama Sertifikat 2', 'Lembaga Penerbit'),
    credentialUrl: '',
  },
];
