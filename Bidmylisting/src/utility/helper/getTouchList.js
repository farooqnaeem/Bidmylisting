import getTextUtility from "../input";

let touchList;

class GetTouches {
  async getTouchesList(page, element) {
    touchList = await getTextUtility.getAllElementText(page, element);
    return touchList;
  }
}
export default new GetTouches();
