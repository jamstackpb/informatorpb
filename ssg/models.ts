import { PartOfEquation } from '@/src/components/atoms/Kalkulator';

type PossiblePageType = 'kierunek' | 'absolwent' | 'kolo_naukowe' | 'spis_tresci';

interface typeOfStudy {
    stationary: boolean;
    partTime: boolean;
}

export interface FieldOfStudy {
    name: string;
    engineering: typeOfStudy;
    master: typeOfStudy;
    specialities: string;
    jobPerspectives: string;
    equationSubjects: PartOfEquation[];
    faculty: string;
}
export interface AbsolwentProps {
    image: string;
    faculty: string;
    academicTitle: string;
    name: string;
    job: string;
    content: string;
}
export interface KoloProps {
    name: string;
    website: string;
    video: string;
}

export interface TableOfContentsProps {
    section: string;
    bgcImage: string;
    pageNumber: string;
    chapters: Array<{ section: string; page: number }>;
}

export const matterExport = <
    PageType extends PossiblePageType,
    MatterType = PageType extends 'kierunek'
        ? FieldOfStudy
        : PageType extends 'kolo_naukowe'
        ? KoloProps
        : PageType extends 'absolwent'
        ? AbsolwentProps
        : TableOfContentsProps,
>(
    pageType: PageType,
    matter: unknown,
    content: string,
) => {
    return {
        matter: matter as MatterType,
        pageType,
        content,
    };
};
