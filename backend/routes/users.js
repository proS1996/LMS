/**
 * @swagger
 * /users:
 *   post:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Aakash soni"
 *                   email:
 *                     type: string
 *                     example: "asoni1940@gmail.com"
 *                   branchId:
 *                     type: string
 *                     example: "123123sfdfsdf23123"
 * 
 */

const express = require("express");
const {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Create User (C - Create)
router.route("/users").post(createUser);

// Get User by ID (R - Read)
router.route("/users/:id").get(getUserById);

// Update User by ID (U - Update)
router.route("/users/:id").put(updateUser);

// Delete User by ID (D - Delete)
router.route("/users/:id").delete(deleteUser);

module.exports = router;
