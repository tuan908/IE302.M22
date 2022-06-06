package vn.uit.pinterest.server.entity;

import java.io.Serializable;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "user_role_collection")
public class Role implements Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = -2839127778756069896L;

	@Id
	@Field(name = "rold_id")
	public ObjectId roleId;

	@Field(name = "role_name", targetType = FieldType.STRING)
	public String roleName;

	public Role() {
		super();
	}

	public Role(ObjectId roleId, String roleName) {
		super();
		this.roleId = roleId;
		this.roleName = roleName;

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

}
