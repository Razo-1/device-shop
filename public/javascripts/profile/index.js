import { logoutProfile } from "../total/logout/index.js";
import { changePassword } from "./changePassword/index.js";
import { editAvatar } from "./editAvatar/index.js";
import { modelScreen } from "./modelScreen/index.js";
import { removeAvatar } from "./removeAvatar/index.js";
import { backTo } from "./backTo/index.js";


changePassword();
logoutProfile();
modelScreen();
editAvatar();
removeAvatar();
backTo();