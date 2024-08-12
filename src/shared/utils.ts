import dayjs from "dayjs";
import { cloneDeep as lodashClone } from "lodash-es";

export const cloneDeep = <T>(data: T) => lodashClone(data);

/**
 * 去除对象中键值为 null, undefined, 同时去除字符串首尾所有空格
 */
export const nonNullableObject = <T extends IObject>(record: T): T => {
	if (!record) return {} as T;
	const cloneObject = cloneDeep(record);
	const handleObject = <P>(value: P): P => {
		if (typeof value === "string") {
			// 去除首尾空格
			return value.trim() as P;
		}
		if (Array.isArray(value)) {
			return value.map(handleObject).filter((i) => i !== null && i !== undefined && i !== "") as P;
		}
		if (value !== null && typeof value === "object") {
			return Object.entries(value).reduce((acc, [ key, value ]) => {
				const cleanedValue = handleObject(value);
				if (
					cleanedValue !== null &&
					cleanedValue !== undefined &&
					cleanedValue !== "" &&
					JSON.stringify(cleanedValue) !== "{}" &&
					JSON.stringify(cleanedValue) !== "[]"
				) {
					acc[key] = cleanedValue;
				}
				return acc;
			}, {} as IObject) as P;
		}
		return value;
	};
	return handleObject(cloneObject);
};

export const dateTimeFormat = (date: dayjs.Dayjs | string | Date | number) => {
	return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}