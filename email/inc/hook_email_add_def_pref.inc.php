<?php
	/**
	* EMail - Preferences hook
	*
	* @copyright Copyright (C) 2003-2005 Free Software Foundation, Inc. http://www.fsf.org/
	* @license http://www.gnu.org/licenses/gpl.html GNU General Public License
	* @package email
	* @subpackage hooks
	* @version $Id: hook_email_add_def_pref.inc.php 13901 2015-09-15 09:41:20Z sigurdne $
	*/

  global $pref;
  $pref->change("email","mainscreen_showmail","True");
  $pref->change("email","use_trash_folder","False");
  $pref->change("email","default_sorting","old_new");
  $pref->change("email","show_addresses","from");
  $pref->change("email","email_sig","");
