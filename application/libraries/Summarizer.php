<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Summarizer{

	/**
	 * Array containgin the sentences of a given document
	 * @var array
	 */

	
	/**
	 * the original document
	 * @var string
	 */

	/**
	 * the generated summary of a given document
	 * @var string
	 */
	protected $summary;

	protected $cohesion;

	protected $content;
	
	/**
	 * split a given document to sentcnces
	 * @param string $content
	 * @return array snatences
	 */

	
	private function split_content_to_sentences($content) {
		preg_match_all("/([A-Z]([^`]*?)[.!?][ ])/",rtrim($content).' ',$matches);
        return $matches[0];    
	}

	/**
	 * split given content to paragraphs
	 * @param string $content
	 * @return array paragraphs
	 */
	private function split_content_to_paragraphs() {
		return explode("\n\r", $this->content);
	}

	/**
	 * intersect between two given sentences
	 * @param  string $sent1 sentence one
	 * @param  string $sent2 sentence two
	 * @return float
	 */
	private function sentences_intersection($sent1, $sent2) {

		$s1  = explode(" ",strtolower(substr(rtrim($sent1),0,-1)));
		$s2  = explode(" ",strtolower(substr(rtrim($sent2),0,-1)));
		$cs1 = count($s1);
		$cs2 = count($s2);
		if (($cs1 + $cs2) == 0) {
			return 0;
		}
		return 2 * count(array_intersect($s1,$s2)) / ($cs1+$cs2);
	}

	/**
	 * format a sentence
	 * @param string $sentence
	 * @return string
	 */
	private function format_sentence($sentence) {
		if($sentence == null)
		{
			return false;
		}
		return md5($sentence);
	}

	/**
	 * get the rank for each sentence in the content
	 * @param string $content
	 * @return array
	 */
	private function get_sentences_ranks($paragraf) {
		
		$sentences = array_unique($this->split_content_to_sentences($paragraf));

		$n = count( $sentences );
		
		if($n < 3)
		{
			return false;
		}

		for($i = 0;$i < $n;$i++){
			$values = [];
			for($j = 0;$j < $n;$j++){
				if($i != $j)
				{
					$values[] = $this->sentences_intersection($sentences[$i], $sentences[$j]);
				}
			}

			$sentences_dic[ $this->format_sentence( $sentences[$i] ) ] = array_sum($values); 
		}
		
		return $sentences_dic;
	}

	/**
	 * get the best sentence of one paragraph
	 * @param  string $paragraph
	 * @return string the best sentence
	 */
	public function get_best_sentence($paragraph) {
		$sentences = $this->split_content_to_sentences($paragraph);
		
		if( count($sentences) < 3 ){
			return false;
		}	
		$best_sentence = "";
		$sentences_dic = $this->get_sentences_ranks($paragraph);
		
		$max_value = 0;
		foreach( $sentences as $s){
			$strip_s = $this->format_sentence($s);
			if( $strip_s && isset($sentences_dic[$strip_s])){
				if( $sentences_dic[$strip_s] > $max_value ){
					$max_value = $sentences_dic[$strip_s];
					$best_sentence = $s;
				}
			}
		}

		$pointer = [];
		$pointer[] = $best_sentence;
		$pointer[] = $max_value/count($sentences_dic);
		return $pointer;
	}

	/**
	 * get teh summary of given content or document
	 * @param string 	 * @eturn string the summary
	 */
	public function sumarizing() {

		$paragraphs = array_unique($this->split_content_to_paragraphs());
		
		$summary = array();
		foreach( $paragraphs as $p ){
			$sentence = $this->get_best_sentence($p);
			
			if( $sentence ){
				$this->summary[] = $sentence[0];	
				$this->cohesion[] = $sentence[1];
			}
		}

	}

	public function set_data(string $content)
	{
		$this->content = strip_tags(str_replace("</p>","</p>\n\r",str_replace("&nbsp;"," ", $content)));

		$this->sumarizing();
	}

	public function get_summary()
	{
		return ! is_null($this->summary) ? implode(' ', array_unique($this->summary)) : '';
	}

	public function get_cohesion()
	{
		
		if(count($this->cohesion)==0)
		{
			return 0;
		}
		else
		{
			return array_sum($this->cohesion) / count($this->cohesion);
		}
	}
}
