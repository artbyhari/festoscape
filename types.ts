export enum AppState {
    IDLE = 'IDLE',
    UPLOADING = 'UPLOADING',
    CONFIGURING = 'CONFIGURING',
    GENERATING = 'GENERATING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
}

export enum EventType {
    WEDDING = 'Wedding Reception',
    CORPORATE = 'Corporate Conference',
    GALA = 'Gala Dinner',
    BIRTHDAY = 'Birthday Party',
    EXHIBITION = 'Exhibition Booth',
    CONCERT = 'Concert Stage',
    PRODUCT_LAUNCH = 'Product Launch'
}

export interface GenerationConfig {
    image: File | null;
    eventType: EventType;
    theme: string;
    colorPalette: string;
    additionalNotes: string;
}

export interface GeneratedResult {
    originalImage: string;
    generatedImage: string;
    promptUsed: string;
}
