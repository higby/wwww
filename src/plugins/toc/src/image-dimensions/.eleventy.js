const { JSDOM } = require("jsdom");
const sharp = require('sharp');
const fetch = require('node-fetch');

async function imageData(content, outputPath) {
  if( outputPath && outputPath.endsWith(".html") ) {
    const dom = new JSDOM(content);
    const images = [...dom.window.document.querySelectorAll("img")];
    for (var i = 0; i < images.length; i++) {
      let src = images[i].src;
      if (src.startsWith('http')) {
        const res = await fetch(src);
        const buffer = await res.buffer();
        elem = await sharp(buffer).metadata();
      }
      else {
        let url = "./site/" + src;
        elem = await sharp(url).metadata();
      }
      images[i].setAttribute('loading', 'lazy');
      images[i].setAttribute('width', elem.width);
      images[i].setAttribute('height', elem.height);
    }
    content = dom.serialize();
  }
  return content;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform("imageSizes", imageData);
}
