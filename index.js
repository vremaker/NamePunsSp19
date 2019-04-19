// Name: Valerie Remaker
// Date: 11/14/18
// Section: CSE 154 AD
//
// Sets up the JS for the pun generator for CSE154 classmates and handles errors
// if someone isn't in the API database
(function() {
  "use strict";
  const API_URL = "index.php";
  window.addEventListener("load", initialize);

  /**
   *  initializes the button key listeners
   */
  function initialize() {
    $("search").addEventListener("click", search);
    $("all").addEventListener("click", function(){
      makeRequest("random");
    });
    $("home").addEventListener("click", restart);
  }

  /**
  * Makes a request if a user enters a name into the search box
  */
 function search() {
   if($("name").value.match(/\S/)) {
      let input = $("name").value;//let something be the word in side
      makeRequest(input);
    }
  }

  /**
   * Takes in the name from the search box and looks through the API
   * @param {string} name - the name being searched
   */
  function makeRequest(name) {
    let url = API_URL + "?name=" + name;
    console.log(url);
    fetch(url, {mode : "cors"})
      .then(checkStatus)
      .then(JSON.parse)
      .then(printPun)
      .catch(errorFunct);
  }

  /**
   * Prints the lead in and punch line for the joke
   * @param {object} responseData - the punch line and joke
   */
  function printPun(responseData) {
    $("btns").classList.add("hidden");
    $("search").classList.add("hidden");
    $("all").classList.add("hidden");
    $("name").classList.add("hidden");
    let lead = document.createElement("h2");
    let punch = document.createElement("h3");
    lead.innerText = responseData[0];
    punch.innerText = responseData[1];
    $("puns").appendChild(lead);
    $("puns").appendChild(punch);
    $("home").classList.remove("hidden");
  }

  /**
   * resets buttons and sets up a fresh search screen
   */
  function restart() {
    $("name").value = "";
    $("puns").innerHTML = '';
    $("btns").classList.remove("hidden");
    $("name").classList.remove("hidden");
    $("home").classList.add("hidden");
    $("btns").classList.add("hidden");
    $("search").classList.remove("hidden");
    $("all").classList.remove("hidden");
  }

  /**
   * notifies users of an error and then waits to take them back to the homepage
   */
  function errorFunct() {
    $("btns").classList.add("hidden");
    $("search").classList.add("hidden");
    $("all").classList.add("hidden");
    $("name").classList.add("hidden");
    let error = document.createElement("h1");
    let pic = document.createElement("img");
    error.innerText = "We don't seem to have your name... \n" +
      " Are you sure you're registered for CSE154?";
    /*https://tenor.com/view/imlost-im-lost-confused-calculate-gif-9919713*/
    pic.src = "error.gif";
    pic.alt = "error gif";
    $("puns").appendChild(error);
    $("puns").appendChild(pic);
    setTimeout(restart, 3000);
  }

  /* ------------------------------ Helper Functions  ------------------------------ */
  // Note: You may use these in your code, but do remember that your code should not have
  // any functions defined that are unused.

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @returns {object} DOM object associated with id.
   */
  function $(id) {
    return document.getElementById(id);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @returns {object} - valid result text if response was successful, otherwise rejected
   *                     Promise result
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status == 0) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

})();
