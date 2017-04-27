$(init);

function init() {
  $('#searchButton').on('click', searchCharacters);
  $('.characterSubmit').on('click', createCharacters, characterAdded);

  function characterAdded() {
    alert('character added to Team');
  }

  if ($('.slick-container').length !== 0) {
    $('.slick-container').slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });
  }

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
