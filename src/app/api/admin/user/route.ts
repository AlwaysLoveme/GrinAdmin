import User from "src/models/user.model";
import { handleWithDB } from "src/app/api/utils/_routeHandle";

export const GET = handleWithDB(async () => {
  const data = await User.find({});
  return {
    data,
  };
});
