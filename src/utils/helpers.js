export function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function buildChord(scale, degree, type) {
    const note = scale[degree];
    return `${note}${type}`;
}