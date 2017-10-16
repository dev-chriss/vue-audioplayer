/**
 * FileController
 *
 * @description :: Server-side logic for managing Files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    upload: function(req, res) {

        var uploadFile = req.file('file');

        uploadFile.upload(function onUploadComplete(err, files) {
            // don't allow the total upload size to exceed ~10MB
            maxBytes: 10000000;

            //	IF ERROR Return and send 500 error with error
            if (err) return res.serverError(err);

            if (files.length === 0) {
                return res.badRequest('No file was uploaded')
            }

            var path = require('path');
            var filenameEncoded = path.basename(files[0].fd);

            //Backup file to preventing lift up
            var fs = require('fs');
            var tempLocation = process.cwd() + '/.tmp/uploads/' + filenameEncoded;
            var uploadLocation = process.cwd() + '/assets/audio/' + filenameEncoded;
            fs.createReadStream(tempLocation).pipe(fs.createWriteStream(uploadLocation));

            /*
            / convert here
            */

            // at this point the file is phisicaly available and decoded in the hard drive
            var path = require('path');
            File.create({
                url: req.baseUrl + "/audio/" + filenameEncoded,
                title: files[0].filename,
                author: "Artist",
                path: files[0].fd,
                filename: files[0].filename,
            }).exec(function(err, files) {
                if (err) {
                    return res.serverError(err)
                }
                res.json({ status: 200, file: files });
            })
        });
    },

    download: function(req, res) {
        // gets the id either in urlencode, body or url query
        var fileID = req.param('id')

        File
            .findOne({ id: fileID })
            .exec((err, file) => {
                if (err) { return res.serverError(err) }
                if (!file) { return res.notFound() }

                res.download(file.path, function(err) {
                    if (err) {
                        return res.serverError(err)
                    } else {
                        return res.ok()
                    }
                })
            })
    },
    filelist: function(req, res) {
        File.find().then(function(alltheFiles) {
            res.json({ status: 200, playlist: alltheFiles });
        }).catch(function(err) {
            return res.serverError(err)
        });
    }
};