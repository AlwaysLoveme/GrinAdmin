import { Schema, Document,model, models } from "mongoose";

export interface Menu extends Document {
	id: string;
	name: string;
	path: string;
	hide_in_menu: boolean;
	keep_alive: boolean;
	animated: boolean;
}

const MenuSchema = new Schema<Menu>({
	id: { type: String, required: true },
	name: { type: String, required: true },
	path: { type: String, required: true },
	hide_in_menu: { type: Boolean, required: true },
	keep_alive: { type: Boolean, required: true },
	animated: { type: Boolean, required: true },
});

export default models.Menu || model<Menu>("menus", MenuSchema);