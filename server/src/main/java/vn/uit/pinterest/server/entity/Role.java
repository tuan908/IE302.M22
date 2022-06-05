package vn.uit.pinterest.server.entity;

import java.io.Serializable;
import java.time.Instant;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "UserRoleCollection")
public class Role implements Serializable {
    /**
     *
     */
    private static final long serialVersionUID = -2839127778756069896L;

    @Id
    public ObjectId roleId;

    @Field
    public String roleName;

    @Field(name = "created_time", targetType = FieldType.DATE_TIME)
    public Instant createdTime;

    public Role() {
    };

    public Role(String roleName) {
        this.roleName = roleName;
    }

    public Role(ObjectId roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return this.roleName;
    }

}
