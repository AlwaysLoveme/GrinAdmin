import mongoose from "mongoose";
import { baseOptions } from "src/shared/schema";

const typeEnums = ["group", "item", "submenu", "divider"] as const;

export interface MenuModel extends mongoose.Document {
  type: (typeof typeEnums)[number];
  /**
   * 路径
   */
  path?: string;
  /**
   * 分组名称
   */
  name: string;
  /**
   * 是否删除
   */
  is_deleted?: boolean;
  /**
   * 是否在菜单中隐藏
   */
  hide_in_menu?: boolean;
  /**
   * 排序
   */
  order?: number;
  keep_alive?: boolean;
  animated?: boolean;
  parent_id?: mongoose.Types.ObjectId;
  children?: MenuModel[];
}

const collection = "menu";

const MenuSchema = new mongoose.Schema<MenuModel>(
  {
    type: {
      type: String,
      required: [true, "类型是必填项"],
      enum: {
        values: typeEnums,
        message: "类型值{VALUE}是非法的",
      },
    },
    path: {
      type: String,
      required: [
        function () {
          return this.type === "item";
        },
        "路径是必填项",
      ],
    },
    name: { type: String, required: [true, "分组名称是必填项"], unique: true },
    hide_in_menu: { type: Boolean, required: false },
    is_deleted: { type: Boolean, required: false },
    keep_alive: { type: Boolean, required: false },
    animated: { type: Boolean, required: false },
    order: { type: Number, required: false, default: 0 },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
  },
  {
    collection,
    ...baseOptions,
  },
);

const Menu = mongoose.models.Menu || mongoose.model<MenuModel>(collection, MenuSchema);

export default Menu;
