//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.1.0.0 (NJsonSchema v11.0.2.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IExamClient {
    generateExam(command: GenerateExamCommand): Observable<number>;
    submitExam(command: SubmitExamCommand): Observable<void>;
    getById(id: number): Observable<GetExamResponse>;
}

@Injectable({
    providedIn: 'root'
})
export class ExamClient implements IExamClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ?? "https://localhost:7206";
    }

    generateExam(command: GenerateExamCommand): Observable<number> {
        let url_ = this.baseUrl + "/exams";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGenerateExam(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGenerateExam(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<number>;
                }
            } else
                return _observableThrow(response_) as any as Observable<number>;
        }));
    }

    protected processGenerateExam(response: HttpResponseBase): Observable<number> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return _observableOf(result200);
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result400 = ValidationProblemDetails.fromJS(resultData400);
            return throwException("A server side error occurred.", status, _responseText, _headers, result400);
            }));
        } else if (status === 404) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result404: any = null;
            let resultData404 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("A server side error occurred.", status, _responseText, _headers, result404);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    submitExam(command: SubmitExamCommand): Observable<void> {
        let url_ = this.baseUrl + "/exams";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processSubmitExam(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSubmitExam(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else
                return _observableThrow(response_) as any as Observable<void>;
        }));
    }

    protected processSubmitExam(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return _observableOf(null as any);
            }));
        } else if (status === 404) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result404: any = null;
            let resultData404 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("A server side error occurred.", status, _responseText, _headers, result404);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    getById(id: number): Observable<GetExamResponse> {
        let url_ = this.baseUrl + "/exams/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetById(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetById(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetExamResponse>;
                }
            } else
                return _observableThrow(response_) as any as Observable<GetExamResponse>;
        }));
    }

    protected processGetById(response: HttpResponseBase): Observable<GetExamResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GetExamResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status === 404) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result404: any = null;
            let resultData404 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result404 = ProblemDetails.fromJS(resultData404);
            return throwException("A server side error occurred.", status, _responseText, _headers, result404);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

export class ProblemDetails implements IProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;

    [key: string]: any;

    constructor(data?: IProblemDetails) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            for (var property in _data) {
                if (_data.hasOwnProperty(property))
                    this[property] = _data[property];
            }
            this.type = _data["type"];
            this.title = _data["title"];
            this.status = _data["status"];
            this.detail = _data["detail"];
            this.instance = _data["instance"];
        }
    }

    static fromJS(data: any): ProblemDetails {
        data = typeof data === 'object' ? data : {};
        let result = new ProblemDetails();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (this.hasOwnProperty(property))
                data[property] = this[property];
        }
        data["type"] = this.type;
        data["title"] = this.title;
        data["status"] = this.status;
        data["detail"] = this.detail;
        data["instance"] = this.instance;
        return data;
    }
}

export interface IProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;

    [key: string]: any;
}

export class HttpValidationProblemDetails extends ProblemDetails implements IHttpValidationProblemDetails {
    errors?: { [key: string]: string[]; };

    [key: string]: any;

    constructor(data?: IHttpValidationProblemDetails) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            for (var property in _data) {
                if (_data.hasOwnProperty(property))
                    this[property] = _data[property];
            }
            if (_data["errors"]) {
                this.errors = {} as any;
                for (let key in _data["errors"]) {
                    if (_data["errors"].hasOwnProperty(key))
                        (<any>this.errors)![key] = _data["errors"][key] !== undefined ? _data["errors"][key] : [];
                }
            }
        }
    }

    static override fromJS(data: any): HttpValidationProblemDetails {
        data = typeof data === 'object' ? data : {};
        let result = new HttpValidationProblemDetails();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (this.hasOwnProperty(property))
                data[property] = this[property];
        }
        if (this.errors) {
            data["errors"] = {};
            for (let key in this.errors) {
                if (this.errors.hasOwnProperty(key))
                    (<any>data["errors"])[key] = (<any>this.errors)[key];
            }
        }
        super.toJSON(data);
        return data;
    }
}

export interface IHttpValidationProblemDetails extends IProblemDetails {
    errors?: { [key: string]: string[]; };

    [key: string]: any;
}

export class ValidationProblemDetails extends HttpValidationProblemDetails implements IValidationProblemDetails {
    errors?: { [key: string]: string[]; };

    [key: string]: any;

    constructor(data?: IValidationProblemDetails) {
        super(data);
    }

    override init(_data?: any) {
        super.init(_data);
        if (_data) {
            for (var property in _data) {
                if (_data.hasOwnProperty(property))
                    this[property] = _data[property];
            }
            if (_data["errors"]) {
                this.errors = {} as any;
                for (let key in _data["errors"]) {
                    if (_data["errors"].hasOwnProperty(key))
                        (<any>this.errors)![key] = _data["errors"][key] !== undefined ? _data["errors"][key] : [];
                }
            }
        }
    }

    static override fromJS(data: any): ValidationProblemDetails {
        data = typeof data === 'object' ? data : {};
        let result = new ValidationProblemDetails();
        result.init(data);
        return result;
    }

    override toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (this.hasOwnProperty(property))
                data[property] = this[property];
        }
        if (this.errors) {
            data["errors"] = {};
            for (let key in this.errors) {
                if (this.errors.hasOwnProperty(key))
                    (<any>data["errors"])[key] = (<any>this.errors)[key];
            }
        }
        super.toJSON(data);
        return data;
    }
}

export interface IValidationProblemDetails extends IHttpValidationProblemDetails {
    errors?: { [key: string]: string[]; };

    [key: string]: any;
}

