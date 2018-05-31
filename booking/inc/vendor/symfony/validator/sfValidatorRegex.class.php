<?php
	/*
	 * This file is part of the symfony package.
	 * (c) Fabien Potencier <fabien.potencier@symfony-project.com>
	 *
	 * For the full copyright and license information, please view the LICENSE
	 * file that was distributed with this source code.
	 */

	/**
	 * sfValidatorRegex validates a value with a regular expression.
	 *
	 * @package    symfony
	 * @subpackage validator
	 * @author     Fabien Potencier <fabien.potencier@symfony-project.com>
	 * @version    SVN: $Id: sfValidatorRegex.class.php 14728 2016-02-11 22:28:46Z sigurdne $
	 */
	class sfValidatorRegex extends sfValidatorString
	{

		/**
		 * Configures the current validator.
		 *
		 * Available options:
		 *
		 *  * pattern: A regex pattern compatible with PCRE (required)
		 *
		 * @param array $options   An array of options
		 * @param array $messages  An array of error messages
		 *
		 * @see sfValidatorString
		 */
		protected function configure( $options = array(), $messages = array() )
		{
			parent::configure($options, $messages);

			$this->addRequiredOption('pattern');
		}

		/**
		 * @see sfValidatorString
		 */
		protected function doClean( $value )
		{
			$clean = parent::doClean($value);

			if (!preg_match($this->getOption('pattern'), $clean))
			{
				throw new sfValidatorError($this, 'invalid', array('value' => $value));
			}

			return $clean;
		}
	}