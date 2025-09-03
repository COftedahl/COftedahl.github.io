//script.js
//scripts for team website

const ACCORDIONS = Object.freeze({
  PRELIMINARY: "Accordion_PreliminaryPhaseItem", 
  PHASE_ONE: "Accordion_PhaseOneItem", 
  PHASE_TWO: "Accordion_PhaseTwoItem",
});

//variable to hold references to the accordions present in the document
let accordions = [];

//variable to determine which accordion is open
let openAccordion = null;

//function called when an accordion is clicked
//@param accordionEnum: ACCORDIONS enum value indicating which accordion was clicked
const handleAccordionClicked = (accordionEnumString) => {
  const detailsDivClass = "Accordion_Item_DetailsDiv";
  const collapsedClass = "Accordion_Item_DetailsDiv-collapsed";

  for (let accordion of accordions) {
    if (!accordion.classList.contains(accordionEnumString)) {
      const detailsDiv = accordion.getElementsByClassName(detailsDivClass)[0];
      if (!detailsDiv.classList.contains(collapsedClass)) {
        detailsDiv.classList.toggle(collapsedClass);
      }
    }
  }

  const selectedElem = document.getElementsByClassName(accordionEnumString)[0]
  const selectedElemDetailsDiv = selectedElem.getElementsByClassName(detailsDivClass)[0];
  document.documentElement.style.setProperty("--accordionMaxHeight", selectedElemDetailsDiv.scrollHeight + "px");
  selectedElemDetailsDiv.classList.toggle(collapsedClass);
}

//function called when screen is resized
const handleScreenResized = () => {
  console.log(document.getElementsByTagName("body")[0].offsetHeight);
  console.log(document.getElementsByTagName("header")[0].offsetHeight);
  console.log(document.getElementsByTagName("body")[0].offsetHeight);

  const maxHeight = document.getElementsByTagName("body")[0].offsetHeight - 
                    document.getElementsByTagName("header")[0].offsetHeight - 
                3 * document.getElementsByClassName("Accordion_Item_HeaderDiv")[0].offsetHeight;
  console.log("Max height set to ", maxHeight);
  document.documentElement.style.setProperty("--accordionMaxHeight", maxHeight + "px");
}

//function called when document is loaded to assign event listeners to components
const addEventListeners = () => {
  const accordionHeaderClass = "Accordion_Item_HeaderDiv";
  accordions = document.getElementsByClassName("Accordion_ItemDiv");
  
  for (let enumVal in ACCORDIONS) {
    try {
      const currAccordion = document.getElementsByClassName(ACCORDIONS[enumVal])[0].getElementsByClassName(accordionHeaderClass)[0];
      currAccordion.addEventListener("click", () => {
        handleAccordionClicked(ACCORDIONS[enumVal]);
      });
    }
    catch (e) {
      console.error("Accordion " + enumVal + " click listener not set!");
    }
  }

  
}

document.addEventListener('DOMContentLoaded', () => addEventListeners());