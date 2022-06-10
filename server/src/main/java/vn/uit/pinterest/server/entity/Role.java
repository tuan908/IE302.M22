package vn.uit.pinterest.server.entity;

import java.io.Serializable;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import vn.uit.pinterest.server.common.Permissible;
import vn.uit.pinterest.server.common.PermissionEnum;

@Document(collection = "user_role_collection")
public class Role implements Serializable, Permissible {
	/**
	 *
	 */
	private static final long serialVersionUID = -2839127778756069896L;

	@Id
	@Field(name = "rold_id")
	public ObjectId roleId;

	@Field(name = "role_name", targetType = FieldType.STRING)
	public String roleName;
	private List<PermissionEnum> permissions;

	public Role() {
		super();
	}

	public Role(ObjectId roleId, String roleName, List<PermissionEnum> permissions) {
		super();
		this.roleId = roleId;
		this.roleName = roleName;
		this.permissions = permissions;
	}

	public ObjectId getRoleId() {
		return roleId;
	}

	public void setRoleId(ObjectId roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	@Override
	public List<PermissionEnum> getPermissions() {
		return permissions;
	}

	@Override
	public void setPermissions(List<PermissionEnum> permissions) {
		this.permissions = permissions;
	}

	@Override
	public void addPermission(PermissionEnum permission) {
		this.permissions.add(permission);
	}

	@Override
	public void addPermissions(List<PermissionEnum> permission) {
		this.permissions.addAll(permission);
	}

	@Override
	public boolean hasPermission(PermissionEnum permission) {
		return this.permissions.contains(permission);
	}

}
