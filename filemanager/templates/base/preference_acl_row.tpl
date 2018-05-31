<!-- $Id: preference_acl_row.tpl 4237 2009-11-27 23:17:21Z sigurd $ -->
	<tr class="{row_class}">
		<td>{user}</td>
		<td align="center"><input type="checkbox" name="{read}" value="Y"{read_selected}></td>
		<td align="center"><input type="checkbox" name="{add}" value="Y"{add_selected}></td>
		<td align="center"><input type="checkbox" name="{edit}" value="Y"{edit_selected}></td>
		<td align="center"><input type="checkbox" name="{delete}" value="Y"{delete_selected}></td>
		<td align="center"><input type="checkbox" name="{private}" value="Y"{private_selected}></td>
	</tr>
