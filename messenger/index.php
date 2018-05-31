<?php
	/*	 * ************************************************************************\
	 * phpGroupWare - Messenger                                                 *
	 * http://www.phpgroupware.org                                              *
	 * This application written by Joseph Engo <jengo@phpgroupware.org>         *
	 * --------------------------------------------                             *
	 * Funding for this program was provided by http://www.checkwithmom.com     *
	 * --------------------------------------------                             *
	 *  This program is free software; you can redistribute it and/or modify it *
	 *  under the terms of the GNU General Public License as published by the   *
	 *  Free Software Foundation; either version 2 of the License, or (at your  *
	 *  option) any later version.                                              *
	  \************************************************************************* */

	/* $Id: index.php 14728 2016-02-11 22:28:46Z sigurdne $ */

	$GLOBALS['phpgw_info']['flags'] = array(
		'currentapp' => 'messenger',
		'noheader' => True,
		'nonavbar' => True
	);
	include('../header.inc.php');

	$obj = createobject('messenger.uimessenger');
	$obj->inbox();

	$GLOBALS['phpgw']->common->phpgw_footer();