export class GenerateExamCommand implements IGenerateExamCommand {
    candidateName?: string;
    candidateSurname?: string;
    candidateEmail?: string;
    candidateFaculty?: string;

    constructor(data?: IGenerateExamCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.candidateName = _data["candidateName"];
            this.candidateSurname = _data["candidateSurname"];
            this.candidateEmail = _data["candidateEmail"];
            this.candidateFaculty = _data["candidateFaculty"];
        }
    }

    static fromJS(data: any): GenerateExamCommand {
        data = typeof data === 'object' ? data : {};
        let result = new GenerateExamCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["candidateName"] = this.candidateName;
        data["candidateSurname"] = this.candidateSurname;
        data["candidateEmail"] = this.candidateEmail;
        data["candidateFaculty"] = this.candidateFaculty;
        return data;
    }
}

export interface IGenerateExamCommand {
    candidateName?: string;
    candidateSurname?: string;
    candidateEmail?: string;
    candidateFaculty?: string;
}

export class SubmitExamCommand implements ISubmitExamCommand {
    examId?: number;
    examQuestions?: SubmitExamExamQuestionDto[];

    constructor(data?: ISubmitExamCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.examId = _data["examId"];
            if (Array.isArray(_data["examQuestions"])) {
                this.examQuestions = [] as any;
                for (let item of _data["examQuestions"])
                    this.examQuestions!.push(SubmitExamExamQuestionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SubmitExamCommand {
        data = typeof data === 'object' ? data : {};
        let result = new SubmitExamCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["examId"] = this.examId;
        if (Array.isArray(this.examQuestions)) {
            data["examQuestions"] = [];
            for (let item of this.examQuestions)
                data["examQuestions"].push(item.toJSON());
        }
        return data;
    }
}

export interface ISubmitExamCommand {
    examId?: number;
    examQuestions?: SubmitExamExamQuestionDto[];
}

export class SubmitExamExamQuestionDto implements ISubmitExamExamQuestionDto {
    examQuestionId?: number;
    submittedAnswers?: number[];

    constructor(data?: ISubmitExamExamQuestionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.examQuestionId = _data["examQuestionId"];
            if (Array.isArray(_data["submittedAnswers"])) {
                this.submittedAnswers = [] as any;
                for (let item of _data["submittedAnswers"])
                    this.submittedAnswers!.push(item);
            }
        }
    }

    static fromJS(data: any): SubmitExamExamQuestionDto {
        data = typeof data === 'object' ? data : {};
        let result = new SubmitExamExamQuestionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["examQuestionId"] = this.examQuestionId;
        if (Array.isArray(this.submittedAnswers)) {
            data["submittedAnswers"] = [];
            for (let item of this.submittedAnswers)
                data["submittedAnswers"].push(item);
        }
        return data;
    }
}

export interface ISubmitExamExamQuestionDto {
    examQuestionId?: number;
    submittedAnswers?: number[];
}

export class GetExamResponse implements IGetExamResponse {
    id?: number;
    questions?: GetExamExamQuestionItem[];
    maxEndDateTime?: Date;

    constructor(data?: IGetExamResponse) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            if (Array.isArray(_data["questions"])) {
                this.questions = [] as any;
                for (let item of _data["questions"])
                    this.questions!.push(GetExamExamQuestionItem.fromJS(item));
            }
            this.maxEndDateTime = _data["maxEndDateTime"] ? new Date(_data["maxEndDateTime"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): GetExamResponse {
        data = typeof data === 'object' ? data : {};
        let result = new GetExamResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        if (Array.isArray(this.questions)) {
            data["questions"] = [];
            for (let item of this.questions)
                data["questions"].push(item.toJSON());
        }
        data["maxEndDateTime"] = this.maxEndDateTime ? this.maxEndDateTime.toISOString() : <any>undefined;
        return data;
    }
}

export interface IGetExamResponse {
    id?: number;
    questions?: GetExamExamQuestionItem[];
    maxEndDateTime?: Date;
}

export class GetExamExamQuestionItem implements IGetExamExamQuestionItem {
    id?: number;
    text?: string;
    type?: QuestionType;
    answers?: GetExamAnswerItem[];

    constructor(data?: IGetExamExamQuestionItem) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.text = _data["text"];
            this.type = _data["type"];
            if (Array.isArray(_data["answers"])) {
                this.answers = [] as any;
                for (let item of _data["answers"])
                    this.answers!.push(GetExamAnswerItem.fromJS(item));
            }
        }
    }

    static fromJS(data: any): GetExamExamQuestionItem {
        data = typeof data === 'object' ? data : {};
        let result = new GetExamExamQuestionItem();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["text"] = this.text;
        data["type"] = this.type;
        if (Array.isArray(this.answers)) {
            data["answers"] = [];
            for (let item of this.answers)
                data["answers"].push(item.toJSON());
        }
        return data;
    }
}

export interface IGetExamExamQuestionItem {
    id?: number;
    text?: string;
    type?: QuestionType;
    answers?: GetExamAnswerItem[];
}

export enum QuestionType {
    RadioButton = 1,
    CheckBox = 2,
}

export class GetExamAnswerItem implements IGetExamAnswerItem {
    id?: number;
    text?: string;
    isSelected?: boolean;

    constructor(data?: IGetExamAnswerItem) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.text = _data["text"];
            this.isSelected = _data["isSelected"];
        }
    }

    static fromJS(data: any): GetExamAnswerItem {
        data = typeof data === 'object' ? data : {};
        let result = new GetExamAnswerItem();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["text"] = this.text;
        data["isSelected"] = this.isSelected;
        return data;
    }
}

export interface IGetExamAnswerItem {
    id?: number;
    text?: string;
    isSelected?: boolean;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}