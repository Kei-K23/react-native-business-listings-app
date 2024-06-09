export type Slider = {
    name: string;
    imageUrl: string;
}

export type Review = {
    imageUrl: string;
    rating: number;
    review: string;
    userName: string;
}

export type Business = {
    id?: string;
    name: string;
    address?: string;
    imageUrl?: string;
    category: string;
    phone: string;
    email: string;
    about?: string;
    reviews?: Review[];
}