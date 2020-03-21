const getRandomPalette = (colorAmount = 1) => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    let palette = []
    for (let i = 0; i < colorAmount; i++) {
        for (let j = 0; j < 6; j++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        if (colorAmount > 1){
            palette.push(color);
            color = '#';
        } else {
            return color;
        }
    }
    return palette;
}

export default getRandomPalette;