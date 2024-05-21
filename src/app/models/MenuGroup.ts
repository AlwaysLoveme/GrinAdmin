import { Schema, Document, model, models } from "mongoose";

export interface MenuGroup extends Document {
	group_name: string;
	hide_in_menu: boolean;
	keep_alive: boolean;
	animated: boolean;
}

const collection = "menu_group";

const MenuGroupSchema = new Schema<MenuGroup>({
	group_name: { type: String, required: true },
	hide_in_menu: { type: Boolean, required: true },
	keep_alive: { type: Boolean, required: true },
	animated: { type: Boolean, required: true },
}, {
	collection,
	timestamps: true,
});

const MenuGroup = models.MenuGroup || model<MenuGroup>(collection, MenuGroupSchema);
export default MenuGroup;