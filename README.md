<h1 align="center">
  <img src="https://lqip-loader.firebaseapp.com/media/logo.png">
    <br />
    LQIP-LOADER for WEBPACK
    <br />
    <br />
</h1>

<h4 align="center">LQIP: Low Quality Images Placeholder</h4>

#### Demo

- You'll get a placeholder in `~400-500 Bytes` for a `900px` wide HQ 

#### Inspired By:
- Medium web
- Instagram mobile app
- Polymer shop project

#### What's this loader best at:
- Fast `JPEG, JPG, PNG` scale down and base64 string conversion
- Not losing a reference of the original image as it returns an object as the following
```js
// loader returns in your JS module
{
    preSrc: 'String: Base64',
    src: 'String: Original image path'
}
```

#### What can be improved

Image `src` hold a reference for the file path in your output directory, it does not emmit the file, but at the moment it lacks the smartness and capability like `file-loader` to maintain relative paths.

Currently working on a solution to pipe it after `file-loader` or `url-loader` or find a better path implemenation.