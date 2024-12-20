import mongoose, { Model } from "mongoose";
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
  isDeleted?: boolean;
  /**
   * 是否在菜单中隐藏
   */
  hideInMenu?: boolean;
  /**
   * 排序
   */
  order?: number;
  keepAlive?: boolean;
  animated?: boolean;
  parentId?: mongoose.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
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
          // eslint-disable-next-line no-invalid-this
          return this.type === "item";
        },
        "路径是必填项",
      ],
    },
    name: { type: String, required: [true, "分组名称是必填项"], unique: true },
    hideInMenu: { type: Boolean, required: false, default: false },
    isDeleted: { type: Boolean, required: false, default: false },
    keepAlive: { type: Boolean, required: false, default: true },
    animated: { type: Boolean, required: false, default: true },
    order: { type: Number, required: false, default: 0 },
    parentId: { type: mongoose.Schema.ObjectId, ref: "Menu" },
  },
  {
    collection,
    ...baseOptions,
  },
);

const Menu =
  (mongoose.models.Menu as Model<MenuModel>) || mongoose.model<MenuModel>(collection, MenuSchema);

export default Menu;
