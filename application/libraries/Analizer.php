<?php defined('BASEPATH') OR exit('No direct script access allowed'); 

class Analizer{

	/*
	screen command
	while:
	do php index.php Analize calculate
	done
	*/
	/*
	kill
	*/
	
	function __construct()
	{
		$this->CI =& get_instance();
		$this->CI->load->database();
		$this->CI->load->library(['summarizer']);
	}
	
	function checkQueue()
	{
		return $this->CI->db
			->select('name,id,id2')
			->from('queues')
			->where('status',1)
			->order_by('time asc')
			->limit(1)
			->get()
			->row();
	}
	
	function updateQueue($where)
	{
		$this->CI->db->update('queues', ['status'=>2] ,$where);
	}

	function cekLog($where)
	{
	
		$q = $this->CI->db->from('log_product')->where($where)->limit(1)->order_by('date_log desc')->get()->row();
		return $q ? $q->date_log : false;
	}

	function updateLog($field, $where)
	{
		$this->CI->db->update('log_product', $field, $where);
	}
	
	function calculate()
	{		
		$consistency = 0;
		$cohesion = 0;
		$data = $this->checkQueue();
		if($data ==null)
		{
			echo 0;
			return false;
		}

		$where = [
			'project_id' => $data->id,
			'user_id' => $data->id2,
		];
		
		$wq = [
				'name' => $data->name,
				'id' => $data->id,
				'id2' => $data->id2,
		];

		$dir = DATA .$data->name .'/';
		
		if($data->name == 'summaries')
		{
			$summary = false;
			$path = DATA .'summaries/' . $data->id.'-'.$data->id2 . '.dat';
			if(file_exists($path))
			{
				$file = fopen($path, 'r');
				$size = filesize($path);
				$summary = gzuncompress(fread($file, $size));
				fclose($file);
			}
			
			$summary_ref = false;
			$path = DATA .'summaries/' . $data->id.'-'.$data->id2 . '.ref';
			if(file_exists($path))
			{
				$file = fopen($path, 'r');
				$size = filesize($path);
				$summary_ref= str_replace('&nbsp;',' ',strip_tags(gzuncompress(fread($file, $size))));
				fclose($file);
			}

			if($summary != false && $summary_ref != false)
			{
				similar_text($summary_ref, $summary, $consistency);
				$field['consistency'] = $consistency;
					
				$where['date_log'] = $this->cekLog($where);
			
				if($where['date_log'])
				{
					$this->updateLog($field, $where);		
				}
				
				$wq = [
						'name' => $data->name,
						'id' => $data->id,
						'id2' => $data->id2,
				];
				$this->updateQueue($wq);
			}
		}
		
		/*
		Membaca data sesuai daftar antrian
		*/			
		$feed = DATA .'products/' . $data->id.'-'.$data->id2.'.dat';
		if(file_exists($feed))
		{
			$file = fopen($feed, 'r');
			$size = filesize($feed);
			$text = gzuncompress(fread($file, $size));
			fclose($file);
		}
		/*
		membuat summary
		*/
		if(isset($text))
		{
			$this->CI->summarizer->set_data(strip_tags($text,'<p>'));
			$summary = $this->CI->summarizer->get_summary();
			$cohesion = $this->CI->summarizer->get_cohesion();
		}	
		/*
		menyimpan hasil summary
		*/
		if(isset($summary))
		{
			$path = DATA .'summaries/' . $data->id.'-'.$data->id2 . '.ref';
			$file = fopen($path, 'w');
			fwrite($file, gzcompress($summary));
			fclose($file);
		}
		/*
		menghitung indek konsistesni
		*/
		$path = DATA .'summaries/' . $data->id.'-'.$data->id2 . '.dat';
		$pathSum = $path;
		if(file_exists($path))
		{
			$file = fopen($path, 'r');
			$size = filesize($path);
			$summary_ref= str_replace('&nbsp;',' ',strip_tags(gzuncompress(fread($file, $size))));
			fclose($file);
		}
	
		if(isset($summary_ref) && isset($summary))
		{
			similar_text($summary_ref, $summary, $consistency);
		}
		
		/*
		menghitung nilai indek plagiarusm terbesar
		*/
		
		$path = DATA .'products/';

		$dh = opendir($path);
		$plagiarism=0;
		

		while (($file = readdir($dh)) !== false)
		{
		    if(filetype($path . $file) == 'file')
		    {
			    $id = explode('-',$file);
		    	if($file  != $data->id.'-'.$data->id2.'.dat' && $data->id== $id[0])
		    	{
		    		//if(filesize($path .$file ) > 0.7*$size)
		    		{
		    			$path2 = $path . $file;
		    			$file2 = fopen($path2, 'r');
						$plagiarism = 0;
						$size = filesize($path2);
						$text2 = gzuncompress(fread($file2, $size));
						fclose($file2);
						if(isset($text2) && isset($text))
						{
							similar_text(strtolower(strip_tags($text)), strtolower(strip_tags($text2)), $similar);
		    				$plagiarism = $similar > $plagiarism ? $similar : $plagiarism;
		    			}
		    		}
		    	}
			}
		}
		closedir($dh);
		
		/*menyimpan log e database
		*/
		$field['user_id'] = $data->id2;
		$field['project_id'] = $data->id;
		$field['plagiarism'] = $plagiarism;
		$field['cohesion'] = $cohesion;
		$field['consistency'] = $consistency;
		
		$where['date_log'] = $this->cekLog($where);
		if($where['date_log'])
		{
			$this->updateLog($field, $where);		
		}
		$this->updateQueue($wq);
		return '1';

	}		
}