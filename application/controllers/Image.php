<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Image extends CI_Controller {

	function read($image='')
	{
		$url = explode('.', $image);
		$img = imagecreatefrompng(IMAGES . $url[0]);
		header('Content-Type: image/png');
		imagepng($img);
		imagedestroy($img);
	}

	function profile($id='')
	{
		$url = explode('.', $id);
		$path = IMAGES . 'profile/'.$url[0];
		if(file_exists($path)){
			$img = imagecreatefrompng($path);
		}
		else
		{
			$img = imagecreatefrompng(IMAGES . 'profile/default');
		}
		header('Content-Type: image/png');
		imagepng($img);
		imagedestroy($img);
	}

	function info()
	{
		$dh = opendir(IMAGES);
		$files = [];
		while (($file = readdir($dh)) !== false)
		{
			if(strlen($file)==32)
			{
				if(filemtime(IMAGES . $file) > strtotime('-1 weeks'))
				{
					$files[] = [
						'name' => $file,
						'mtime' => date('Y-m-d H::i:s',filemtime(IMAGES . $file)),
						'atime' => date('Y-m-d H::i:s',fileatime(IMAGES . $file)),
						'ctime' => date('Y-m-d H::i:s',filectime(IMAGES . $file)),
					];
				}
			}
		}
		p/rint_r($files);
	}
}
