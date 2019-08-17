Image Crop and Print Preview
==================

Instructions to run locally
==========================

#### With Docker
```bash

$ docker build -t cropper .
$ docker run -p 3000:3000 -d cropper
# head to localhost:3000
```


#### Without Docker
```bash
$ cd react-crop-upload
$ yarn install
$ yarn start

# head to localhost:3000
```

Work Needs to be done
=====================

- Make a build size <= 50kb
- Currenlty App is opening a new page with a path `/preview` which has the
  rendered image and after that it is opening a print dialog box but
  I need to figure if page printed than tab should get's closed, else it
  shouldn't, similarly it should support all browser.

Doubt asked (needs to be cleared)
================================

- Current behaviour is if user crop the image than only he/she can save the
  image but in the instructions it's mentioned that above can be
  valid case even if image is not uploaded, but doubt is in this what needs to
  be shown to the user.
