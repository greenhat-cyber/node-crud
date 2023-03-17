const express = require("express");
const router = express.Router();
const teachers = require("../modals/teacher");

// POST
router.post("/", async (req, res) => {
    console.log("reqqq:", req.body);
    const data = new teachers({
        name: req.body.name,
        age: req.body.age,
        subject: req.body.subject,
        qualification: req.body.qualification,
    });

    try {
        const t1 = await data.save();
        res.send(t1);
    } catch (error) {
        res.send(error);
    }
});

// GET

router.get('/',async(req,res)=>{
    try {
        const teacher = await teachers.find()
        res.send(teacher)
    } catch (error) {
        res.send(error)
    }
})

// Details GET

router.delete('/:id',async(req,res)=>{
    try {
        const teacher = await teachers.findById(req.params.id)
        res.send(teacher)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;
