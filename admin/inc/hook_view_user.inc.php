<?php
	/**************************************************************************\
	* phpGroupWare - Administration                                            *
	* http://www.phpgroupware.org                                              *
	* --------------------------------------------                             *
	*  This program is free software; you can redistribute it and/or modify it *
	*  under the terms of the GNU General Public License as published by the   *
	*  Free Software Foundation; either version 2 of the License, or (at your  *
	*  option) any later version.                                              *
	\**************************************************************************/

	/* $Id: hook_view_user.inc.php 690 2008-02-02 10:11:33Z dave $ */

	$GLOBALS['menuData'][] = array(
		'description' => 'Login History',
		'url'         => '/index.php',
		'extradata'   => array('menuaction' => 'admin.uiaccess_history.list_history')
	);

	$GLOBALS['menuData'][] = array(
		'description' => 'ACL Rights',
		'url'         => '/index.php',
		'extradata'   => array('menuaction' => 'admin.uiaclmanager.list_apps')
	);
?>
