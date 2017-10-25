        <div id="container">
            <form id="form-single">
                <?php 
                    $data = array(
                        'type'  => 'hidden',
                        'name'  => $csrf['key'],
                        'id'    => 'csrf',
                        'value' => $csrf['value'],
                    );
                    echo form_input($data)
                ?>
                <ul class="nav nav-tabs">
                    <li class="panel-tab active">
                        <a href="#" class="panel-btn" data-href="panelLogin" title="Register">Log In</a>
                    </li>
                    <li class="panel-tab">
                        <a href="#" class="panel-btn" data-href="panelRegister" title="Register">Sign Up</a>
                    </li>
                    <li class="panel-tab">
                        <a href="#" class="panel-btn" data-href="panelForgot" title="Register">Send Token</a>
                    </li>
                    <li class="panel-tab">
                        <a href="#" class="panel-btn" data-href="panelReset" title="Register">Reset Password</a>
                    </li>
                </ul>
                <div id="panelLogin" class="panel panel-collapse collapse in">
                    <div class="panel-body">
                    	<div class="box-body">
                        	<div class="form-group">
                            	<label for="identity" class="col-sm-4 control-label no-padding-right">Identity</label>
                                <div class="col-sm-8 input-group">
                                    <input name="identity" value="" id="identity" class="form-control" placeholder="ID pengguna / email">
                                    <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                </div>
                            </div>
                            <div class="form-group">
                        		<label for="password" class="col-sm-4 control-label no-padding-right">Password</label>
                                <div class="col-sm-8 input-group">
                                    <input type="password" name="password_log" value="" id="password_login" class="form-control" placeholder="password ">
                                    <span class="input-group-addon"><i class="fa fa-key"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="box-footer">
                        	<a href="#" accesskey="i" type="btn-save-one" target="/guest/login/auth" class="btn btn-default" title="Log in System">
                            	<i class="fa fa-lock"></i> Log<u>i</u>n  </a>
                        </div>
                    </div>
                </div>
            
                <div id="panelRegister" class="panel panel-collapse collapse">
                	<div class="panel-body">
                       <div class="box-body">
                       		<div class="form-group has-feedback">
                                <label for="username" class="col-sm-4 control-label no-padding-right">User ID</label>
                                <div class="col-sm-8">
                                	<input name="username_reg" value="" id="username" class="form-control" placeholder="User ID">
                                </div>
                            </div>
                        	<div class="form-group">
                            	<label for="email" class="col-sm-4 control-label no-padding-right">Email</label>
                                <div class="col-sm-8">
                                	<input type="email" name="email" value="" id="email" class="form-control" placeholder="Valid Email"
                                    >
                            	</div>        
                            </div>
                            <div class="form-group">
                            	<label for="original_name" class="col-sm-4 control-label no-padding-right">Nama Lengkap</label>
                                <div class="col-sm-8"> 
                                    <input type="text" name="original_name" value="" id="original_name" class="form-control" placeholder="Nama Lengkap (Tidak disingkat) Tanpa Gelar"
                                    >
                                </div>
							</div>
                            <div class="form-group">
                            	<label for="password" class="col-sm-4 control-label no-padding-right">Password</label>
                                <div class="col-sm-8"> 
                                	<input type="password" name="password_reg" value="" id="password_reg" class="form-control" placeholder="Password ">
                                </div>
                            </div>    
							<div class="form-group">
                                <label for="password_confirm" class="col-sm-4 control-label no-padding-right">Password</label>
                                <div class="col-sm-8"> 
                                	<input type="password" name="password_confirm_reg" value="" id="password_confirm_reg" class="form-control" placeholder="Re-type Password ">
                                </div>
                            </div>
                        </div>
						<div class="box-footer">
                        	<a href="#" accesskey="r" data-href="auth/register" class="btn btn-load btn-default btn-ajax-save" title="Create Account">
                            	<i class="fa fa-user"></i> <u>R</u>egister 
                            </a>
                        </div>
                    </div>
                </div>
            
                <div id="panelForgot" class="panel panel-collapse collapse">    
                    <div class="panel-body">
                        <div class="box-body">
                            <div class="form-group">
                                <label for="username" class="col-sm-4 control-label no-padding-right">User ID</label>
                                <div class="col-sm-8"> 
                                    <input type="text" name="username_res" value="" id="username_res" class="form-control" placeholder="User ID">
                                </div>
                            </div> 
                            <div class="form-group">
                                <label for="email" class="col-sm-4 control-label no-padding-right">Email</label>
                                <div class="col-sm-8"> 
                                    <input type="email" name="email_res" value="" id="email_res" class="form-control" placeholder="Valid Email">
                                </div>
                            </div>
                        </div>
                        <div class="box-footer">
                            <a href="#" accesskey="r" data-href="auth/reset" class="btn btn-load btn-default btn-ajax-save" title="Reset Password">
                                <i class="fa fa-user"></i> Re<u>s</u>et 
                            </a>
                        </div>
                     </div>
                </div>

                <div id="panelReset" class="panel panel-collapse collapse"> 
                    <div class="panel-body">
                        <div class="box-body">
                            <div class="form-group">
                                <label for="username" class="col-sm-4 control-label no-padding-right">Email</label>
                                <div class="col-sm-8"> 
                                    <input type="email" name="email_rec" value="" id="email_rec" class="form-control" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="col-sm-4 control-label no-padding-right">Token</label>
                                <div class="col-sm-8"> 
                                    <input type="text" name="token" value="" id="token" class="form-control" placeholder="Token pemulihan password">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="password" class="col-sm-4 control-label no-padding-right">Password</label>
                                <div class="col-sm-8"> 
                                    <input type="password" name="password_rec" value="" id="password_rec" class="form-control" placeholder="Password ">
                                </div>
                            </div>    
                            <div class="form-group">
                                <label for="password_confirm" class="col-sm-4 control-label no-padding-right">Password</label>
                                <div class="col-sm-7"> 
                                    <input type="password" name="password_confirm_rec" value="" id="password_confirm_rec" class="form-control" placeholder="Re-type Password ">
                                </div>
                            </div>
                        </div>

                        <div class="box-footer">
                            <a href="#" accesskey="r" data-href="auth/recovery" class="btn btn-load btn-default btn-ajax-save" title="Reset Password">
                                <i class="fa fa-user"></i> Re<u>s</u>et 
                            </a>
                        </div>
                    </div>
                </div>
                <!--<div class="form-group">
                    <?php echo $script_captcha // tampilkan recaptcha ?>
                </div>
                <div class="g-recaptcha" data-sitekey="6LfmYSITAAAAADIXdFszdvF1FFHHyKfFvx9ev85_"></div>-->
            </form>
        </div>
    