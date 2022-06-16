const Response = require("../Network/response");
const {User} = require("../Models");
const {ErrorCustom, hashPassword} = require("../Utils");

const getUsers = async (req, res, next) => {
  try {
    const {skip = 0, limit = 5} = req.query;
    const query = {state: true};
    const [totalRecords, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query).skip(Number(skip)).limit(Number(limit)),
    ]);
    Response.succes(req, res, {totalRecords, users}, 200);
  } catch (error) {
    next(error);
  }
};

const saveUser = async (req, res, next) => {
  const {name, email, password, role, image} = req.body;
  const user = new User({name, email, password, role, image});
  try { 
    user.password = await hashPassword(password);
    const userSaved = await user.save();
    Response.succes(req, res, {user: userSaved}, 201);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const {id} = req.params;
  const {_id, password, email, google, ...update} = req.body;
  try {
    if (password) {
      data.password = await hashPassword(password);
    }
    const userUpdated = await User.findByIdAndUpdate(id, update, {new: true});
    Response.succes(req, res, {user: userUpdated}, 200);
  } catch (error) {
    next(error);
  }
};

const activatedUser = async (req, res, next) => {
  try {
    const {id} = req.params;
    const query = {_id: id, state: false};
    const user = await User.findOne(query);
    if (!user) throw new ErrorCustom("User not found", 404);
    const userActive = await User.findByIdAndUpdate(
      user.id,
      {state: true},
      {new: true}
    );
    Response.succes(req, res, userActive, 200);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const {id} = req.params;
  const userLogged = req.userAuth;
  /* se cambia el estado para mantener 
  la integridad referencial en la db*/
  try {
    const userDeleted = await User.findByIdAndUpdate(
      id,
      {state: false},
      {new: true}
    );
    Response.succes(req, res, {user: userDeleted, userLogged}, 200);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getUsers,
  saveUser,
  updateUser,
  activatedUser,
  deleteUser,
};
