const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')

async function main() {
  const files = await imagemin(['raw-images/*.{jpg,png}'], {
    destination: './src/assets/images/landing-page/',
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  })

  console.log(files)
}
main()
