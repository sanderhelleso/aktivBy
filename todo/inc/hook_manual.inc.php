<?php
	/**
	* Todo - manual
	*
	* @author Mark Peters <skeeter@phpgroupware.org>
	* @copyright Copyright (C) 2001,2005 Free Software Foundation, Inc. http://www.fsf.org/
	* @license http://www.gnu.org/licenses/gpl.html GNU General Public License
	* @package todo
	* @subpackage hooks
	* @version $Id: hook_manual.inc.php 13918 2015-09-15 11:38:01Z sigurdne $
	*/

// Only Modify the $file variable.....
	$file = Array(
		'Add Task'	=> 'add.php',
		'Options'	=> 'other.php'
	);
// Do not modify below this line
	display_manual_section($appname,$file);
