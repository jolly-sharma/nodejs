const express = require("express");

  const Tutorial = require("../controllers/tutorialcontroller.js");
  const router = express.Router();



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
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id
 *         title:
 *           type: string
 *           description: Tutorial title
 *         description:
 *           type: string
 *           description: Description of the tutorial
 *       example:
 *         id: 1
 *         title: Nodejs
 *         description: Tutorial of node js
 *         published: true
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
  router.get("/get-all", Tutorial.findAll);



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
 * /tutorials/{title}:
 *   get:
 *     summary: Search tutorials by title
 *     tags: [Tutorials]
 *     parameters:
 *       - in: path
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

  router.get("/tutorial/:title", Tutorial.findAll);

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

  module.exports = router;



