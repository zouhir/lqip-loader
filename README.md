<p align="center">
  <img src="https://raw.githubusercontent.com/zouhir/lqip/master/_github/logo.png" width="508">
</p>

<h4 align="center">lqip-loader: low quality images placeholders for webpack</h4>
<p align="center">
  <a align="center" href="https://lqip-loader.firebaseapp.com/">demo</a>
</p>

<br />
<br />
<p>
  <img src="https://raw.githubusercontent.com/zouhir/lqip/master/_github/installation.png" width="100%">
</p>

```
npm install --save-dev lqip-loader
```

<br />
<p>
  <img src="https://raw.githubusercontent.com/zouhir/lqip/master/_github/example.png" width="100%" />
</p>

Generating Base64 & dominant colours palette for a jpeg image imported in your JS bundle:

PS: The large image file will be emitted & only 400byte of Base64 (if set to true in the loader options) will be bundled.

webpack.config.js:
```js
{
  /**
   * OPTION A:
   * default file-loader fallback
   **/
  test: /\.jpe?g$/,
  loaders: [
    {
      loader: 'lqip-loader',
      options: {
        path: '/media', // your image going to be in media folder in the output dir
        name: '[name].[ext]', // you can use [hash].[ext] too if you wish,
        base64: true, // default: true, gives the base64 encoded image
        palette: true // default: false, gives the dominant colours palette
      }
    }
  ]

  /**
   * OPTION B:
   * Chained with your own url-loader or file-loader
   **/
  test: /\.(png|jpe?g)$/,
  loaders: [
    {
      loader: 'lqip-loader',
      options: {
        base64: true,
        palette: false
      }
    },
    {
      loader: 'url-loader',
      options: {
        limit: 8000
      }
    }
  ]
}
```

your-app-module.js:
```js
import banner from './images/banner.jpg';

console.log(banner.preSrc);
// outputs: "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhY.... 

// the object will have palette property, array will be sorted from most dominant colour to the least
console.log(banner.palette) // [ '#628792', '#bed4d5', '#5d4340', '#ba454d', '#c5dce4', '#551f24' ]
 
console.log(banner.src) // that's the original image URL to load later!

```

<br />
<p>
  <img src="https://github.com/zouhir/lqip/blob/master/_github/important.png" width="100%" />
</p>

To save memory and improve GPU performance, browsers (including Chrome started from 61.0.3163.38) will now render a 
slightly more crisp or pixelated Base64 encoded images.
<p align="center">
  <img src="https://user-images.githubusercontent.com/5052316/31105257-7986782c-a82e-11e7-972b-cabcf97f13c0.png" width="500px" />
  <br />
  Older Chrome to the left, Chrome v61 to the right.
</p>

If you want the blur to be smooth really bad, here's a fix! 
```css
img {
  filter: blur(25px);
}
```

More history about the issue can be [found here](https://bugs.chromium.org/p/chromium/issues/detail?id=771110#c3) and [here](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/6L_3ZZeuA0M).

alternatively, you can fill the container with a really cheap colour or gradient from the amazing palette we provide.

<br />
<p>
  <img src="https://raw.githubusercontent.com/zouhir/lqip/master/_github/inspo.png" width="100%" />
</p>

- [Medium web app](https://medium.com/cucumbertown-magazine/the-beginners-guide-to-composition-in-food-photography-how-to-transform-your-food-photos-from-good-39613ab78bf2)
- [Instagram native mobile app](https://www.instagram.com/)
- [Polymer shop project](https://shop.polymer-project.org/)

<br />
<p>
  <img src="https://github.com/zouhir/lqip/blob/master/_github/mentions.png" width="100%" />
</p>

- Essential Image Optimization, An [eBook by Addy Osmany](https://images.guide/)

<br />
<p>
  <img src="https://raw.githubusercontent.com/zouhir/lqip/master/_github/creds.png" width="100%" />
</p> 

Related projects to this would be [lqip module for Node](https://github.com/zouhir/lqip) as well as [lqip-cli](https://github.com/zouhir/lqip-cli).

Thanks to [Colin van Eenige](https://twitter.com/cvaneenige) for his reviewing and early testing.

MIT - [Zouhir Chahoud](https://zouhir.org/)
