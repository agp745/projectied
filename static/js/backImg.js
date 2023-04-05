const imageInfo = document.querySelector("#imageURL")
const root = document.querySelector(":root")

const imageUrl = imageInfo.innerText

const imageVar = getComputedStyle(root)

root.style.setProperty("--image", `url(${imageUrl})`)
