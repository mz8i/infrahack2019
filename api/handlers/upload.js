const upload = require('../../file-upload')

const singleUpload = upload.single('image')

const uploadImage = (ctx) => {
  console.log('ctx', ctx.request.body)
  singleUpload(req, res, function(err, some) {
    console.log('err', err)
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
    }

    return res.json({'imageUrl': ctx.req.file.location});
  });
  ctx.ok()
}

module.exports = {
  uploadImage
}
