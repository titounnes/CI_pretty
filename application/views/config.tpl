&lt;?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class <?php echo $c_name ?> extends CI_Controller {

	public function __construct()
    {
    	parent::__construct();
        $this->load->model('<?php echo $m_name ?>');
    }

    /**
	 * Display a listing of the resource in pagination.
	 *
	 * @return Response
	 */
	public function page($page=0)
	{
		$this->load->library('pagination');
		$this->load->config('pagination');
		$config = $this->config->config;
		$config['base_url'] = site_url('/<?php echo $c_name ?>/page');
		$config['total_rows']= <?php echo $m_name ?>::count();	
	   	$data['title'] = '<?php echo $o_name ?> archive';
		$data['<?php echo $o_name ?>_list'] = <?php echo $m_name ?>::take($config['per_page'])->offset($page)->get();
		
		$this->load->view('templates/header');
		$this->pagination->initialize($config);
		$data['links']=$this->pagination->create_links();
		$this->load->view('<?php echo $o_name ?>/page', $data);
		$this->load->view('templates/footer');
	}

	/**
	 * Display the specified resource in form.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($<?php echo $m_name ?>_id)
    {
    	$this->load->library('form_validation');
		$data['title'] = '<?php echo $o_name ?> archive';
		$<?php echo $o_name ?> = <?php echo $m_name ?>::find($<?php echo $m_name ?>_id);
		//$<?php echo $o_name ?>->item='post item';
		$<?php echo $o_name ?>->save();
		$data['<?php echo $o_name ?>_item'] = <?php echo $m_name ?>::all();
    	$this->load->view('templates/header');
    	$this->load->view('<?php echo $o_name ?>/form', $data);
    	$this->load->view('templates/footer');
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
    {
    	$this->load->library('form_validation');
		$data['title'] = '<?php echo $o_name ?> archive';
		$this->load->view('templates/header');
    	$this->load->view('<?php echo $o_name ?>/form', $data);
    	$this->load->view('templates/footer');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
	   	$this->load->library('form_validation');
		$this->load->helper('form');	
		$data['slug']=$this->input->post('slug');
	   	$data['<?php echo $o_name ?>_item'] = <?php echo $m_name ?>::view_item($slug);
    	//$data['title'] = 'Create a news item';

	   	$this->form_validation->set_rules('title', 'Title', 'required');
	   	$this->form_validation->set_rules('text', 'text', 'required');

	   	if ($this->form_validation->run() === FALSE)
	   	{
			$this->load->view('templates/header');
			$this->load->view('<?php echo $o_name ?>/form', $data);
			$this->load->view('templates/footer');
	    }
	    else
	    {
	    	//$coba =new Coba();
	    	//$slug=
			//$coba->save_item($slug);
			$this->load->view('templates/header');
			$this->load->view('<?php echo $o_name ?>/success', $data);
			$this->load->view('templates/footer');
	    }
	}	


	/**
	 * Mark to trash specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($<?php echo $m_name ?>_id)
	{
	  	<?php echo $m_name ?>::find($<?php echo $m_name ?>_id)->update(array('trash'=>1));
		$data['title'] = '<?php echo $o_name ?> archive';
		$data['<?php echo $o_name ?>_list'] = <?php echo $m_name ?>::all();
	  	$this->load->view('templates/header');
		$this->load->view('<?php echo $o_name ?>/index', $data);
		$this->load->view('templates/footer'); 	
	}	

	/**
	 * Mark to trash specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function restore($<?php echo $m_name ?>_id)
	{
	  	<?php echo $m_name ?>::find($<?php echo $m_name ?>_id)->update(array('trash'=>0));
		$data['title'] = '<?php echo $o_name ?> archive';
		$data['<?php echo $o_name ?>_list'] = <?php echo $m_name ?>::all();
	  	$this->load->view('templates/header');
		$this->load->view('<?php echo $o_name ?>/index', $data);
		$this->load->view('templates/footer'); 	
	}	

	/**
	 * Mark to active specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function activate($<?php echo $m_name ?>_id)
	{
	  	<?php echo $m_name ?>::find($<?php echo $m_name ?>_id)->update(array('active'=>1));
		$data['title'] = '<?php echo $o_name ?> archive';
		$this->load->view('templates/header');
		$data['<?php echo $o_name ?>_list'] = <?php echo $m_name ?>::all();
	  	$this->load->view('<?php echo $o_name ?>/index', $data);
		$this->load->view('templates/footer'); 	
	}	

	/**
	 * Mark to active specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function inactivate($<?php echo $m_name ?>_id)
	{
	  	<?php echo $m_name ?>::find($<?php echo $m_name ?>_id)->update(array('active'=>0));
		$data['title'] = '<?php echo $o_name ?> archive';
		$this->load->view('templates/header');
		$data['<?php echo $o_name ?>_list'] = <?php echo $m_name ?>::all();
	  	$this->load->view('<?php echo $o_name ?>/index', $data);
		$this->load->view('templates/footer'); 	
	}	

	/**
	 * Destroy all trash sign from storage.
	 *
	 * @return Response
	 */
	public function empty_trash()
	{
	  	<?php echo $m_name ?>::where('trash','=','1')->delete();
	  	$data['title'] = '<?php echo $o_name ?> archive';
		$this->load->view('templates/header', $data);
		$data['<?php echo $o_name ?>_list'] = <?php echo $m_name ?>::all();
	  	$this->load->view('<?php echo $o_name ?>/index', $data);
		$this->load->view('templates/footer'); 	
	}	
}

