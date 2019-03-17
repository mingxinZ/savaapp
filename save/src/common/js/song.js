export default class Song {
  constructor(id, name, singer, album, image, url) {
    this.id = id
    this.name = name
    this.singer = singer
    this.album = album
    this.image = image
    this.url = url
  }
}

export function createSong(item) {
  return new Song({
    id: item.id,
    name: item.name,
    singer: item.ar[0].name,
    album: item.al.name,
    image: item.al.picUrl,
    url: `/songurl/song/media/outer/url?id=${item.id}.mp3`
  })
}

export function searchSong(item) {
  return new Song({
    id: item.id,
    name: item.name,
    singer: item.artists[0].name,
    album: item.album.name,
    image: `http://p4.music.126.net/lsMlFshdJ96aTGFFgayh4Q==/${item.album.picId}.jpg`,
    url: `/songurl/song/media/outer/url?id=${item.id}.mp3`
  })
}