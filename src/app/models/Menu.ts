import { Schema, Document, model, models } from "mongoose";

export interface Menu extends Document {
	name: string;
	path: string;
	hide_in_menu?: boolean;
	keep_alive?: boolean;
	animated?: boolean;
	group_id?: string;
}

const MenuSchema = new Schema<Menu>({
	name: { type: String, required: [ true, "请输入菜单名称" ], },
	path: { type: String, required: [ true, "请输入菜单访问路径" ] },
	group_id: { type: String, required: false },
	hide_in_menu: { type: Boolean, required: false },
	keep_alive: { type: Boolean, required: false },
	animated: { type: Boolean, required: false },
}, {
	timestamps: true,
});

const collectionName = "menu";
const Menu = models.Menu || model<Menu>(collectionName, MenuSchema);
export default Menu;