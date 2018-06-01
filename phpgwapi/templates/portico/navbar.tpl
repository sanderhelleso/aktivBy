	<body>
		<div id="debug-navbar">
		{debug}
		</div>
	<script type="text/javascript">
		function logout()
		{
			if(typeof(Storage)!=="undefined")
			{
				sessionStorage.cached_menu_tree_data = '';
				localStorage.clear();
		 	}
			var $tree = $('#navbar');
			var tree = $tree.tree('getTree');

			tree.iterate(
				function(node) {
					$tree.tree('closeNode', node, true);
				 }
			);

			var sUrl = phpGWLink('logout.php');
			window.open(sUrl,'_self');
		}

		var treemenu_data = {treemenu_data};
		var current_node_id = {current_node_id};
	</script>
				<nav class="ui-layout-north navbar navbar-expand-lg navbar-light bg-light">
				<i class="far fa-user"></i>
					<a class="navbar-brand" href="#"><img src="phpgwapi/templates/portico/images/aalesund_logo.png"</img></a>
					<div id="nav_menu">		
						<ul class="list-inline">
							<li class="list-inline-item">
								<div class="form-group">
									{template_selector}
								</div>
							</li>
							<li class="nav-item active">
								<a href="{print_url}" class="icon icon-print" target="_blank">
									{print_text}
								</a>
							</li>
							<li class="list-inline-item">
								<a href="{home_url}" class="icon icon-home">
									{home_text}
								</a>
							</li>
							<li class="list-inline-item">
								<a href="{debug_url}" class="icon icon-debug">
									{debug_text}
								</a>
							</li>
							<li class="list-inline-item">
								<a href="{about_url}" class="icon icon-about">
									{about_text}
								</a>
							</li>
							<li class="list-inline-item">
								<a href="{support_url}" class="{support_icon}">
									{support_text}
								</a>
							</li>
							<li class="list-inline-item">
								<a href="{preferences_url}" class="icon icon-preferences">
									{preferences_text}
								</a>
							</li>
							<li class="list-inline-item">
								<a href="javascript:logout();" class="icon icon-logout">
									{logout_text}
								</a>
							</li>
						</ul>
					</div>
				</nav>

			<div id="side_content" class="ui-layout-west" style="display: none;">
				<div class="layouheader">{user_fullname}</div>
				<input type="text" id="navbar_search" value="" class="input" style="margin:0em auto 1em auto; display:block; padding:4px; border-radius:4px; border:1px solid silver;" />
				<div id="navtreecontrol">
					<a id="collapseNavbar" title="Collapse the entire tree below" href="#">
						{lang_collapse_all}
					</a>
				</div>


				<div id="navbar" class="ui-layout-content" style="overflow: auto;"></div>
			</div>

			<div class="ui-layout-east">
				<div id = "layouheader_east" class="layouheader"></div>
				<div id = "layoutcontent_east"></div>
					</div>

			<div id="center_content" class="ui-layout-center content">
				<h1 id="top">{current_app_title}</h1>
					
