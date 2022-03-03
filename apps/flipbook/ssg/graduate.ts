import { MatterInterface } from './../src/utils/matterInterface';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';


export const Graduate = () => {
    const pathToFolderProjects = path.join(process.cwd(), '..', '..', 'content', '2021', 'absolwenci');
    const projectsDirectoryFiles = fs.readdirSync(pathToFolderProjects);
   
    return projectsDirectoryFiles
        .filter((adf) => {
            return path.extname(adf) === '.md';
        })
        .map((adf) => {
            const realPath = path.join(pathToFolderProjects, adf);
            const fileContents = fs.readFileSync(realPath).toString('utf-8');
            const { data, content } = matter(fileContents);
            const dirty = marked(content);
            const clean = DOMPurify.sanitize(dirty);
            return {
                 
                    matter: data,
                    content: clean
                
            } as MatterInterface;
        });
};
