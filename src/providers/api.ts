import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class ApiProvider {
    static TOKEN_ID_TITLE = 'token';
    static BASE_URL = 'https://api.twto.ru/web/api/v1/';

    constructor(public http: HttpClient) {
    }

    createReceiptByQrText(text) {
        let url = ApiProvider.BASE_URL + 'create_by_qr_text?' + text;
        url = this.addTokenToRequest(url, true);

        return this.http.get(url);
    }

    isTokenCorrect(token) {
        const body = JSON.stringify({token: token});
        let url = ApiProvider.BASE_URL + 'is_authorized';

        let headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this.http.post(url, body, {headers});
    }

    authenticate(username, password) {
        let body = JSON.stringify({login: username, password: password});
        let url = ApiProvider.BASE_URL + 'authorize';
        let headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this.http.post(url, body, {headers});
    }

    addTokenToObject(entity, entityName) {
        let result = {};
        let token = localStorage.getItem(ApiProvider.TOKEN_ID_TITLE);
        result[entityName] = entity;
        result['token'] = token;

        return result;
    }

    protected addTokenToRequest(body, hasParams = false) {
        let token = localStorage.getItem(ApiProvider.TOKEN_ID_TITLE);
        let paramsStart = hasParams ? '&' : '?';
        body += paramsStart + 'token=' + token;

        return body;
    }
}
