<h3>My second project for WDI in London.</h3>
<img src ="https://raw.githubusercontent.com/dkhf92/wdi-project-2/master/src/images/MarvelHomepage.png">


<h4>Introduction</h4>

On this website you can search the Marvel database for all their characters and create your own team of superheroes. This is my second project on the Web development Immersive course at General Assemly London.

This is a link to the website: https://enigmatic-refuge-29546.herokuapp.com/

You can watch my code here: https://github.com/dkhf92/wdi-project-2

<h4>Code</h4>

```
marvel
.characters
.findAll(100)
.then(characters => {
  return Promise.map(characters.data, (character) => {
    return Character.create({
      name: character.name,
      description: character.description,
      image: `${character.thumbnail.path}/portrait_xlarge.jpg` || 'no image'
    });
  });
})
.then(characters => {
  console.log(`${characters.length} characters were created`);
})

```

This is how I search the Marvel database for the first 100 characters. It returns me an array of characters. Then I store the name, description and image into objects.


<h4>Project Brief</h4>

Use our six weeks of learning with HTML, CSS and Javascript to create a website.

This website was created using HTML, CSS and Javascript.

www.marvel.com

www.bootstrap.com

http://kenwheeler.github.io/slick/

jQuery (https://code.jquery.com/jquery-3.2.1.js)

<h4>Credit</h4>

GA instructors Alex Chin, Rane Gowan, Natalie Huitson and Edmund Compton.
