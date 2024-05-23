import mongoose from "mongoose";
import { baseOptions } from "src/shared/schema";

export interface MenuModel extends mongoose.Document {
	name: string;
	path: string;
	hide_in_menu?: boolean;
	keep_alive?: boolean;
	animated?: boolean;
	group_id?: string;
}


const collection = "menu";
const MenuSchema = new mongoose.Schema<MenuModel>({
	name: { type: String, required: [ true, "请输入菜单名称" ], unique: true },
	path: { type: String, required: [ true, "请输入菜单访问路径" ] },
	group_id: { type: String, required: false },
	hide_in_menu: { type: Boolean, required: false },
	keep_alive: { type: Boolean, required: false },
	animated: { type: Boolean, required: false },
}, {
	collection,
	...baseOptions
});

const Menu = mongoose.models.Menu as mongoose.Model<MenuModel> || mongoose.model<MenuModel>(collection, MenuSchema);
export default Menu;