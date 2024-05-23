import mongoose from "mongoose";
import { baseOptions } from "src/shared/schema";

export interface MenuGroupModel extends mongoose.Document {
	group_name: string;
	hide_in_menu: boolean;
	keep_alive: boolean;
	animated: boolean;
}

const collection = "menu_group";

const MenuGroupSchema = new mongoose.Schema<MenuGroupModel>({
	group_name: { type: String, required: true },
	hide_in_menu: { type: Boolean, required: true },
	keep_alive: { type: Boolean, required: true },
	animated: { type: Boolean, required: true },
}, {
	collection,
	...baseOptions
});

const MenuGroup = mongoose.models.MenuGroup || mongoose.model<MenuGroupModel>(collection, MenuGroupSchema);
export default MenuGroup;