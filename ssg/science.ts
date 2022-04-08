import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { matterExport } from '@/ssg/models';

export const getScienceContent = () => {
    const pathToFolderProjects = path.join(process.cwd(), '..', '..', 'content', '2021', 'kola', 'wydzialy');
    const projectsDirectoryFiles = fs.readdirSync(pathToFolderProjects);
    return projectsDirectoryFiles.flatMap((adf) => {
        const path2 = path.join(process.cwd(), '..', '..', 'content', '2021', 'kola', 'wydzialy', adf);
        const path2e = fs.readdirSync(path2);

        return path2e
            .filter((adf1) => path.extname(adf1) === '.md')
            .map((adf1) => {
                const realPath = path.join(path2, adf1);
                const fileContents = fs.readFileSync(realPath).toString('utf-8');
                const { data: changedToMatter, content } = matter(fileContents);
                const dirty = marked(content);
                const clean = DOMPurify.sanitize(dirty);
                return matterExport('kolo_naukowe', changedToMatter, clean);
            });
    });
};
