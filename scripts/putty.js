window.addEventListener('load', function() {
	puttyLayerLinks();
	puttyModals();
	puttyDrawers();
	puttyScrollEase();
	puttyTooltips();
	
	window.addEventListener('resize', function() {
		setTimeout(function(){ puttyTooltips(); }, 2000);
	});
});

// INITIALIZE ALL LAYER LINKS

function puttyLayerLinks(){

	targetLinks = document.querySelectorAll('[data-target]');

	Array.prototype.forEach.call(targetLinks, function(targetLink) {
		
		var targetID = targetLink.dataset.target;
		var target = document.getElementById(targetID);
		
		targetLink.setAttribute('tabIndex','0');

		
		// IDENTIFY TYPE OF LAYER AND APPLY APPROPRIATE INTERACTIONS
		
		if (target.classList.contains('modal') == true) {
		
			targetLink.addEventListener('click', function(){
				puttyOpen(target);
			});
			
		} else if (target.classList.contains('drawer') == true) {
		
			targetLink.addEventListener('click', function(){
				puttyOpen(target);
			});
		
		} else if (target.classList.contains('popover') == true) {
		
			targetLink.addEventListener('click', function(){
				puttyOpen(target);
			});
			
			targetLink.addEventListener('mouseover', function(){
				puttyOpen(target);
			});
		
		} else if (target.classList.contains('tooltip') == true) {
		
			targetLink.addEventListener('mouseenter', function(){
				puttyOpen(target);
			});
			
			targetLink.addEventListener('mouseleave', function(){
				puttyClose(target);
			});
		}
	});
}

// INITIALIZE PUTTY TOOLTIPS //

function puttyTooltips() {
	
	targetLinks = document.querySelectorAll('[data-target]');
	
	Array.prototype.forEach.call(targetLinks, function(targetLink) {
		
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		
		var targetID = targetLink.dataset.target;
		var target = document.getElementById(targetID);
		
		// IDENTIFY TOOLTIP 
		
		if (target.classList.contains('tooltip') == true) {
		
			document.body.appendChild(target);
			
			var targetBox = target.getBoundingClientRect();
			var targetBoxWidth = targetBox.width;
			var targetBoxHeight = targetBox.height;
			var arrowHeight = parseInt(window.getComputedStyle(target, ':after').height, 10);
		
			var targetLinkBox = targetLink.getBoundingClientRect();
			var targetLinkOriginTop = targetLinkBox.top + scrollTop;
			var targetLinkOriginCenter = (targetLinkBox.left + targetLinkBox.right) / 2;
			
			var targetX = (targetLinkOriginCenter - (targetBoxWidth / 2));
			var targetY = targetLinkOriginTop - (targetBox.height + arrowHeight);
			
			target.style.left = targetX + "px";
			target.style.top = targetY + "px";
		}
		
	});
}

// INITIALIZE PUTTY MODALS //

function puttyModals() {
	
	modals = document.getElementsByClassName('modal');
	
	Array.prototype.forEach.call(modals, function(modal) {
		
		// CREATE, APPEND, AND ASSIGN CLOSE FUNCTIONALITY TO OVERLAY
		
		if (modal.dataset.overlay != 'false') {
		
			var overlay = document.createElement('div');
			overlay.classList.add('overlay');
			modal.insertBefore(overlay, modal.childNodes[0]);
			
			if (modal.dataset.overlay != 'lock') {
				modal.getElementsByClassName('overlay')[0].addEventListener('click', function(){ puttyClose(modal) });
			}
		}
		
		if ( modal.dataset.close != 'false' ) {
		
			var closeIcon = document.createElement('button');
			closeIcon.classList.add('close');
			closeIcon.innerHTML = "<span class='screenreader-only'>Close</span><svg close='icon' viewBox='0 0 20 20'><polygon points='18,2.707 17.293,2 10,9.293 2.707,2 2,2.707 9.293,10 2,17.293 2.707,18 10,10.707 17.293,18 18,17.293 10.707,10'/></svg>";
			modalContent = modal.getElementsByClassName('modal-content')[0];
			modalContent.insertBefore(closeIcon, modalContent.childNodes[0]);
			
			modal.getElementsByClassName('close')[0].addEventListener('click', function(){ puttyClose(modal) });
		}
	});
}


