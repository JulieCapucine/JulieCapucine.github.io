
var vowels = ['a', 'e', 'i', 'o', 'u', 'y', 'A', 'E', 'I', 'O', 'U', 'Y'];
var textToStyle = document.getElementsByClassName("text-design");

for (i = 0; i < textToStyle.length; i++) {
	var fullText = "";
	var innerText = textToStyle[i].innerHTML;
	for (j=0; j < innerText.length; j++){
		if (vowels.indexOf(innerText[j]) == -1) {
			fullText += innerText[j].bold();
		} else {
			fullText += innerText[j];
		}
	}
	textToStyle[i].innerHTML = fullText;
}

//link hover randomized image
function SetButtonImage() {
	var imgs = document.getElementsByClassName("brush");
	for (var i = 0; i < imgs.length; i++) { 
		imgs[i].src = "img/brushes/brush-" + Math.floor((Math.random() * 4) + 1) + ".png";
	};
}

function linkImage(link) {
	link.style.backgroundImage = "url(img/underlines/underline-" + Math.floor((Math.random() * 3) + 1) + ".png)";
	console.log(link);
	console.log(link.style.backgroundImage);
}

function unlinkImage(link) {
	link.style.backgroundImage = "none";
}

//page transitions
var intarvalId = null;
var counter;
var currentPage = null;
var nextPage = null;

function ActivatePage() {
	document.getElementById(nextPage).classList.add("active");

}

function DeactivatePage() {
	document.getElementById(currentPage).classList.remove("active");
	document.getElementById(currentPage).style.left = "0px";	
	document.getElementById(currentPage).style.top = "0px";	
	currentPage = nextPage;
	nextPage = null;
	if (currentPage != "menu-page") {
		document.getElementById(currentPage).style.position = 'absolute';
	} else {
		document.getElementById(currentPage).style.position = 'fixed';
	}
}

function contact() {
	counter = 0;
	intervalId = setInterval(RightToLeft, 20);
	nextPage = "contact-page";
}

function about() {
	counter = 0;
	intervalId = setInterval(LeftToRight, 20);
	nextPage = "about-page";
}

function projects() {
	console.log("projects");
	counter = 0;
	intervalId = setInterval(BottomToTop, 20); 
	nextPage = "project-page";
}

function goBackToProjects() {
	currentPage = "project-page";
	document.getElementById("menu-page").classList.remove("active");
	document.getElementById("project-page").classList.add("active");
	if (currentPage != "menu-page") {
		document.getElementById(currentPage).style.position = 'absolute';
	} else {
		document.getElementById(currentPage).style.position = 'fixed';
	}	
}

function home() {
	counter = 0;
	intervalId = setInterval(TopToBottom, 20); 
	nextPage = "menu-page";
}

function RightToLeft() {
	var left = document.getElementById(currentPage).style.left;
	if (Math.abs(counter) > document.documentElement.clientWidth) {
		clearInterval(intervalId);
		ActivatePage();
		DeactivatePage();
	} else {
		counter -= 100;
		left = counter;
		document.getElementById(currentPage).style.left = left + "px";	
	}
}

function LeftToRight() {
	var left = document.getElementById(currentPage).style.left;
	if (Math.abs(counter) > document.documentElement.clientWidth) {
		clearInterval(intervalId);
		ActivatePage();
		DeactivatePage();
	} else {
		counter += 100;
		left = counter;
		document.getElementById(currentPage).style.left = left + "px";	
	}
}

function BottomToTop() {
	console.log(currentPage);
	console.log(document.getElementById(currentPage));
	console.log(document.location.href);
	var top = document.getElementById(currentPage).style.top;
	if (Math.abs(counter) > document.documentElement.clientHeight) {
		clearInterval(intervalId);
		ActivatePage();
		DeactivatePage();
	} else {
		counter -= 100;
		top = counter;
		document.getElementById(currentPage).style.top = top + "px";	
	}
}

function TopToBottom() {
	var top = document.getElementById(currentPage).style.top;
	if (Math.abs(counter) > document.documentElement.clientHeight) {
		clearInterval(intervalId);
		ActivatePage();
		DeactivatePage();
	} else {
		counter += 100;
		top = counter;
		document.getElementById(currentPage).style.top = top + "px";	
	}
}

function SetCurrentPage() {
	console.log(currentPage);
	if (currentPage == null) {
		currentPage = document.getElementsByClassName('active')[0].id;
		console.log(currentPage);
	}
}

//set the size of all containers
function SetMiddleRowHeight() {
	var element = document.getElementById("middle-row");
	var heightRequired = document.documentElement.clientHeight - 150;
	var height = heightRequired.toString()+ "px";
	element.setAttribute("style", "height:" + height);
	var cDiv = element.children;
	for (var i = 0; i < cDiv.length; i++) {
	    if (cDiv[i].tagName == "DIV") {   //or use toUpperCase()
	        cDiv[i].setAttribute("style", "height:" + height);
	       	cDiv[i].children[0].setAttribute("style", "height:" + height);
	    }
	}
}

function SetRightItemPadding() {
	var element = document.getElementById("right-menu-item");
	var padding = element.offsetWidth - 50 + "px";
	element.style.paddingLeft = padding;
}

function OnStartAndResize() {
	SetMiddleRowHeight();
	SetRightItemPadding();
}


//isotope filter
var $container = null;

$(window).load(function() {
        $container = $('.project-row');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.cat button').click(function() {
            $('.cat .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

    });


function Main() {
	var link = document.location.href.split("/");
	var linkIO = document.location.href.split(".");
	if (((link[link.length - 1]) == "index.html") || (linkIO[link.length - 1] == "io")) {
		OnStartAndResize();
		SetCurrentPage();
		SetButtonImage();
	} else if ((link[link.length - 1]) == "index.html#projects") {
		OnStartAndResize();
		SetButtonImage();
		goBackToProjects();
	}
}

Main();

