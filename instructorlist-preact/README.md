# instructorlist

## CLI Commands

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build

# test the production build locally
yarn serve

# run tests with jest and preact-render-spy
yarn test
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).

## Images

Some helpful scripts to make images smaller. This was introduced to integrate with original developers work who had many big images.

Converts images to jpg and resizes to good dimensions, input from `raw-images/`, output is `raw-images-resized/`

    node imageresize.js

Copy back to `raw-images/`

    cp raw-images-resized/* raw-images

Then you can do

    node imagemin.js

Which minifies and moves all assets to the landing-page folder

## Deploy

```
cd ../instructorlist-preact && yarn build && git add ../instructorlist-express/frontend-build-copy/ && gam 'deploy' ; git push
```
