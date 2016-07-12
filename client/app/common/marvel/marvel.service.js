// TODO: Marvell api supports swagger maybe use swagger-angular-client

export default class Marvel {

  constructor($http) {
    'ngInject';
    this.$http = $http;

    // TODO: move settings to a config file or ENV variables and use WebPack ENV plugin for dev prod
    this.httpRoot = 'https://gateway.marvel.com/v1/public/';
    this.apiKey = '86bc8cec2a3a9ae2de1da3b8ed5269a1';
  }


  apiRequest(endPoint, params) {
    let url = endPoint;
    if (url.indexOf('http') !== 0) {
      url = `${this.httpRoot}${endPoint}`;
    } else {
      url = url.split('http://').join('https://');
    }
    Object.assign(params, { apikey: this.apiKey });
    const config = {
      method: 'GET',
      url,
      params,
    };
    // TODO: check for error codes in response
    return this.$http(config).then((response) => response.data.data);
  }

  getComic(comicId) {
    return this.apiRequest(`comics/${comicId}`, {});
  }

  getCharacter(characterId) {
    return this.apiRequest(`characters/${characterId}`, {});
  }

  getCharactersFromComic(comicId) {
    return this.apiRequest(`comics/${comicId}/characters`, {});
  }

  getCharacters(nameStartsWith) {
    const params = {
      limit: 100,
      // orderBy: 'modified',
    };
    if (nameStartsWith) {
      params.nameStartsWith = nameStartsWith;
    }
    return this.apiRequest('characters', params);
  }

  getComics(titleStartsWith) {
    const params = {
      // format: 'comic',
      // formatType: 'comic',
      // noVariants: true,
      limit: 100,
      // orderBy: '-onsaleDate',
    };
    if (titleStartsWith) {
      params.titleStartsWith = titleStartsWith;
    }
    return this.apiRequest('comics', params);
  }

}
