<!-- $Id: delete.tpl 4237 2009-11-27 23:17:21Z sigurd $ -->
<center>
<table border="0" with="65%">
<form method="POST" action="{actionurl}">
	<tr colspan="2">
		<td align="center">{deleteheader}</td>
	</tr>
	<tr>
		<td align="center">{lang_subs}</td>
		<td align="center">{subs}</td>
	</tr>
	<tr>
		<td>
			<input type="submit" name="confirm" value="{lang_yes}"></form>
		</td>
		<td>
			<a href="{nolink}">{lang_no}</a>
		</td>
	</tr>
</table>
</center>
