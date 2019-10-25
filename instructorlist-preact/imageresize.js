const sharp = require('sharp')

async function main() {
  const sources = [
    {
      file: 'dancer-1.jpg',
      destFileName: 'dancer-1.jpg',
      resize: [400],
    },
    {
      file: 'dancer-2.jpg',
      destFileName: 'dancer-2.jpg',
      resize: [400],
    },
    {
      file: 'dancer-3.jpg',
      destFileName: 'dancer-3.jpg',
      resize: [400],
    },
    {
      file: 'header-image.jpg',
      destFileName: 'header-image.jpg',
      resize: [500],
    },
    {
      file: 'map.jpg',
      destFileName: 'map.jpg',
      resize: [500],
    },
    {
      file: 'testimonial.png',
      destFileName: 'testimonial.png',
      resize: [450],
    },
    {
      file: 'icon-1.png',
      resize: [170],
    },
    {
      file: 'icon-2.png',
      resize: [170],
    },
    {
      file: 'icon-3.png',
      resize: [170],
    },
    {
      file: 'icon3.png',
      resize: [170],
    },
  ]
  const src = 'raw-images/'
  const dest = 'raw-images-resized/'
  await Promise.all(
    sources.map(x =>
      sharp(`${src}${x.file}`)
        .resize(...x.resize)
        .toFile(`${dest}${x.destFileName || x.file}`),
    ),
  )
}
main()
