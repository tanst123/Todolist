import axios from "axios";

export default class ApiUtil {
  static getApi = async (url:string, params:string) => {
    await axios({
      method: "get",
      url: url,
      data: params,
    });
  };
  static postApi = async (url:string, params:string) => {
    await axios({
      method: "post",
      url: url,
      data: params,
    });
  };
  static deleteApi = async (url:string, id:number) => {
    await axios({
      method: "delete",
      url: url + "/" + id,
    });
  };
}
