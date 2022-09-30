import CultureFacade from "./media-facade.js";
import { MEDIA_TYPES } from "./constants.js";

async function fetchResource(type, id) {
  try {
    const mediaResource = new CultureFacade(type);
    const resourceData = await mediaResource.get(id);
    console.log(`Loaded ${type} resource: `, resourceData);
  } catch (error) {
    console.log("Error: ", error);
  }
}

(async function main() {
  await fetchResource(MEDIA_TYPES.MUSIC, 1);
  await fetchResource(MEDIA_TYPES.MOVIE, 1);
  await fetchResource(MEDIA_TYPES.TV, 2);
  await fetchResource(MEDIA_TYPES.BOOK, 32);
})();
