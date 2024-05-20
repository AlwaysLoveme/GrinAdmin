import MenuGroup from "src/app/models/MenuGroup";
import { handleWithDB } from "src/app/api/utils/_routeHandle";

export const GET = handleWithDB(async () => {
	const data = await MenuGroup.find({});
	return {
		data,
	};
});