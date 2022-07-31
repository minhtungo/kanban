const router = require('express').Router({ mergeParams: true });
const tokenHandler = require('../handlers/tokenHandler');
const taskController = require('../controllers/task');
const validation = require('../handlers/validation');
const { param, body } = require('express-validator');

router.post(
  '/',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid board ID');
    } else return Promise.resolve();
  }),
  body('sectionId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid section ID');
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.create
);

router.put(
  '/update-position',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid board ID');
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.updatePosition
);

router.delete(
  '/:taskId',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid board ID');
    } else return Promise.resolve();
  }),
  param('taskId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid task ID');
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.delete
);

router.put(
  '/:taskId',
  param('boardId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid board ID');
    } else return Promise.resolve();
  }),
  param('taskId').custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('Invalid task ID');
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.update
);

module.exports = router;
