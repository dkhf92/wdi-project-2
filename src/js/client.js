$(init);

function init() {
  $('#searchButton').on('click', searchCharacters);
  $('.characterSubmit').on('click', createCharacters);
  // $('#createButton').on('click', createCharacters);


  function searchCharacters() {
    var searchvalue = $('#search').val();
    console.log(searchvalue);
    $.post(`${window.location.origin}/characters/searchresults`, {searchvalue});
  }


  function createCharacters(e) {
    console.log('clicked!');
    var characterObj = {};
    var parentDiv = $(e.target).parent();
    characterObj.name = parentDiv.find('h5').text();
    characterObj.description = parentDiv.find('p').text();
    characterObj.image = parentDiv.find('a img').attr("src");
    console.log(characterObj);
    $.post(`${window.location.origin}/characters`, { characterObj });
  }

}
