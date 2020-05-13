const getRandomPalette = (colorAmount = 1) => {
  const hex = '23456789AB'; // Exclude 1 and DEF to prevent getting very dark or bright colours
  const palette = [];

  for (let i = 0; i < colorAmount; i += 1) {
    let color = '#';
    for (let j = 0; j < 6; j += 1) {
      color += hex[Math.floor(Math.random() * hex.length)];
    }

    if (colorAmount > 1) {
      palette.push(color);
    } else {
      return color;
    }
  }
  return palette;
};

export default getRandomPalette;
