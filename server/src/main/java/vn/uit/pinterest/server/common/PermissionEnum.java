package vn.uit.pinterest.server.common;

public enum PermissionEnum {
	
	USER_COMMENT_ADD("user.comment.add"),
	USER_COMMENT_EDIT("user.comment.edit"),
	USER_COMMENT_REMOVE("user.comment.remove"),
	USER_SEARCH("user.search"),
	USER_LOGIN("user.login"),
	USER_LOGOUT("user.logout"),
	
	ADMIN_COMMENT_ADD("admin.comment.add"),
	ADMIN_COMMENT_EDIT("admin.comment.edit"),
	ADMIN_COMMENT_REMOVE("admin.comment.remove"),
	;

	private String name;

	/**
	 * An enum set name for a specific permission.
	 *
	 * @param name permission name
	 */
	PermissionEnum(final String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return this.name;
	}
	
}
