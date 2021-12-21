import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

export const LParser = () => {
    const path1 = path.join(process.cwd(), '..', '..', 'content', '2021', 'wydzialy');
    const projectsDirectoryFiles = fs.readdirSync(path1);
    const withGrayMatter = projectsDirectoryFiles.map((adf1) => {
        const path2 = path.join(process.cwd(), '..', '..', 'content', '2021', 'wydzialy', adf1)
        const path2e = fs.readdirSync(path2);
        let realPath
        let slug = Array<any>();
        let dir = Array<any>();
        let changed = Array<any>();
        let cleaned = Array<any>();
        path2e.map((adf2) => {
            realPath = path.join(path2, adf2);
            const path3e = fs.readdirSync(realPath);     
            path3e.map((adf3) => {
                if (path.extname(adf3) == ".md")
                {
                        realPath = path.join(path2, adf2, adf3);
                        slug.push(adf3.replace('.md', ''));
                        dir.push(adf1);
                        const fileContents = fs.readFileSync(realPath).toString('utf-8');
                        const { data: changedToMatter, content } = matter(fileContents);
                        const dirty = marked(content);
                        const clean = DOMPurify.sanitize(dirty);
                        changed.push(changedToMatter);
                        cleaned.push(clean)
                }
            });
        })
        return {
            slug,
            dir,
            changed,
            cleaned,
        };
    });
    return withGrayMatter;
};
