export default {
  methods: {
    checkIsImageValid(
      acceptableImageTypes, //.png,.jpg,.jpeg
      maxSize, //in byte(binary)
      maxWidth,
      maxHeight,
      selectedImage
    ) {
      return new Promise((resolve) => {
        let result = {
          isValidImage: true,
          message: ''
        }
        //First check image type
        if (this.checkFileTypeValid(acceptableImageTypes, selectedImage)) {
          //check image size
          if (this.checkFileSizeValid(selectedImage, maxSize)) {
            //check Height and width
            const img = document.createElement('img')
            img.src = URL.createObjectURL(selectedImage)
            img.onload = function () {
              if (img.height > maxHeight || img.width > maxWidth) {
                result.isValidImage = false
                result.message = `Please select image with max dimensions ${maxWidth} X ${maxHeight}.` //on message update, update getImageDimensionError() function also
                resolve(result)
              }
              resolve(result)
            }
          } else {
            result.isValidImage = false
            result.message = this.getImageSizeError(maxSize)
            resolve(result)
          }
        } else {
          result.isValidImage = false
          result.message = this.getImageTypeError(acceptableImageTypes)
          resolve(result)
        }
      })
    },

    checkIsImageValidAndGetHW( //imageWidth & heigh is passed
      acceptableImageTypes, //.png,.jpg,.jpeg
      maxSize, //in byte(binary)
      maxWidth,
      maxHeight,
      selectedImage
    ) {
      return new Promise((resolve) => {
        let result = {
          isValidImage: true,
          message: '',
          height: 0.0,
          width: 0.0,
          size: selectedImage.size
        }
        //First check image type
        if (this.checkFileTypeValid(acceptableImageTypes, selectedImage)) {
          //check image size
          if (this.checkFileSizeValid(selectedImage, maxSize)) {
            //check Height and width
            const img = document.createElement('img')
            img.src = URL.createObjectURL(selectedImage)
            img.onload = function () {
              if (img.height > maxHeight || img.width > maxWidth) {
                result.isValidImage = false
                result.message = `Please select image with max dimensions ${maxWidth} X ${maxHeight}.` //on message update, update getImageDimensionError() function also
                resolve(result)
              }
              result.height = img.height
              result.width = img.width
              resolve(result)
            }
          } else {
            result.isValidImage = false
            result.message = this.getImageSizeError(maxSize)
            resolve(result)
          }
        } else {
          result.isValidImage = false
          result.message = this.getImageTypeError(acceptableImageTypes)
          resolve(result)
        }
      })
    },

    checkFileTypeValid(acceptableImageTypes, selectedImage) {
      var result = false
      var imageExtension = selectedImage.name.split('.').pop() //get image extension
      var imageTypeArray = acceptableImageTypes.replaceAll('.', '').split(',') //from .png,.jpg,.jpeg make an array ["png", "jpg",..]
      var imageType
      for (imageType in imageTypeArray) {
        if (
          imageExtension.toLowerCase() ==
          `${imageTypeArray[imageType]}`.toLowerCase()
        ) {
          result = true
        }
      }
      return result
    },
    checkFileSizeValid(selectedImage, maxSize) {
      if (selectedImage.size > maxSize) {
        return false
      } else {
        return true
      }
    },
    formatBytes(bytes, decimals = 2) {
      //Formats bytes array upto 2 decimal
      if (bytes === 0) {
        return '0 Bytes'
      }
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    },
    getAllImageValidationRule(
      acceptableImageTypes, // .png,.jpg,.jpeg
      maxSize, //in byte(binary)
      maxWidth,
      maxHeight
    ) {
      var typeRule = this.getImageTypeError(acceptableImageTypes)
      var sizeRule = this.getImageSizeError(maxSize)
      var dimensionRule = this.getImageDimensionError(maxWidth, maxHeight)
      return `${typeRule}\n${sizeRule}\n${dimensionRule}` // replace \n as per requirement
    },
    getImageTypeError(acceptableImageTypes) {
      var imgType = acceptableImageTypes.replaceAll(',', '/')
      return `Please select ${imgType} image.`
    },
    getImageSizeError(maxSize) {
      var maxReqSize = this.formatBytes(maxSize) //first format bytes and then show it
      return `Please select image size less than ${maxReqSize}.`
    },
    getImageDimensionError(maxWidth, maxHeight) {
      return `Please select image with max dimensions ${maxWidth} X ${maxHeight}.` //on message update, update it in checkIsImageValid() function also
    }
  }
}
