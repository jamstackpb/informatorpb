import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import DOMPurify from 'isomorphic-dompurify';
import remark from 'remark';
import remarkHtml from 'remark-html';
export const getFlipBook = () => {
    const pathToFolderProjects = path.join(process.cwd(), 'content/2021/pages');
    const projectsDirectoryFiles = fs.readdirSync(pathToFolderProjects);

    const withGrayMatter = projectsDirectoryFiles
        .filter((adf) => path.extname(adf) === '.md')
        .flatMap((adf) => {
            const realPath = path.join(pathToFolderProjects, adf);
            const fileContents = fs.readFileSync(realPath).toString('utf-8');
            const { data: changedToMatter, content } = matter(fileContents);
            const dirty = remark().use(remarkHtml).processSync(content);
            const clean = DOMPurify.sanitize(dirty.toString());
            const pages = clean.split('@newPage');
            return pages.map((p) => ({
                changedToMatter,
                clean: p,
            }));
        });
    return withGrayMatter;
};
