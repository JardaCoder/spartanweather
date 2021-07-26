export interface Places{
    predictions?: Prediction[]
}

export interface Prediction{
    description: string;
    place_id: string;
    structured_formatting: StructuredFormatting;
    favorito: boolean;
}

export interface StructuredFormatting{
    main_text: string;
    secondary_text: string;
}