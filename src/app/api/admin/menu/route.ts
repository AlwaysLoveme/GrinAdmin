import Menu from "src/app/models/Menu";
import { handleWithDB } from "src/app/api/utils/_routeHandle";

export const GET = handleWithDB(async () => {
	const data = await Menu.find({});
	return {
		data,
	};
});

export const POST = handleWithDB(async (req) => {
	const body = await req.json();
	console.log(body);
	const data = await Menu.create(body);
	return {
		data
	};
});