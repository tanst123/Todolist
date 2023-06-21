import axios from "axios";

export default class ApiUtil {
  static getApi = async (url:string, params:string) => {
    return await axios({
      method: "get",
      url: url,
      data: params,
    });
  };
  static postApi = async (url:string, params:any) => {
    return await axios({
      method: "post",
      url: url,
      data: params,
    });
  };
  static deleteApi = async (url:string, id:number) => {
    return await axios({
      method: "delete",
      url: url + "/" + id,
    });
  };

  static putApi = async (url:string, id:number, params:any) => {
    return await axios({
      method: "put",
      url: url + "/" + id,
      data: params
    });
  };
}
