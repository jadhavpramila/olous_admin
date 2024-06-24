export default {
  methods: {
    uploadFileOnS3(fileName, whereToStore, selectedFile, FileContentType) {
      return new Promise((resolve, reject) => {
        let bucketName = process.env.VUE_APP_BUCKETNAME
        let bucketRegion = process.env.VUE_APP_BUCKETREGION
        let IdentityPoolId = process.env.VUE_APP_IDENTITYPOOLID

        // eslint-disable-next-line no-undef
        AWS.config.update({
          region: bucketRegion,
          // eslint-disable-next-line no-undef
          credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IdentityPoolId
          })
        })

        // eslint-disable-next-line no-undef
        let s3 = new AWS.S3({
          apiVersion: '2006-03-01',
          params: { Bucket: bucketName }
        })

        let filePath = `${whereToStore}${fileName}`
        s3.upload(
          {
            Key: filePath,
            Body: selectedFile,
            ACL: 'public-read',
            ContentType: selectedFile.type
          },
          (err, data) => {
            if (err) {
              reject('Unable to upload file. Please try again later.')
            } else if (data) {
              resolve({
                serverFilePath: data.Location,
                savedFileName: fileName
              })
            }
          }
        )
      })
    }

    //delete function has access premission issue so need to implement at backend side

    // deleteFileONS3(bucketName, fileNameWithPath) {
    //   if (bucketName == '') {
    //     bucketName = process.env.VUE_APP_BUCKETNAME
    //   }
    //   let bucketRegion = process.env.VUE_APP_BUCKETREGION
    //   let IdentityPoolId = process.env.VUE_APP_IDENTITYPOOLID

    //   // eslint-disable-next-line no-undef
    //   AWS.config.update({
    //     region: bucketRegion,
    //     // eslint-disable-next-line no-undef
    //     credentials: new AWS.CognitoIdentityCredentials({
    //       IdentityPoolId: IdentityPoolId
    //     })
    //   })

    //   // eslint-disable-next-line no-undef
    //   let s3 = new AWS.S3({
    //     apiVersion: '2006-03-01',
    //     params: { Bucket: bucketName }
    //   })

    //   var params = { Bucket: bucketName, Key: fileNameWithPath }

    //   s3.deleteObject(params, function (err, data) {
    //     if (err) {
    //       console.log(err, err.stack)
    //     } else {
    //       //Deleted successfully
    //     }
    //   })
    // }
  }
}
