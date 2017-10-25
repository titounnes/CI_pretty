<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once '/var/app/lib/tcpdf/tcpdf.php';

class Mypdf extends TCPDF {

	public function __construct()
	{
		parent::__construct();
	}

	public function Header()
	{
		$header=$this->getHeaderData();
		$this->SetFont('times','N',11);
		$this->writeHTML($header['string']);
	}

	public function Footer()
	{
		$this->SetY(-15);
		$this->SetFont('helvetica','N',11);
		$this->Cell(0,10,$this->getAliasNumPage(),0,false,'R',0,'',0,false,'T','M');
	}
}