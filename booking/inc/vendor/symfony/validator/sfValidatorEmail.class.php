<?php
	/*
	 * This file is part of the symfony package.
	 * (c) Fabien Potencier <fabien.potencier@symfony-project.com>
	 *
	 * For the full copyright and license information, please view the LICENSE
	 * file that was distributed with this source code.
	 */

	/**
	 * sfValidatorEmail validates emails.
	 *
	 * @package    symfony
	 * @subpackage validator
	 * @author     Fabien Potencier <fabien.potencier@symfony-project.com>
	 * @version    SVN: $Id: sfValidatorEmail.class.php 14728 2016-02-11 22:28:46Z sigurdne $
	 */
	class sfValidatorEmail extends sfValidatorRegex
	{

		/**
		 * @see sfValidatorRegex
		 */
		protected function configure( $options = array(), $messages = array() )
		{
			parent::configure($options, $messages);

			$this->setOption('pattern', '/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i');
		}
	}