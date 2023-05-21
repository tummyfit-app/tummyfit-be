import { Request, Response, Router } from "express";
import { Controller } from "../../interfaces/Controller";
import IUserService from "../../services/User/IUserService";
import authorizationMiddleware, {
  CustomRequest,
} from "../../middlewares/AuthorizationMiddleware";

class UserController implements Controller {
  router: Router = Router();
  path: string = "/v1/users";

  constructor(private userService: IUserService) {
    this.initialRouting();
  }

  initialRouting() {
    this.router.get(
      `${this.path}/`,
      authorizationMiddleware,
      this.findUser.bind(this)
    );
  }

  async findUser(req: Request, response: Response) {
    //Harus diubah ID nya berdasarkan inputan user
    const user = (req as CustomRequest).user;
    const result = await this.userService.findUser(user.id);
    response.json({
      status: "success",
      data: {
        UserDescription: result,
      },
    });
  }
}

export default UserController;
