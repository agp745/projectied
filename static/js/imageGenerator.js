const images = document.querySelectorAll("img")

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

const replaceImage = () => {
    for (let i = 0; i < images.length; i++) {
        if (!images[i].src.includes(".")) {
            let image = `http://localhost:8080/${randomImage(staticImages)}`
            images[i].src = image
        }
    }
}

replaceImage()
