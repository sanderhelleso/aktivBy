<?php
	/**
	* Setup
	*
	* @copyright Copyright (C) 2000-2005 Free Software Foundation, Inc. http://www.fsf.org/
	* @license http://www.gnu.org/licenses/gpl.html GNU General Public License
	* @package setup
	* @version $Id: applist.php 13377 2015-06-08 07:21:00Z sigurdne $
	*/

	$phpgw_info = array();
	$GLOBALS['phpgw_info']['flags'] = array(
		'noheader' => True,
		'nonavbar' => True,
		'currentapp' => 'home',
		'noapi' => True
	);
	
	/**
	 * Include setup functions
	 */
	include('./inc/functions.inc.php');
	
	/**
	 * Include XML functions
	 */
	include(PHPGW_SERVER_ROOT . 'phpgwapi/inc/xml_functions.inc.php');

	// Check header and authentication
	if (!$GLOBALS['phpgw_setup']->auth('Config'))
	{
		Header('Location: index.php');
		exit;
	}
	// Does not return unless user is authorized

	$tpl_root = $GLOBALS['phpgw_setup']->html->setup_tpl_dir('setup');
	$setup_tpl = CreateObject('phpgwapi.Template',$tpl_root);
	$setup_tpl->set_file(array(
		'T_head'   => 'head.tpl',
		'T_footer' => 'footer.tpl'
	));
	$setup_tpl->set_block('T_footer','footer','footer');

	$host = 'us3.phpgroupware.org';
	$path = '/cvsdemo/xmlrpc.php';

	$GLOBALS['phpgw_setup']->html->show_header(lang('Application List'),True);

	/* Login as demo */
	$login = CreateObject(
		'phpgwapi.xmlrpcmsg',
		'system.login',
		array(
			CreateObject(
				'phpgwapi.xmlrpcval',
				array(
					'domain'   => CreateObject('phpgwapi.xmlrpcval','default','string'),
					'username' => CreateObject('phpgwapi.xmlrpcval','demo','string'),
					'password' => CreateObject('phpgwapi.xmlrpcval','guest','string')
				),
				'struct'
			)
		)
	);
	echo '<pre>' . htmlentities($login->serialize()) . "</pre>\n";

	$c = CreateObject('phpgwapi.xmlrpc_client',$path,$host,80);
	$c->setDebug(1);
	$r = $c->send($login);
	$v = $r->value();
	$result = xmlrpc_decode($v);

	/* Get applist */
	$f = CreateObject('phpgwapi.xmlrpcmsg','system.listApps','');
	echo '<pre>' . htmlentities($f->serialize()) . "</pre>\n";

	$c = CreateObject('phpgwapi.xmlrpc_client',$path,$host,80);
	$c->setDebug(1);
	$c->username = $result['sessionid'];
	$c->password = $result['kp3'];
	$r = $c->send($f);

	/* Logout */
	$logout = CreateObject(
		'phpgwapi.xmlrpcmsg',
		'system.logout',
		array(
			CreateObject(
				'phpgwapi.xmlrpcval',
				array(
					'sessionid' => CreateObject('phpgwapi.xmlrpcval',$result['sessionid'],'string'),
					'kp3'       => CreateObject('phpgwapi.xmlrpcval',$result['kp3'],'string')
				),
				'struct'
			)
		)
	);
	echo '<pre>' . htmlentities($logout->serialize()) . "</pre>\n";

	$c = CreateObject('phpgwapi.xmlrpc_client',$path,$host,80);
	$c->setDebug(1);
	$r = $c->send($logout);
	$v = $r->value();

	$GLOBALS['phpgw_setup']->html->show_footer();