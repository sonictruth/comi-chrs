class CharacterController {
  constructor($state, marvelService) {
    'ngInject';
    this.$state = $state;
    this.name = 'character';
    this.loading = true;
    marvelService.getCharacter($state.params.id)
      .then((data) => {
        this.loading = false;
        const character = data.results[0];
        this.character = character;
        ['events', 'stories', 'comics', 'stories'].forEach((collectionName) => {
          marvelService.apiRequest(character[collectionName].collectionURI, {})
          .then((collectionData) => {
            this[collectionName] = collectionData.results;
          });
        });
      })
      .catch((e) => console.error('Error:', e));
  }
}

export default CharacterController;
