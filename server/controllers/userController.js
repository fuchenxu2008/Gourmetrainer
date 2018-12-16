// const User = require("../models")
//Create
module.exports = {
    addUser: (req, res) => {
        const {
            email,
            nickname,
            password,
            gender
        } = req.body
        if (!email || !nickname || !password || !gender) return res.send("Please fill in all information")
        User.findOne({
            email,
            nickname
        }, (error, existingUser) => {
            if (error) return res.status(400).send("Error find:", error)
            if (existingUser) return res.send("user exist")
            User.create({
                nickname,
                password,
                email,
                gender
            }, (error, user) => {
                if (error) return res.status(400).send("Error find:", error)
                return res.send("User Succesfully Created")
            })
        })
    },

    //Read
    getUser: (id) => {
        console.log(id);
        return User.findById(id)
        //     , (error, user) => {
        //     if (error) return res.status(400).send("Error in adding user")
        //     if (!user) return res.status(404).json({
        //         message: "404 not found"
        //     })
        //     return res.json(user)
        // })
    },

    //Updata
    editUser: (req, res) => {
        const {
            email,
            nickname,
            password,
            gender,
            id
        } = req.body
        if (!id) return res.status(400).send("User not found")
        User.findByIdAndUpdate(id, {
            email,
            nickname,
            password,
            gender
        }, {
            new: true
        }, (error, user) => {
            if (error) return res.status(400).send(error)
            if (!user) return res.status(404).send("cannot find user")
            return res.json({
                user,
                message: "Information changed"
            })
        })
    },

    //Delete
    deleteUser: (req, res) => {
        const {
            id
        } = req.body
        User.findByIdAndRemove(id, (error, user) => {
            if (error) return res.status(400).send(error)
            if (!user) return res.status(404).send("cannot find user")
            return res.json({
                message: "Goodbye"
            })
        })
    }
}