// INITIALIZE DRAWERS //

function puttyDrawers() {

	drawers = document.getElementsByClassName('drawer');
	
	Array.prototype.forEach.call(drawers, function(drawer) {
		
		// CREATE, APPEND, AND ASSIGN CLOSE FUNCTIONALITY TO OVERLAY
		
		if (drawer.dataset.overlay != 'false') {
		
			var overlay = document.createElement('div');
			overlay.classList.add('overlay');
			drawer.insertBefore(overlay, drawer.childNodes[0]);
			
			if (drawer.dataset.overlay != 'lock') {
				drawer.getElementsByClassName('overlay')[0].addEventListener('click', function(){ puttyClose(drawer) });
			}
		}
		
		if ( drawer.dataset.close != 'false' ) {
		
			var closeIcon = document.createElement('button');
			closeIcon.classList.add('close');
			closeIcon.innerHTML = "<span class='screenreader-only'>Close</span><svg close='icon' viewBox='0 0 20 20'><polygon points='18,2.707 17.293,2 10,9.293 2.707,2 2,2.707 9.293,10 2,17.293 2.707,18 10,10.707 17.293,18 18,17.293 10.707,10'/></svg>";
			drawerContent = drawer.getElementsByClassName('drawer-content')[0];
			drawerContent.insertBefore(closeIcon, drawerContent.childNodes[0]);
			
			drawer.getElementsByClassName('close')[0].addEventListener('click', function(){ puttyClose(drawer) });
		}

		var drawerLinks = drawer.getElementsByTagName('a');
		
		Array.prototype.forEach.call(drawerLinks, function(drawerLink) {
			drawerLink.addEventListener('click', function(){ puttyClose(drawer) });
		});
	});
}


// OPEN & CLOSE HANDLERS FOR ALL PUTTY LAYERS

function puttyOpen(layer){
	
	if (layer.classList.contains('tooltip') != true ) {
		document.body.classList.add('lock');
	}

	layer.style.display = "flex";
	setTimeout(function(){ layer.classList.add('show'); }, 100);
}

function puttyClose(layer){
	
	layer.classList.remove('show');
	setTimeout(function(){ layer.style.display = "none"; }, 200);
	document.body.classList.remove('lock');
}


//--------------------------//
//		SCROLL EASE			//
//--------------------------//

function puttyScrollEase(){

	// GET SCROLL-EASE ELEMENTS
	var scrollEaseElements = document.getElementsByClassName('scroll-ease');
	
	// EASE IN ELEMENTS THAT ARE DISPLAYED ON PAGE LOAD 
	Array.prototype.forEach.call(scrollEaseElements, function(element) {
		easeElement(element);
	});
	
	// USE elementPop() TO CHECK MAKE SURE THERE ARE SCROLL-EASE ELEMENTS BEFORE CREATING EVENT LISTENERS
	if (elementPop(scrollEaseElements)) {
	
		// EASE IN ELEMENTS THAT ARE DISPLAYED AFTER A WINDOW RESIZE
		window.addEventListener('resize', function(){
			Array.prototype.forEach.call(scrollEaseElements, function(element) {
				easeElement(element);
			});
		});

		// EASE IN ELEMENTS THAT ARE DISPLAYED ON SCROLL
		window.addEventListener('scroll', function(){
			Array.prototype.forEach.call(scrollEaseElements, function(element) {
				easeElement(element);
			});
		});
	}
	
	// FUNCTION ADDS 'SHOW' CLASS TO SCROLL-EASE ELEMENTS THAT ARE DISPLAYED ON SCREEN
	function easeElement(element) {
	
		var elementBox = element.getBoundingClientRect();
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		
		var easeElementPosition = elementBox.top + scrollTop;
		var easeElementActivateLocation = easeElementPosition - (window.innerHeight * .70);

		if (scrollTop >= easeElementActivateLocation) {
			element.classList.add('show');
		}
	}

}


// VERIFY IF OBJECT VARIABLE FOR PAGE ELEMENTS IS POPULATED

function elementPop(element) {
	for (var key in element) {
		if (element.hasOwnProperty(key)) {
			return true;
		}
		return false;
	}
}