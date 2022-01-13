import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

export const getFlipBook = () => {
    const pathToFolderProjects = path.join(process.cwd(), '..', '..', 'content', '2021', 'pages');
    const projectsDirectoryFiles = fs.readdirSync(pathToFolderProjects);

    const withGrayMatter = projectsDirectoryFiles.flatMap((adf) => {
        if (path.extname(adf) == '.md') {
            const realPath = path.join(pathToFolderProjects, adf);
            const fileContents = fs.readFileSync(realPath).toString('utf-8');
            const { data: changedToMatter, content } = matter(fileContents);
            const dirty = marked(content);
            const clean = DOMPurify.sanitize(dirty);
            const pages = clean.split('@newPage');
            return pages.map((p) => ({
                changedToMatter,
                clean: p,
            }));
        } else return null;
    });
    return withGrayMatter;
};
