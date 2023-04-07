const staticImages = [
    "images/beach.jpg",
    "images/desertlandscape.jpg",
    "images/orangeclouds.jpg",
    "images/snowyalps.jpg",
    "images/snowymountains.jpg",
    "images/starrysnow.jpg",
    "images/sunsetmountains.jpg",
    "images/thegodtree.jpg",
    "images/montanamountains.jpg",
    "images/oceansunset.jpg",
    "images/cartoonwaves.jpg",
    "images/carwarsh.jpg",
    "images/colorfulpainting.jpg",
    "images/darkdesert.jpg",
    "images/geometry.jpg",
    "images/pink-bubbles.jpg",
    "images/red-blue-liquid.jpg",
    "images/red-blue-liquid.jpg",
]

const devURL = "http://localhost:8080"

const prodURL = "https://projectied.onrender.com"

const randomImage = (arr) => {
    const randomIdx = Math.floor(Math.random() * arr.length)
    return arr[randomIdx]
}

const replaceImage = (imageArr, url) => {
    let image = `${prodURL}/${randomImage(imageArr)}`
    if (!url.includes(".")) {
        const newURL = image
        return newURL
    } else {
        return url
    }
}

module.exports = { staticImages, randomImage, replaceImage }
