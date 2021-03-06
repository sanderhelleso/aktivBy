<?php
	/**
	 * phpGroupWare
	 *
	 * @author Sigurd Nes <sigurdne@online.no>
	 * @copyright Copyright (C) 2009 Free Software Foundation, Inc. http://www.fsf.org/
	 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License
	 * @internal Development of this application was funded by http://www.bergen.kommune.no/bbb_/ekstern/
	 * @package phpgroupware
	 * @subpackage communication
	 * @category core
	 * @version $Id: SMSGatewayService.php 14728 2016-02-11 22:28:46Z sigurdne $
	 */
	/*
	  This program is free software: you can redistribute it and/or modify
	  it under the terms of the GNU General Public License as published by
	  the Free Software Foundation, either version 2 of the License, or
	  (at your option) any later version.

	  This program is distributed in the hope that it will be useful,
	  but WITHOUT ANY WARRANTY; without even the implied warranty of
	  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	  GNU General Public License for more details.

	  You should have received a copy of the GNU General Public License
	  along with this program.  If not, see <http://www.gnu.org/licenses/>.
	 */

	/**
	 * soap client for carrot SMS service
	 * this code is generated by the http://code.google.com/p/wsdl2php-interpreter/ 
	 *
	 * @package phpgroupware
	 * @subpackage sms
	 */

	/**
	 * sendMTMessage
	 */
	class sendMTMessage
	{

		/**
		 * @access public
		 * @var SendSMSRequest
		 */
		public $mtreq;

	}

	/**
	 * Recipient
	 */
	class Recipient
	{

		/**
		 * @access public
		 * @var string
		 */
		public $recipient;

	}

	/**
	 * SendSMSRequest
	 */
	class SendSMSRequest
	{

		/**
		 * @access public
		 * @var string
		 */
		public $DCS;

		/**
		 * @access public
		 * @var string
		 */
		public $DSTPort;

		/**
		 * @access public
		 * @var boolean
		 */
		public $RSR;

		/**
		 * @access public
		 * @var string
		 */
		public $SRCport;

		/**
		 * @access public
		 * @var integer
		 */
		public $TTL;

		/**
		 * @access public
		 * @var string
		 */
		public $UDH;

		/**
		 * @access public
		 * @var string
		 */
		public $URI;

		/**
		 * @access public
		 * @var string
		 */
		public $address;

		/**
		 * @access public
		 * @var integer
		 */
		public $appid;

		/**
		 * @access public
		 * @var string
		 */
		public $content;

		/**
		 * @access public
		 * @var string
		 */
		public $differentiator;

		/**
		 * @access public
		 * @var string
		 */
		public $originator;

		/**
		 * @access public
		 * @var integer
		 */
		public $originatorType;

		/**
		 * @access public
		 * @var string
		 */
		public $password;

		/**
		 * @access public
		 * @var string
		 */
		public $price;

		/**
		 * @access public
		 * @var integer
		 */
		public $priority;

		/**
		 * @access public
		 * @var ArrayOfRecipient
		 */
		public $recipients;

		/**
		 * @access public
		 * @var integer
		 */
		public $serviceId;

		/**
		 * @access public
		 * @var string
		 */
		public $serviceName;

		/**
		 * @access public
		 * @var integer
		 */
		public $type;

		/**
		 * @access public
		 * @var string
		 */
		public $username;

	}

	/**
	 * sendMTMessageResponse
	 */
	class sendMTMessageResponse
	{

		/**
		 * @access public
		 * @var SendSMSResponse[]
		 */
		public $sendMTMessageReturn;

	}

	/**
	 * SendSMSResponse
	 */
	class SendSMSResponse
	{

		/**
		 * @access public
		 * @var string
		 */
		public $messageid;

		/**
		 * @access public
		 * @var string
		 */
		public $recipient;

		/**
		 * @access public
		 * @var string
		 */
		public $statuscode;

		/**
		 * @access public
		 * @var string
		 */
		public $statusmessage;

	}

	/**
	 * SMSGatewayService
	 * @author WSDLInterpreter
	 */
	class SMSGatewayService extends SoapClient
	{

		/**
		 * Default class map for wsdl=>php
		 * @access private
		 * @var array
		 */
		private static $classmap = array
			(
			"sendMTMessage" => "sendMTMessage",
			"Recipient" => "Recipient",
			"SendSMSRequest" => "SendSMSRequest",
			"sendMTMessageResponse" => "sendMTMessageResponse",
			"SendSMSResponse" => "SendSMSResponse",
		);

		/**
		 * Constructor using wsdl location and options array
		 * @param string $wsdl WSDL location for this service
		 * @param array $options Options for the SoapClient
		 */
		public function __construct( $wsdl = "carrot.wsdl", $options = array() )
		{
			foreach (self::$classmap as $wsdlClassName => $phpClassName)
			{
				if (!isset($options['classmap'][$wsdlClassName]))
				{
					$options['classmap'][$wsdlClassName] = $phpClassName;
				}
			}
			parent::__construct($wsdl, $options);
		}

		/**
		 * Checks if an argument list matches against a valid argument type list
		 * @param array $arguments The argument list to check
		 * @param array $validParameters A list of valid argument types
		 * @return boolean true if arguments match against validParameters
		 * @throws Exception invalid function signature message
		 */
		public function _checkArguments( $arguments, $validParameters )
		{
			$variables = "";
			foreach ($arguments as $arg)
			{
				$type = gettype($arg);

				if ($type == "object")
				{
					$type = get_class($arg);
				}
				$variables .= "(" . $type . ")";
			}
			if (!in_array($variables, $validParameters))
			{
				throw new Exception("Invalid parameter types: " . str_replace(")(", ", ", $variables));
			}
			return true;
		}

		/**
		 * Service Call: sendMTMessage
		 * Parameter options:
		 * (sendMTMessage) parameters
		 * @param mixed,... See function description for parameter options
		 * @return sendMTMessageResponse
		 * @throws Exception invalid function signature message
		 */
		public function sendMTMessage( $mixed = null )
		{
			$validParameters = array
				(
				"(sendMTMessage)"
			);
			$args = func_get_args();

			$this->_checkArguments($args, $validParameters);
			return $this->__soapCall("sendMTMessage", $args);
		}
	}