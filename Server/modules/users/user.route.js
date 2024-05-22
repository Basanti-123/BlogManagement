const router = require("express").Router();
const userController = require("./user.controller");
const toUpperCase = require("proper-upper-case");
const { checkRole } = require("../../utils/sessionManager");
const {
  validate,
  resetValidation,
  loginValidatation,
  userValidation,
} = require("./user.validator");

const { token } = require("morgan");

router.get("/", checkRole(["admin"]), async (req, res, next) => {
  try {
    // user search, filter,limit
    const { limit, page, name, role } = req.query;
    const search = { name, role };
    const result = await userController.list(search, page, limit);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/", validate, checkRole(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.create(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.patch(
  "/reset-Password",
  resetValidation,
  checkRole(["admin"]),
  async (req, res, next) => {
    try {
      const result = await userController.resetPassword(req.body);
      res.json({ data: result });
    } catch (e) {
      next(e);
    }
  }
);

// router.post("/register", validate, async (req, res, next) => {
//   try {
//     delete req.body.roles;
//     const result = await userController.register(req.body);
//     res.json({ data: result });
//   } catch (e) {
//     next(e);
//   }
// });

router.post("/register", validate, async (req, res, next) => {
  try {
    delete req.body.roles;
    const { name } = req.body;
      const modifiedName = toUpperCase(name);
      req.body.name = modifiedName;
    const result = await userController.register(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/login", loginValidatation, async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await userController.login(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/generate-fp-token", async (req, res, next) => {
  try {
    const result = await userController.generateFPToken(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/verify-fp-token", async (req, res, next) => {
  try {
    const result = await userController.verifyFPToken(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.patch(
  "/change-Password",
  checkRole(["user"]),
  async (req, res, next) => {
    try {
      const result = await userController.changePassword(req.body);
      res.json({ data: result });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/get-profile", checkRole(["user"]), async (req, res, next) => {
  try {
    const userId = req.body.userId;
    if (!userId) throw new Error("User ID is required");
    const result = await userController.getProfile(userId);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.put(
  "/update-profile",
  userValidation,
  checkRole(["user"]),
  async (req, res, next) => {
    try {
      const { userId, ...rest } = req.body;
      if (!userId) throw new Error("User Id is required");
      const result = await userController.updateProfile(userId, rest);
      res.json({ data: result });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/:id", checkRole(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.updateById(req.params.id, req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.put(
  "/:id",
  userValidation,
  checkRole(["admin"]),
  async (req, res, next) => {
    try {
      const result = await userController.updateById(req.params.id);
      res.json({ data: result });
    } catch (e) {
      next(e);
    }
  }
);

router.delete("/:id", checkRole(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.removeById(req.params.id);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
