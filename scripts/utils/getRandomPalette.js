const getRandomPalette = (colorAmount = 1) => {
    const letters = '0123456789ABC'; // Excluding DEF to prevent very getting brighter colours
    let palette = []
    
    for (let i = 0; i < colorAmount; i++) {
        let color = '#';
        for (let j = 0; j < 6; j++) {
            color += letters[Math.floor(Math.random() * letters.length)];
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