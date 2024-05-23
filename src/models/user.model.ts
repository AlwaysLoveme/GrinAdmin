import mongoose from "mongoose";
import { baseOptions } from "src/shared/schema";

export interface UserModel extends mongoose.Document {
	account: string;
	password: string;
	roles?: string[];
}

const collection = "user";
const UserSchema = new mongoose.Schema<UserModel>({
	account: { type: String, required: [ true, "请输入账号" ] },
	password: { type: String, required: [ true, "请输入密码" ] },
	roles: {
		type: mongoose.Types.Array,
		default: []
	}
}, {
	collection,
	...baseOptions
});

const User = mongoose.models.User as mongoose.Model<UserModel> || mongoose.model<UserModel>(collection, UserSchema);
export default User;