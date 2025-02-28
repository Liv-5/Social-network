import { Router } from "express";
const router = Router();
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction,
} from "../../controllers/thoughtController.js";

// /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

//  /api/thoughts/:thoughtId/reactions

router
  .route(":thoughtId/reactions")
  .post(createReaction)
  .delete(removeReaction);

export { router as thoughtRouter };
