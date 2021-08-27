/*
 * @Description: leecode
 * @Version: 1.0
 * @Date: 2021-08-27 16:03:35
 * @LastEditTime: 2021-08-27 16:52:40
 */
function max(nums) {
	let p = 0,
		maxArr = nums[0];
	nums.forEach((v) => {
		p = Math.max(p + v, v);
		maxArr = Math.max(maxArr, p);
	});
	return maxArr;
}
max([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
