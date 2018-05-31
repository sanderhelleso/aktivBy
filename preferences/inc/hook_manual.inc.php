<?php
	/**
	* Preferences - manual hook
	*
	* @author Mark Peters <skeeter@phpgroupware.org>
	* @copyright Copyright (C) 2000-2005 Free Software Foundation, Inc. http://www.fsf.org/
	* @license http://www.gnu.org/licenses/gpl.html GNU General Public License
	* @package preferences
	* @version $Id: hook_manual.inc.php 690 2008-02-02 10:11:33Z dave $
	*/

// Only Modify the $file variable.....
	$file = Array(
		'Settings'	=> 'settings.php',
		'Other'		=> 'other.php'
	);
//Do not modify below this line
	display_manual_section($appname,$file);
?>
