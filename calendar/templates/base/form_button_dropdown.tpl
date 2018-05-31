<!-- $Id: form_button_dropdown.tpl 4237 2009-11-27 23:17:21Z sigurd $ -->
  <td width="{form_width}%" align="center" valign="bottom">
   <form action="{form_link}" method="post" name="{form_name}form">
    <b>{title}:</b>
    {hidden_vars}    <select name="{form_name}" onchange="document.{form_name}form.submit()">
     {form_options}    </select>
    <noscript><input type="submit" value="{button_value}"></noscript>
   </form>
  </td>
