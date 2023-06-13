import authentication from "../middlewares/authentication.js";
import { getRoleData } from "../models/role.js";

const index = async (req, res) => {
  try {
    let roles = await getRoleData();
    res.render('homepage', { roles });
  } catch (error) {
    console.log(error);
  }
};

const home = async (req, res) => {
  try {
    const { access_token } = req.query;

    if (!access_token) {
      res.redirect("/");
    }

    let auth = await authentication(access_token);

    res.render('home', { full_name: auth.name });
  } catch (error) {
    console.log(error);
  }
};

export { index, home };
