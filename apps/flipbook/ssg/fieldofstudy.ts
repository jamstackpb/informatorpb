import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

interface typeOfStudy {
    stationary: boolean;
    partTime: boolean;
}

interface fosMatter {
    name: string;
    engineering: typeOfStudy;
    master: typeOfStudy;
    specialities: string;
    jobPerspectives: string;
    maturaSubjects: string;
    equation: string;
}

interface data {
    changedToMatter: fosMatter;
    clean: string;
    faculty: string;
}

export const getFieldsOfStudy = () => {
    const path1stage = path.join(process.cwd(), '..', '..', 'content', '2021', 'wydzialy');
    const faculties = fs.readdirSync(path1stage);

    const fosData: data[] = [];

    faculties.map((item) => {
        let path2stage = path.join(path1stage, item, 'kierunki');
        fs.readdirSync(path2stage)
            .filter((fos) => path.extname(fos) === '.md')
            .map((fos) => {
                const { data, content } = matter(fs.readFileSync(path.join(path2stage, fos)).toString('utf-8'));
                const clean = DOMPurify.sanitize(marked(content));
                fosData.push({ changedToMatter: data as fosMatter, clean, faculty: item });
            });
    });

    return fosData;
};
