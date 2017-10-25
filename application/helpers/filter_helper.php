<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('encrypt'))
{
  function encrypt($data='',$mode='r'){
      $CI =& get_instance();
      $CI->load->library('encryption');
      $output = [
        'data' => $data,
        'mode' => $mode,
      ];
      return urlencode(base64_encode($CI->encryption->encrypt(json_encode($output))));
    }
}

if ( ! function_exists('decrypt'))
{
  function decrypt($data=''){
      $CI =& get_instance();
      $CI->load->library('encryption');
      return json_decode($CI->encryption->decrypt(base64_decode( urldecode($data))));
    }
}


if ( ! function_exists('sanitize'))
{
  function sanitize($data){
    /*$data = preg_replace("/data:image\/([^`]*?);/", 'data:image/png;', $data);

    $base64Img = "/base64,([^`]*?)==/";
    preg_match_all($base64Img, $data, $matches);
    $data = preg_replace("/data:image\/png;/",'',$data);

    if(!file_exists(WRITEABLE))
    {
      mkdir(WRITEABLE, 0777);
    }

    foreach($matches[0] as $key => $val)
    {
      $file =  $name.'_'.$key.'.png';
      $handle=fopen(WRITEABLE . $file,'w');
      @fwrite($handle,base64_decode(str_replace('base64,','',$val)));
      fclose($handle);
      $data = str_replace($val, 'uploads/content/' . $file, $data);
    }*/
    $data=preg_replace("/<script([^`]*?)\/script>/", '', $data);
    return $data;
    //return 1;
  }
}

if ( ! function_exists('compress')){
    function compress($input=null,$type=true){
		if($input!=null){
		 	if($type)  return base64_encode(gzcompress($input,9));
					else  {
            if(base64_encode(base64_decode($input)) === $input) {
              return @gzuncompress(@base64_decode($input));
            }
            else
            {
              return $input;
            }
          }

		 }
		 else return false;
	}
}

if ( ! function_exists('hex2dec')){
  function hex2dec($couleur = "#000000"){
    $R = substr($couleur, 1, 2);
    $rouge = hexdec($R);
    $V = substr($couleur, 3, 2);
    $vert = hexdec($V);
    $B = substr($couleur, 5, 2);
    $bleu = hexdec($B);
    $tbl_couleur = array();
    $tbl_couleur['R']=$rouge;
    $tbl_couleur['G']=$vert;
    $tbl_couleur['B']=$bleu;
    return $tbl_couleur;
  }
}

//conversion pixel -> millimeter in 72 dpi
if ( ! function_exists('px2mm')){
  function px2mm($px){
    return $px*25.4/72;
  }
}

if ( ! function_exists('txtentities')){
  function txtentities($html){
    $trans = get_html_translation_table(HTML_ENTITIES);
    $trans = array_flip($trans);
    return strtr($html, $trans);
  }
}