/*
 * @Description:根据日期生成文件路径
 * @Version: 1.0
 * @Date: 2021-08-19 15:39:52
 * @LastEditTime: 2021-08-29 00:27:32
 */
import fs = require('fs');
import path = require('path');

export default class UpFile {
	public static getUpDirName() {
		let date: Date = new Date();
		let month: number | string = date.getMonth() + 1;
		month = month.toString().length > 1 ? month : `0${month}`;
		let day = ('0' + date.getDate()).slice(-2);
		let dir = `${date.getFullYear()}${month}${day}`;
		return dir;
	}

	/*
	 *@description 判断文件夹是否存在 不存在则创建
	 *
	 */
	public static checkDirExist(p: fs.PathLike) {
		p = path.join(__dirname, '..', '..', String(p));
		// console.log(p);
		if (!fs.existsSync(p)) {
			fs.mkdirSync(p, { recursive: true });
		}
	}

	public static getUpFileExt(name: string) {
		let filename = name.split('.');
		return filename[filename.length - 1];
	}
	public static getUpFileName(name: string) {
		let filename = name.split('/');
		return filename[filename.length - 1];
	}
}
