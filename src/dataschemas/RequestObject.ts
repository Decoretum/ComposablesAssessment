export interface RequestObject {
    url: string,
    operation: string
}

export interface personalDetails {
    data: Array<personalDetailObject>,
    limit: number,
    total: number
}

export interface personalDetailObject {
    id: string,
    type: string,
    email: string,
    picURL?: string,
    picDataURI?: string,
    identityImages?: Array<String>,
    doc_specialties?: Array<string>
}
