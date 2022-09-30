const {
  getAllTasks,
  createNewTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/controller");

const router = require("express").Router();

// /**
//  * @description GET ALL THE TASK
//  * @METHOD GET
//  */
// router.get("/", getAllTasks);

// /**
//  * @DESCRIPTION CREATE A NEW TASK
//  * @METHOD POST
//  */
// router.post("/", createNewTask);

// /**
//  * @DESCRIPTION GET A SINGLE TASK
//  * @METHOD GET
//  */
// router.get("/:id", getTask);

// /**
//  * @DESCRIPTION UPDATE A TASK
//  * @METHOD PATCH
//  */
// router.patch("/:id", updateTask);

// /**
//  * @DESCRIPTION DELETE A TASK
//  * @METHOD DELETE
//  */
// router.delete("/:id", deleteTask);

/**
 * @DESCRIPTION Simplified Routing
 */
router.route("/").get(getAllTasks).post(createNewTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
