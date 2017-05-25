<h1 align="center">
  <img src="https://lqip-loader.firebaseapp.com/media/logo.png">
    <br />
    LQIP-LOADER for WEBPACK
    <br />
    <br />
</h1>

<h4 align="center">LQIP: Low Quality Images Placeholder</h4>

#### [Demo: must see first](https://lqip-loader.firebaseapp.com/)

#### Inspired By:
- Medium web app
- Instagram mobile app
- Polymer shop project

#### What's this loader best at:
- Static assets
- Fast JPEG, JPG, PNG scale down and base64 string conversion.
- Not losing a reference of the original image as the return value is an object (look on usage).

#### What can be improved

Image *src* hold a reference for the file path in your output directory, it does not emmit the file, but at the moment it lacks the smartness and capability of *file-loader* to maintain relative paths.

I am Currently working on a solution to pipe it after *file-loader* or *url-loader* or find a better src URL implemenation please feel free to submit a PR or raise an issue with your idea.

#### Example usage

*Loading JPEG or JPG files*

in your *webpack config file*

```json
{
    test: /\.jpe?g$/,
    loaders: [
        {
            loader: 'lqip-loader',
            options: {
                path: '/media'
            }
        },
    ]
}
```

*In your module*

```js
import banner from './images/banner.jpg';

console.log(banner.preSrc) // that's the base64 blurry file, use first
console.log(banner.src) // that's the original image URL to load later
```

#### License
MIT - Zouhir Chahoud