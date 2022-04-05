export interface HerbsItemDTO {
    herbsName: string;
    herbsNameCategory: string;
    herbsDescription: string;
    herbsDescriptionCategory: string;
    herbsApplication: string;
    herbsApplicationCategory: string;
    herbsPicUrl1: string;
    links: Array<Link>;
}
    interface Link {
        href: string;
        rel : string;
    }
