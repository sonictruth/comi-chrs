class CharacterController {
  constructor($state, marvelService) {
    'ngInject';
    this.$state = $state;
    this.name = 'character';
    marvelService.getCharacter($state.params.id);
  }
}

export default CharacterController;
