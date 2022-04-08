import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { matterExport } from '@/ssg/models';

export const getTableOfContents = () => {
    const contentPath = path.join(process.cwd(), '..', '..', 'content', '2021', 'tableOfContents');

    const tableOfContentsFile = fs.readdirSync(contentPath);

    return tableOfContentsFile
        .filter((adf) => {
            return path.extname(adf) === '.md';
        })
        .map((adf) => {
            const realPath = path.join(contentPath, adf);
            const fileContents = fs.readFileSync(realPath).toString('utf-8');
            const { data, content } = matter(fileContents);
            const dirty = marked(content);
            const clean = DOMPurify.sanitize(dirty);
            return matterExport('spis_tresci', data, clean);
        });
};
