const express = require("express");
const Tutorial = require("../controllers/tutorialcontroller.js");
const tutorialvalidator = require("../validator/valid");
const router = express.Router();
const { validate } = require("express-validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/tutorialmodel");
const Joi = require("@hapi/joi");
//const verify = require("../middlewares/validateToken.js");



/**
 * @swagger
 * components:
 *   schemas:
 *     Tutorial:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - published
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id
 *         title:
 *           type: string
 *           minlength: 1
 *           maxlength: 100
 *           description: Tutorial title
 *         description:
 *           type: string
 *           minlength: 3
 *           maxlength: 5000
 *           description: Description of the tutorial
 *       example:
 *         id: 1
 *         title: Nodejs
 *         description: Tutorial of node js
 *         published: true
 *         createdAt: 2022-01-05T15:42:14.654Z
 *         updatedAt: 2022-01-05T15:42:14.654Z
 */

/**
 * @swagger
 * tags:
 *   name: Tutorials
 *   description: The Tutorials API
 */

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new tutorial
 *     tags: [Tutorials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tutorial'
 *     responses:
 *       200:
 *         description: Tutorial created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tutorial'
 *       500:
 *         description: Server error
 */

router.post("/create", Tutorial.create);


/**
 * @swagger
 * /tutorials/{id}:
 *  put:
 *    summary: Update the tutorial by id
 *    tags: [Tutorials]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The tutorial id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Tutorial'
 *    responses:
 *      200:
 *        description: Tutorial is updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Tutorial'
 *      404:
 *        description: Tutorial not found
 *      500:
 *        description: Some error happened
 */

router.put("/tutorials/:id", Tutorial.update);


/**
 * @swagger
 * /tutorials/{id}:
 *   delete:
 *     summary: Delete Tutorial by id
 *     tags: [Tutorials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Tutorial id
 *
 *     responses:
 *       200:
 *         description: Tutorial is deleted
 *       404:
 *         description: Tutorial not found
 */

router.delete("/tutorials/:id", Tutorial.delete);


/**
 * @swagger
 * /get-all:
 *   get:
 *     summary: Get list of the tutorials
 *     tags: [Tutorials]
 *     responses:
 *       200:
 *         description: The list of the tutorials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tutorial'
 */

router.get("/get-all", Tutorial.getTutorial);

/**
 * @swagger
 * /tutorials/{id}:
 *   get:
 *     summary: Get tutorial by id
 *     tags: [Tutorials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tutorial id
 *     responses:
 *       200:
 *         description: The tutorial description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tutorial'
 *       404:
 *         description: The tutorial was not found
 */

router.get("/tutorials/:id", Tutorial.findOne);

/**
 * @swagger
 * /title:
 *   get:
 *     tags: [Tutorials]
 *     summary: Search tutorials by title
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: The tutorial title
 *     responses:
 *       200:
 *         description: The tutorial description by Title
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tutorial'
 *       404:
 *         description: The tutorial was not found
 */

router.get("/title", Tutorial.findTutorial);

/**
 * @swagger
 * /sorting/sort:
 *   get:
 *     summary: Get list of the tutorials
 *     tags: [Tutorials]
 *     responses:
 *       200:
 *         description: The list of the tutorials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tutorial'
 */

router.get("/sorting/sort", Tutorial.getsortTutorial);

module.exports = router;
