/*
 * @Description:lee
 * @Version: 1.0
 * @Date: 2021-09-03 22:38:36
 * @LastEditTime: 2021-09-03 23:19:55
 */
class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val?: number, next?: ListNode | null) {
		this.val = val ?? 0;
		this.next = next ?? null;
	}
}
function getEnd(head: ListNode): ListNode {
	if (head.next === null) return head;
	else {
		let ptr = head;
		while (ptr.next !== null) {
			ptr = ptr.next;
		}
		return ptr;
	}
}
function push(head: ListNode, node: ListNode) {
	getEnd(head).next = node;
}
let head = new ListNode(1);
push(head, new ListNode(1));
push(head, new ListNode(2));
push(head, new ListNode(3));
push(head, new ListNode(3));

function deleteDuplicates(h: ListNode | null): ListNode | null {
	function del(node: ListNode) {
		if (node.next === null) return;
		let parent = node,
			current = node.next;
		if (parent.val === current.val) {
			if (current.next !== null) parent.next = current.next;
			else parent.next = null;
		} else {
			parent = parent.next!;
		}
		del(parent);
	}
	del(h!);
	return h;
}

let out = deleteDuplicates(head);
debugger;
