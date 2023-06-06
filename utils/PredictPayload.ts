import UserEntity from "../entities/UserEntity";

function validPayload(payload: UserEntity) {
  let validPayload: any = {};
  validPayload["gluten_free"] = payload.gluten_free === "yes" ? true : false;
  validPayload["dairy_free"] = payload.dairy_free === "yes" ? true : false;
  validPayload["vegan"] = payload.vegan === "yes" ? true : false;
  validPayload["vegetarian"] = payload.vegetarian === "yes" ? true : false;
  validPayload["halal"] = payload.halal === "yes" ? true : false;
  validPayload["age"] = payload.age;
  validPayload["weight"] = payload.weight;
  validPayload["height"] = payload.height;
  validPayload["goal"] = payload.purpose;
  validPayload["daily_activity"] = payload.daily_activity.toLowerCase();
  validPayload["sex"] = payload.sex;

  return validPayload;
}

export default validPayload;
