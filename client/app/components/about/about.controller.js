class AboutController {
  constructor(marvelService) {
    'ngInject';
    marvelService.getCharacters()
     .then((data) => {
       console.log(data);
       const ids = {};
       data.results.forEach((character) => {
         character.comics.items.forEach((comic) => {
           const uriSplit = comic.resourceURI.split('/');
           const comicId = uriSplit[uriSplit.length - 1];
           if (ids[comicId]) {
             console.log('found', comic.name, character.name);
           }
           ids[comicId] = true;
         });
       });
     });
    this.name = 'about';
  }
}

export default AboutController;
