const fs = require('fs');
const path = require('path');

//used to get the avater image
module.exports = {
    getAvatar: (req, res) => {
        res.sendFile(path.join(global.__root, `storage/avatar/${req.params.id}`), err => {
            if (err) res.status(404).json({ message: 'Avatar Not Found!' });
        });
    },
    getAlbumPic: (req, res) => {
        res.sendFile(path.join(global.__root, `storage/album/${req.params.id}`), err => {
            if (err) res.status(404).json({ message: 'Image Not Found!' });
        });
    }
}