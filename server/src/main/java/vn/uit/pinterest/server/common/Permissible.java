package vn.uit.pinterest.server.common;

import java.util.List;

public interface Permissible {
	public List<PermissionEnum> getPermissions();

	public void setPermissions(List<PermissionEnum> permissions);

	public void addPermission(PermissionEnum permission);

	public void addPermissions(List<PermissionEnum> permissions);
	
	public boolean hasPermission(PermissionEnum permission);
	
	
}
