# GOV.UK Social Image Generator

Given a URL on GOV.UK, this code generates an image with the title of the page, to be shared on social networks.

This project includes a file called `convert` - this is a verion of [ImageMagick](https://www.imagemagick.org/), 
provided by ImageMagick Studio LLC.

## How it works

This project is designed to run on [AWS Lambda](https://aws.amazon.com/lambda/).

The `index.js` file handles the request. It takes a path on GOV.UK, and looks it up in 
the [content API](https://docs.publishing.service.gov.uk/apis/content-store.html).

This returns information about the page, but we're just interested in the title.

The script then sets a font size depending on how long the title is, and runs `convert` (ImageMagick) to create the
PNG image.

The script then returns the PNG as a base64 encoded string.

## Test locally

You need Node.js and ImageMagick installed.

Run `node test`

This will render the image for Register to vote and put it in the `output` folder.

You can also add any path on GOV.UK for example:

`node test browse/driving`
