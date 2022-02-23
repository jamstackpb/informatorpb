import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { MatterInterface } from '@/src/utils/matterInterface';

export const getScienceContent = () => {
    const pathToFolderProjects = path.join(process.cwd(), '..', '..', 'content', '2021', 'kola', 'wydzialy');
    const projectsDirectoryFiles = fs.readdirSync(pathToFolderProjects);
    let scienceClubs: Array<MatterInterface> = new Array
    projectsDirectoryFiles.map((adf) => {
        const path2 = path.join(process.cwd(), '..', '..', 'content', '2021', 'kola', 'wydzialy', adf);
        const path2e = fs.readdirSync(path2);
        
        
        path2e.map((adf1)=>{
            if (path.extname(adf1) == '.md') {
                const realPath = path.join(path2, adf1);
                const fileContents = fs.readFileSync(realPath).toString('utf-8');
                const { data: changedToMatter, content } = matter(fileContents);
                const dirty = marked(content);
                const clean = DOMPurify.sanitize(dirty);
                scienceClubs.push({matter: changedToMatter, content: clean})
               
            } 
        })
      
    });
    
    
    return scienceClubs 
};
