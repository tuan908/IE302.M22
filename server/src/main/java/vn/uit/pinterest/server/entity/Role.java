package vn.uit.pinterest.server.entity;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "UserRoleCollection")
public class Role implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = -2839127778756069896L;

	@Id
    public Integer roleId;

    @Field
    public String roleName;

    public Role() {
    };

    public Role(String roleName) {
        this.roleName = roleName;
    }

    public Role(Integer roleId) {
        this.roleId = roleId;
    }

	public String getRoleName() {
		return this.roleName;
	}

}
