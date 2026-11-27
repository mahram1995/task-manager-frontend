import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "../environment/environment";
export class PathParameters {
  [parameterName: string]: any;
}
@Injectable()
export class BaseService {
  URL = BASE_URL;
  fullURL: string = "";

  getHttpParam(urlSearchParams: Map<string, any>): HttpParams {
    let params = new HttpParams();
    for (const [key, value] of urlSearchParams.entries()) {
      if (value !== null && value !== undefined) {
        params = params.set(key, value.toString());
      }
    }
    return params;
  }

  public create(url: any, parameters: PathParameters) {
    return this.getPathParameterValue(url, parameters);
  }

  getPathParameterValue(url: string, parameters: PathParameters): string {
    this.fullURL = url;
    // Use regular expression to find all matches within curly braces
    const matches = this.fullURL.match(/{(.*?)}/g);
    // Check if there are matches and extract the content
    if (matches && matches.length > 0) {
      const params = matches.map((match) =>
        match.substring(1, match.length - 1),
      );

      for (let index = 0; index < params.length; index++) {
        let param = params[index];
        if (parameters[param]) {
          this.fullURL = this.fullURL.replace(
            "{" + param + "}",
            parameters[param],
          );
        } else {
          // console.log(param + " not found.");
          throw new Error(`Parameter ${param} was not provided`);
        }
      }
    } else {
      throw new Error(
        `Please provide paremeter name in the end of API within in curly braces.`,
      );
    }
    return this.fullURL;
  }

  protected async extractData(res: Response): Promise<any> {
    return (await res.text()) === "" ? res.status : res.json();
  }

  getUrlSearchParams(params: Map<string, string>): URLSearchParams {
    let urlParams = new URLSearchParams();
    params.forEach((value, key) => {
      urlParams.append(key, value);
    });
    return urlParams;
  }
}
