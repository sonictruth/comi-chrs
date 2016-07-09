class CharacterController {
  constructor($state) {
    'ngInject';
    console.info($state.params.id);
    this.name = 'character';
  }
}

export default CharacterController;
