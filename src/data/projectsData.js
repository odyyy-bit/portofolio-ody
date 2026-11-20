import adiraImage from '../assets/images/project-adira-finance.jpg';
import elearnImage from '../assets/images/project-elearn-figma.jpg';
import laundryImage from '../assets/images/project-si-laundry.jpg';

export const projectCategories = ['All', 'Web App', 'Frontend & UI', 'Backend & Fullstack'];

export const projectsData = [
  {
    id: 'website-pengajuan-kredit',
    title: 'Website Pengajuan Kredit',
    category: 'Web App',
    description:
      'Website pengajuan kredit yang dibuat selama Praktik Kerja Lapangan (PKL) selama 6 bulan (6 April — 6 Oktober) di Adira Finance Cabang Mojokerto. Berisi dashboard, data konsumen & kendaraan, pengajuan, kontrak, serta monitoring angsuran.',
    image: adiraImage,
    technologies: ['Web App', 'HTML5', 'CSS3', 'JavaScript'],
    liveUrl: '',
    githubUrl: 'https://github.com/odyyy-bit',
  },
  {
    id: 'desain-elearn-smkn-2-mojokerto',
    title: 'Desain UI E-Learn SMKN 2 Mojokerto',
    category: 'Frontend & UI',
    description:
      'Rancangan antarmuka (UI/UX) di Figma untuk sistem E-Learning SMKN 2 Mojokerto: halaman login, dashboard murid, guru & admin, materi pembelajaran, pengumpulan tugas, daftar nilai, pengumuman, dan profil pengguna, lengkap dengan versi desktop dan mobile.',
    image: elearnImage,
    technologies: ['Figma', 'UI/UX', 'Responsive Design'],
    liveUrl: '',
    githubUrl: 'https://github.com/odyyy-bit',
  },
  {
    id: 'si-laundry',
    title: 'SI Laundry',
    category: 'Backend & Fullstack',
    description:
      'Sistem informasi operasional laundry berbasis web dengan dashboard ringkasan data, manajemen pengguna dan paket layanan, serta pengelolaan pesanan dengan status Pending, Diproses, Selesai, dan Diterima.',
    image: laundryImage,
    technologies: ['PHP', 'Laravel', 'MySQL', 'Fullstack'],
    liveUrl: '',
    githubUrl: 'https://github.com/odyyy-bit',
  },
];
