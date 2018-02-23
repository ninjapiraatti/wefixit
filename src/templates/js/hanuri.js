import Expander from "./expander";

function closeOthers(accordionItem) {
	accordionItem.previousElementSibling.classList.add('active');
	var openItems = accordionItem.accordion.querySelectorAll(".expander--open, .expander--opening");
	for (var i = 0; i < openItems.length; i++) {
		if (openItems[i] == accordionItem) continue;
		openItems[i].expander.close();
	}
}

var accordions = document.querySelectorAll(".hanuri");
for (var i = 0; i < accordions.length; i++) {
	var items = accordions[i].querySelectorAll(".expander");
	for (var j = 0; j < items.length; j++) {
		items[j].accordion = accordions[i];
		new Expander(items[j], {
			onOpen: closeOthers,
			onClose: removeActiveClass,
			state: items[j].classList.contains("expander--open") ? "open" : "closed"
		});
	}
}

function removeActiveClass(accordionItem) {
	accordionItem.previousElementSibling.classList.remove('active');
}
