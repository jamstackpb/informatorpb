import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { matterExport } from '@/ssg/models';

export const getFieldsOfStudy = () => {
    const path1stage = path.join(process.cwd(), 'content/2021/wydzialy');
    const faculties = fs.readdirSync(path1stage);

    return faculties.flatMap((item) => {
        let path2stage = path.join(path1stage, item, 'kierunki');
        return fs
            .readdirSync(path2stage)
            .filter((fos) => path.extname(fos) === '.md')
            .map((fos) => {
                const { data, content } = matter(fs.readFileSync(path.join(path2stage, fos)).toString('utf-8'));
                const clean = DOMPurify.sanitize(marked(content));
                return matterExport(
                    'kierunek',
                    {
                        ...data,
                        faculty: item,
                    },
                    clean,
                    0,
                );
            });
    });
};
