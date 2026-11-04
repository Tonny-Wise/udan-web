// Utility for seeded random image selection
// All 49 images available in /public/images/

const ALL_IMAGES = [
  "5CCC882B-6572-45AD-B922-A908BF1F70E3.JPG",
  "AF6A6131.JPG",
  "AF6A6287.JPG",
  "AF6A6292.JPG",
  "AF6A6293.JPG",
  "AF6A6324.JPG",
  "AF6A6325.JPG",
  "AF6A6330.JPG",
  "AF6A6332.JPG",
  "AF6A6447.JPG",
  "AF6A6452.JPG",
  "AF6A6459.JPG",
  "AF6A6490.JPG",
  "AF6A6491.JPG",
  "AF6A6520.JPG",
  "AF6A6544.JPG",
  "AF6A6602.JPG",
  "AF6A6671.JPG",
  "AF6A6675.JPG",
  "AF6A6677.JPG",
  "AF6A6681.JPG",
  "AF6A6683.JPG",
  "AF6A6687.JPG",
  "AF6A6688.JPG",
  "AF6A6689.JPG",
  "AF6A6690.JPG",
  "AF6A6710.JPG",
  "AF6A6723.JPG",
  "AF6A6724.JPG",
  "AF6A6742.JPG",
  "AF6A6743.JPG",
  "AF6A6745.JPG",
  "AF6A6753.JPG",
  "AF6A6818.JPG",
  "AF6A6820.JPG",
  "AF6A6826.JPG",
  "AF6A6827.JPG",
  "AF6A6829.JPG",
  "AF6A8545(1).JPG",
  "AF6A8566.JPG",
  "AF6A8569.JPG",
  "AF6A8584.JPG",
  "AF6A8588(1).JPG",
  "AF6A8602.JPG",
  "AF6A8616.JPG",
  "AF6A8619.JPG",
  "AF6A8672.JPG",
  "AF6A8673 (1).JPG",
  "AF6A8673.JPG",
];

// Seeded random number generator for consistency
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Get random images with optional seed for consistency
export function getRandomImages(
  count: number,
  excludeList: string[] = [],
  seed: number = 42
): string[] {
  const availableImages = ALL_IMAGES.filter(
    (img) => !excludeList.includes(img)
  );

  const selected: string[] = [];
  const usedIndices = new Set<number>();

  for (let i = 0; i < count && availableImages.length > 0; i++) {
    let index = Math.floor(seededRandom(seed + i) * availableImages.length);

    // Ensure we don't pick the same image twice in one batch
    while (usedIndices.has(index) && usedIndices.size < availableImages.length) {
      index = (index + 1) % availableImages.length;
    }

    usedIndices.add(index);
    selected.push(`/images/${availableImages[index]}`);
  }

  return selected;
}

// Get a random image from all available
export function getRandomImage(seed: number = 42): string {
  return getRandomImages(1, [], seed)[0];
}

// Get random images for specific section (with stable seeding per section)
export function getRandomImagesForSection(
  section: "programs" | "blog" | "collage" | "lifestyle",
  count: number
): string[] {
  const seedMap = {
    programs: 100,
    blog: 200,
    collage: 300,
    lifestyle: 400,
  };

  // Reserve specific images for hero and key sections
  const reserved = [
    "AF6A6459.JPG", // Hero
    "AF6A6292.JPG", // Program highlight
    "AF6A6293.JPG", // Program highlight
  ];

  return getRandomImages(count, reserved, seedMap[section]);
}
