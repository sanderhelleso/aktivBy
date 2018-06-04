			<div class="ui-layout-south">
					<div class="body">
					</div>
				</div>
			</div>
		<div id="popupBox"></div>	
		<div id="curtain"></div>
		{javascript_end}
		<script>
			// enbale ES6
			'use strict'

			// add bootstrap class to template selector
			document.getElementById("template_selector").classList.add("form-control");

			// remove stubborn height from navbar
			document.querySelector("nav").style.removeProperty("height");

			// set name for logged in user
			document.querySelector("#userName").innerHTML = document.querySelector(".layouheader").innerHTML;

			// create icons for side menu
			const adminIco = document.createElement("i");
			adminIco.className = "fas fa-screwdriver sideIco";
			const bookingIco = document.createElement("i");
			bookingIco.className = "fas fa-address-book sideIco";
			const propertyIco = document.createElement("i");
			propertyIco.className = "fas fa-home sideIco";

			// set icons after elements have been loaded to page
			setTimeout(function() {
				// side menu options
				const sideItems = document.getElementById("navbar").childNodes[0].children;
				sideItems[0].childNodes[0].childNodes[1].appendChild(adminIco);
				sideItems[1].childNodes[0].childNodes[1].appendChild(bookingIco);
				sideItems[2].childNodes[0].childNodes[1].appendChild(propertyIco);

				// removes resizer
				const resizeControllers = document.querySelectorAll(".ui-layout-resizer");
				resizeControllers.forEach(ele => {
					ele.remove();
				});

				// insert map icon into current page heading
				let mapIco = document.createElement("i");
				mapIco.className = "fas fa-thumbtack pageIco";
				document.querySelector("#top").appendChild(mapIco);

				/*// set bootstrap list styling to ul & li elements
				const listEles = document.querySelectorAll("ul, li");
				listEles.forEach(ele => {
					console.log(ele);
					if (ele.tagName === "UL") {
						ele.classList.add("list-group");	
					}

					else {
						ele.classList.add("list-item");
					}
					
				});*/
			}, 500);
			
		</script>
	</body>
</html>
