export interface Location {
    lat: number;
    lng: number;
}

export interface Northeast {
    lat: number;
    lng: number;
}

export interface Southwest {
    lat: number;
    lng: number;
}

export interface Viewport {
    northeast: Northeast;
    southwest: Southwest;
}

export interface Geometry {
    location: Location;
    viewport: Viewport;
}

export interface Result {
    geometry: Geometry;
    name: string;
    place_id: string;
}

export interface PlaceDetailResponse {
    html_attributions: any[];
    result: Result;
    status: string;
}