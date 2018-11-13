const router = require("express").Router()
const {addUser,getUser,editUser,deleteUser} = require("../controllers/userController")

router.get("/user",getUser)
router.post("/user",addUser)
router.put("/user",editUser)
router.delete("/user",deleteUser)

module.exports = router