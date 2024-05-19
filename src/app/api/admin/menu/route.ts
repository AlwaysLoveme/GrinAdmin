import Menus from "src/app/models/Menus";
import { handleWithDB } from "src/app/api/utils/_routeHandle";

export const GET = handleWithDB(async () => {
	const data = await Menus.find({});
	return {
		data,
	};
});