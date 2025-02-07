import PocketBase from "pocketbase";

const pb = new PocketBase("http:127.0.0.1:8090");

export async function getOffres() {
  try {
    let data = await pb.collection("maison").getFullList({
      sort: "-created",
    });
    data = data.map((offre) => {
      offre.img = pb.files.getURL(offre, offre.image);
      return offre;
    });
    return data;
  } catch (error) {
    console.log(
      "Une erreur est survenue en lisant la liste des maisons",
      error
    );
    return [];
  }
}

//backend.mjs
export async function getOffre(id) {
  try {
    let data = await pb.collection("maison").getOne(id);
    data.imageUrl = pb.files.getURL(data, data.image);
    return data;
  } catch (error) {
    console.log("Une erreur est survenue en lisant la maison", error);
    return null;
  }
}
