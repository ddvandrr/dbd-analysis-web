export function getRecommendation(cluster: number) {
  switch (cluster) {
    case 2:
      return "Prioritaskan fogging, PSN intensif, surveilans vektor, dan kesiapan fasilitas kesehatan.";
    case 1:
      return "Lakukan peningkatan edukasi masyarakat dan monitoring kasus berkala.";
    default:
      return "Pertahankan upaya pencegahan dan pemantauan rutin.";
  }
}
