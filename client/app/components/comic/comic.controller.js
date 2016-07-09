class ComicController {
  constructor($state, marvelService) {
    'ngInject';
    this.name = 'comic';
    this.loading = true;
    marvelService.getComic($state.params.id)
      .then((data) => {
        this.loading = false;
        console.log(data);
        const comic = data.results[0];
        this.comic = comic;
        ['events', 'stories', 'characters', 'stories'].forEach((collectionName) => {
          marvelService.apiRequest(comic[collectionName].collectionURI, {})
          .then((collectionData) => {
            this[collectionName] = collectionData.results;
          });
        });
      })
      .catch((e) => console.error('Error:', e));
  }
}

export default ComicController;
