const { Router } = require("express");
const { where } = require("sequelize");
const router = Router();
const { User, Course } = require("../db");

router.put("/:email", async (req, res) => {
    try {
        let userEmail = req.params.email;
        let {newPassword} = req.body;
        let response = await User.update({password: newPassword}, {
            where: {
                email: userEmail
            }})
        res.status(200).send("password modified")
    } catch (error) {
        res.status(401).send(error.message)
    }
})

module.exports = router;