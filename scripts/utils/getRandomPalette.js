const getRandomPalette = (colorAmount = 1) => {
    const hex = '23456789AB'; // Exclude 1234 and DEF to prevent getting very dark or bright colours
    let palette = []
    
    for (let i = 0; i < colorAmount; i++) {
        let color = '#';
        for (let j = 0; j < 6; j++) {
            color += hex[Math.floor(Math.random() * hex.length)];
        }

        if (colorAmount > 1){
            palette.push(color);
        } else {
            return color;
        }
    }
    return palette;
}

export default getRandomPalette;