function onSearchSubmit(aEvent)
{
  let searchTerms = document.getElementById("searchText").value;
  let engineName = document.documentElement.getAttribute("searchEngineName");

  if (engineName && searchTerms.length > 0) {
    // Send an event that will perform a search and Firefox Health Report will
    // record that a search from about:home has occurred.
    let eventData = JSON.stringify({
      engineName: engineName,
      searchTerms: searchTerms
    });
    let event = new CustomEvent("AboutHomeSearchEvent", {detail: eventData});
    document.dispatchEvent(event);
  }

  aEvent.preventDefault();
}


function setupSearchEngine()
{
  // The "autofocus" attribute doesn't focus the form element
  // immediately when the element is first drawn, so the
  // attribute is also used for styling when the page first loads.
  let searchText = document.getElementById("searchText");
  searchText.addEventListener("blur", function searchText_onBlur() {
    searchText.removeEventListener("blur", searchText_onBlur);
    searchText.removeAttribute("autofocus");
  });
 
  let searchEngineName = document.documentElement.getAttribute("searchEngineName");
  let searchEngineInfo = SEARCH_ENGINES[searchEngineName];
  let logoElt = document.getElementById("searchEngineLogo");

  // Add search engine logo.
  if (searchEngineInfo && searchEngineInfo.image) {
    logoElt.parentNode.hidden = false;
    logoElt.src = searchEngineInfo.image;
    logoElt.alt = searchEngineName;
    searchText.placeholder = "";
  }
  else {
    logoElt.parentNode.hidden = true;
    searchText.placeholder = searchEngineName;
  }

}

/**
 * Inform the test harness that we're done loading the page.