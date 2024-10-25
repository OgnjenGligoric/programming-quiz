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
    notify(command: SubmitExamCommand): Observable<FileResponse>;
    generateExam(command: GenerateExamCommand): Observable<GenerateExamResponse>;
    executeExam(command: ExecuteExamCommand): Observable<FileResponse>;
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

    notify(command: SubmitExamCommand): Observable<FileResponse> {
        let url_ = this.baseUrl + "/exams/notify";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processNotify(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processNotify(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<FileResponse>;
                }
            } else
                return _observableThrow(response_) as any as Observable<FileResponse>;
        }));
    }

    protected processNotify(response: HttpResponseBase): Observable<FileResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return _observableOf({ fileName: fileName, data: responseBlob as any, status: status, headers: _headers });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    generateExam(command: GenerateExamCommand): Observable<GenerateExamResponse> {
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
                    return _observableThrow(e) as any as Observable<GenerateExamResponse>;
                }
            } else
                return _observableThrow(response_) as any as Observable<GenerateExamResponse>;
        }));
    }

    protected processGenerateExam(response: HttpResponseBase): Observable<GenerateExamResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = GenerateExamResponse.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    executeExam(command: ExecuteExamCommand): Observable<FileResponse> {
        let url_ = this.baseUrl + "/exams";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/octet-stream"
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processExecuteExam(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processExecuteExam(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<FileResponse>;
                }
            } else
                return _observableThrow(response_) as any as Observable<FileResponse>;
        }));
    }

    protected processExecuteExam(response: HttpResponseBase): Observable<FileResponse> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return _observableOf({ fileName: fileName, data: responseBlob as any, status: status, headers: _headers });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

export class SubmitExamCommand implements ISubmitExamCommand {
    name?: string;
    test?: string;

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
            this.name = _data["name"];
            this.test = _data["test"];
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
        data["name"] = this.name;
        data["test"] = this.test;
        return data;
    }
}

export interface ISubmitExamCommand {
    name?: string;
    test?: string;
}

export class GenerateExamResponse implements IGenerateExamResponse {
    id?: number;
    startTime?: Date;
    examQuestions?: GenerateExamExamQuestionDto[];

    constructor(data?: IGenerateExamResponse) {
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
            this.startTime = _data["startTime"] ? new Date(_data["startTime"].toString()) : <any>undefined;
            if (Array.isArray(_data["examQuestions"])) {
                this.examQuestions = [] as any;
                for (let item of _data["examQuestions"])
                    this.examQuestions!.push(GenerateExamExamQuestionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): GenerateExamResponse {
        data = typeof data === 'object' ? data : {};
        let result = new GenerateExamResponse();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["startTime"] = this.startTime ? this.startTime.toISOString() : <any>undefined;
        if (Array.isArray(this.examQuestions)) {
            data["examQuestions"] = [];
            for (let item of this.examQuestions)
                data["examQuestions"].push(item.toJSON());
        }
        return data;
    }
}

export interface IGenerateExamResponse {
    id?: number;
    startTime?: Date;
    examQuestions?: GenerateExamExamQuestionDto[];
}

export class GenerateExamExamQuestionDto implements IGenerateExamExamQuestionDto {
    id?: number;
    question?: GenerateExamQuestionDto;

    constructor(data?: IGenerateExamExamQuestionDto) {
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
            this.question = _data["question"] ? GenerateExamQuestionDto.fromJS(_data["question"]) : <any>undefined;
        }
    }

    static fromJS(data: any): GenerateExamExamQuestionDto {
        data = typeof data === 'object' ? data : {};
        let result = new GenerateExamExamQuestionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["question"] = this.question ? this.question.toJSON() : <any>undefined;
        return data;
    }
}

export interface IGenerateExamExamQuestionDto {
    id?: number;
    question?: GenerateExamQuestionDto;
}

export class GenerateExamQuestionDto implements IGenerateExamQuestionDto {
    id?: number;
    text?: string;
    category?: QuestionCategory;
    type?: QuestionType;
    answers?: GenerateExamAnswerDto[];

    constructor(data?: IGenerateExamQuestionDto) {
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
            this.category = _data["category"];
            this.type = _data["type"];
            if (Array.isArray(_data["answers"])) {
                this.answers = [] as any;
                for (let item of _data["answers"])
                    this.answers!.push(GenerateExamAnswerDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): GenerateExamQuestionDto {
        data = typeof data === 'object' ? data : {};
        let result = new GenerateExamQuestionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["text"] = this.text;
        data["category"] = this.category;
        data["type"] = this.type;
        if (Array.isArray(this.answers)) {
            data["answers"] = [];
            for (let item of this.answers)
                data["answers"].push(item.toJSON());
        }
        return data;
    }
}

export interface IGenerateExamQuestionDto {
    id?: number;
    text?: string;
    category?: QuestionCategory;
    type?: QuestionType;
    answers?: GenerateExamAnswerDto[];
}

export enum QuestionCategory {
    OOP = 1,
    General = 2,
    Git = 3,
    Testing = 4,
    Sql = 5,
    Csharp = 6,
}

export enum QuestionType {
    RadioButton = 1,
    CheckBox = 2,
}

export class GenerateExamAnswerDto implements IGenerateExamAnswerDto {
    id?: number;
    text?: string;

    constructor(data?: IGenerateExamAnswerDto) {
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
        }
    }

    static fromJS(data: any): GenerateExamAnswerDto {
        data = typeof data === 'object' ? data : {};
        let result = new GenerateExamAnswerDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["text"] = this.text;
        return data;
    }
}

export interface IGenerateExamAnswerDto {
    id?: number;
    text?: string;
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

export class ExecuteExamCommand implements IExecuteExamCommand {
    examId?: number;
    examQuestions?: ExecuteExamExamQuestionDto[];

    constructor(data?: IExecuteExamCommand) {
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
                    this.examQuestions!.push(ExecuteExamExamQuestionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ExecuteExamCommand {
        data = typeof data === 'object' ? data : {};
        let result = new ExecuteExamCommand();
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

export interface IExecuteExamCommand {
    examId?: number;
    examQuestions?: ExecuteExamExamQuestionDto[];
}

export class ExecuteExamExamQuestionDto implements IExecuteExamExamQuestionDto {
    examQuestionId?: number;
    submittedAnswers?: ExecuteExamAnswerDto[];

    constructor(data?: IExecuteExamExamQuestionDto) {
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
                    this.submittedAnswers!.push(ExecuteExamAnswerDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ExecuteExamExamQuestionDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecuteExamExamQuestionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["examQuestionId"] = this.examQuestionId;
        if (Array.isArray(this.submittedAnswers)) {
            data["submittedAnswers"] = [];
            for (let item of this.submittedAnswers)
                data["submittedAnswers"].push(item.toJSON());
        }
        return data;
    }
}

export interface IExecuteExamExamQuestionDto {
    examQuestionId?: number;
    submittedAnswers?: ExecuteExamAnswerDto[];
}

export class ExecuteExamAnswerDto implements IExecuteExamAnswerDto {
    id?: number;

    constructor(data?: IExecuteExamAnswerDto) {
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
        }
    }

    static fromJS(data: any): ExecuteExamAnswerDto {
        data = typeof data === 'object' ? data : {};
        let result = new ExecuteExamAnswerDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        return data;
    }
}

export interface IExecuteExamAnswerDto {
    id?: number;
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
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