const express = require('express')
const router = express.Router()
const teachers = require('../modals/teacher')

// POST
/**
 * @swagger
 * /teacher/add:
 *   post:
 *     summary: Add a new teacher.
 *     description: Add a new teacher to the database.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         in: formData
 *         description: Name of the teacher.
 *         required: true
 *         type: string
 *       - name: age
 *         in: formData
 *         description: Age of the teacher.
 *         required: true
 *         type: number
 *       - name: subject
 *         in: formData
 *         description: Subject taught by the teacher.
 *         required: true
 *         type: string
 *       - name: qualification
 *         in: formData
 *         description: Qualification of the teacher.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The new teacher has been added successfully.
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             age:
 *               type: number
 *             subject:
 *               type: string
 *             qualification:
 *               type: string
 *       500:
 *         description: Internal server error.
 */

router.post('/add', async (req, res) => {
  console.log('reqqq:', req.body)
  const data = new teachers({
    name: req.body.name,
    age: req.body.age,
    subject: req.body.subject,
    qualification: req.body.qualification,
  })

  try {
    const t1 = await data.save()
    res.send(t1)
  } catch (error) {
    res.send(error)
  }
})

// GET

/**
 * @swagger
 * /teacher/list:
 *   get:
 *     summary: Retrieve a list of all teachers.
 *     description: Retrieve a list of all teachers from the database.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of teachers.
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               subject:
 *                 type: string
 *               qualification:
 *                 type: string
 */

router.get('/list', async (req, res) => {
  try {
    const teacher = await teachers.find()
    res.send(teacher)
  } catch (error) {
    res.send(error)
  }
})

// Details GET

/**
 * @swagger
 * /teacher/details/{id}:
 *   get:
 *     summary: Retrieve details of a specific teacher.
 *     description: Retrieve details of a specific teacher from the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the teacher record to retrieve details for.
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Details of the requested teacher.
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             age:
 *               type: number
 *             subject:
 *               type: string
 *             qualification:
 *               type: string
 *       404:
 *         description: Teacher record not found.
 */

router.get('/details/:id', async (req, res) => {
  try {
    const teacher = await teachers.findById(req.params.id)
    res.send(teacher)
  } catch (error) {
    res.send(error)
  }
})

//UPDATE
/**
 * @swagger
 * /teacher/update/{id}:
 *   patch:
 *     description: Updates a teacher record.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the teacher record to update.
 *         required: true
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         description: Fields to update for the teacher record.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             age:
 *               type: number
 *             subject:
 *               type: string
 *             qualification:
 *               type: string
 *     responses:
 *       '200':
 *         description: Teacher record updated successfully.
 *       '404':
 *         description: Teacher record not found.
 */

router.patch('/update/:id', async (req, res) => {
  let data = await teachers.updateOne(
    { _id: req.params.id },
    { $set: req.body },
  )
  res.send(data)
})

// DELETE
/**
 * @swagger
 * /teacher/delete/{id}:
 *   delete:
 *     description: Deletes a teacher record.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the teacher record to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Teacher record deleted successfully.
 *       '404':
 *         description: Teacher record not found.
 */
router.delete('/delete/:id', async (req, res) => {
  let data = await teachers.deleteOne(
    { _id: req.params.id },
    { $set: req.body },
  )
  res.send(data)
})

module.exports = router
