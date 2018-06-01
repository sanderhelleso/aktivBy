			<div class="ui-layout-south">
					<div class="body">
						<div class="button-bar">
							{powered_by}
						</div>
					</div>
				</div>
			</div>
		<div id="popupBox"></div>	
		<div id="curtain"></div>
		{javascript_end}
		<script>
			document.getElementById("template_selector").classList.add("form-control");

			// create icons for side menu
			const adminIco = document.createElement("i");
			adminIco.className = "fas fa-screwdriver sideIco";
			const bookingIco = document.createElement("i");
			bookingIco.className = "fas fa-address-book sideIco";
			const propertyIco = document.createElement("i");
			propertyIco.className = "fas fa-home sideIco";

			setTimeout(function() {
				const sideItems = document.getElementById("navbar").childNodes[0].children;
				sideItems[0].childNodes[0].childNodes[1].appendChild(adminIco);
				sideItems[1].childNodes[0].childNodes[1].appendChild(bookingIco);
				sideItems[2].childNodes[0].childNodes[1].appendChild(propertyIco);
			}, 500)
			
		</script>
	</body>
</html>
