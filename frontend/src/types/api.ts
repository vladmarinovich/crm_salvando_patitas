export interface ApiResponse<T> {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: T[]; // For paginated responses
    [key: string]: any; // For flexible responses
}

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface UserProfile {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
}
