$(init);

function init() {
  $('#searchButton').on('click', searchCharacters);
}

function searchCharacters() {
  var searchvalue = $('#search').val();
  console.log(searchvalue);
  $.post(`${window.location.origin}/characters/searchresults`, {searchvalue});
}
