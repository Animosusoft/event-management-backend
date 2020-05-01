export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Upload: {
        createReadStream: any;
        filename: string;
        mimetype: string;
        encoding: string;
    };
};

export enum CacheControlScope {
    Public = 'PUBLIC',
    Private = 'PRIVATE'
}
