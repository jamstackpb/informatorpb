import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

export const Graduate = () => {
    const pathToFolderProjects = path.join(process.cwd(), '..', '..', 'content', '2021', 'absolwenci');
    const projectsDirectoryFiles = fs.readdirSync(pathToFolderProjects);

    const withGrayMatter = projectsDirectoryFiles.map((adf) => {
        if (path.extname(adf) == ".md")
        {
            const realPath = path.join(pathToFolderProjects, adf);
            const fileContents = fs.readFileSync(realPath).toString('utf-8');
            const { data: changedToMatter, content } = matter(fileContents);
            const dirty = marked(content);
            const clean = DOMPurify.sanitize(dirty);
            return {
            changedToMatter,
            clean,
            };
        } else return null;
    });
    return withGrayMatter;
};
