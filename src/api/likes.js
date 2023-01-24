import { get, post } from "./api.js";

export async function donate(albumId) {
    return post('/data/likes', {albumId})
}
export async function getLikes(albumId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`)
}
export async function getOwnLikes(albumId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`)
}



