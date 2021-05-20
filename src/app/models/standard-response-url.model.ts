export class StandardResponseUrl {
    data?: Array<URL> ;
    error?: Object;
    status?: Status;
}

export class StandardResponseUrlPagination {
    data?: URLPagination ;
    error?: Object;
    status?: Status;
}

export class Status {
    statusCode?: string;
    message?: string;

};

export class URL {
    _id?: any;
    longUrl?: string;
    shortUrl?: string;
    urlCode?: string;
    clickCount?: string;
}

export class URLPagination {
    urlList?: Array<URL>;
    size?: number;
}