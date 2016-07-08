class AboutController {
  constructor(marvel) {
    'ngInject';
    marvel.getCharacters()
     .then((data) => {
       console.log(data);
     });
    this.name = 'about';
  }
}

export default AboutController;
