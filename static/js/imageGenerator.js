const staticImages = [
    "images/beach.jpg",
    "images/desertlandscape.jpg",
    "images/orangeclouds.jpg",
    "images/snowyalps.jpg",
    "images/snowymountains.jpg",
    "images/starrysnow.jpg",
    "images/sunsetmountains.jpg",
    "images/thegodtree.jpg",
]

const randomImage = (arr) => {
    const randomIdx = Math.floor(Math.random() * arr.length)
    return arr[randomIdx]
}

const replaceImage = (imageArr, url) => {
    let image = `http://localhost:8080/${randomImage(imageArr)}`
    if (!url.includes(".")) {
        const newURL = image
        return newURL
    } else {
        return url
    }
}

module.exports = { staticImages, randomImage, replaceImage }
