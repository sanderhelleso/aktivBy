<?php
	/**
	* Todo preferences
	*
	* @author Craig Knudsen <cknudsen@radix.net>
	* @author Mark Peters <skeeter@phpgroupware.org>
	* @copyright Copyright (C) Craig Knudsen <cknudsen@radix.net>
	* @copyright Copyright (C) 2002,2005 Free Software Foundation, Inc. http://www.fsf.org/
	* @license http://www.gnu.org/licenses/gpl.html GNU General Public License
	* @package todo
	* @version $Id: class.bopreferences.inc.php 1906 2008-11-28 22:47:27Z sigurd $
	* @internal Based on Webcalendar by Craig Knudsen http://www.radix.net/~cknudsen
	*/


	/**
	* Todo preferences
	*  
	* @package todo
	*/
	class todo_bopreferences
	{
		var $public_functions = Array(
			'preferences'  => True
		);

		var $prefs;
		var $debug = False;

		function __construct()
		{
			$GLOBALS['phpgw']->nextmatchs = CreateObject('phpgwapi.nextmatchs');
			$this->prefs['todo']    = $GLOBALS['phpgw_info']['user']['preferences']['todo'];
		}

		function preferences()
		{
			$submit = get_var('submit',Array('POST'));
			if($submit)
			{
				$GLOBALS['phpgw']->preferences->read();
				$prefs = get_var('prefs',Array('POST'));
				if($prefs['mainscreen_showevents'] == True)
				{
					$GLOBALS['phpgw']->preferences->add('todo','mainscreen_showevents',$prefs['mainscreen_showevents']);
				}
				else
				{
					$GLOBALS['phpgw']->preferences->delete('todo','mainscreen_showevents');
				}

				$GLOBALS['phpgw']->preferences->save_repository(True);

				Header('Location: '.$GLOBALS['phpgw']->link('/preferences/index.php'));
				$GLOBALS['phpgw_info']['flags']['nodisplay'] = True;
				exit;
			}
		}
	}

