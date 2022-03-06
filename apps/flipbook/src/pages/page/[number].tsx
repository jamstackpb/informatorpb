import { getFlipBook } from '@/ssg/flipbookcontent';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { FlipBook } from '../../components/organism/flipbook';
import { Graduate } from '@/ssg/graduate';
import { getScienceContent } from '@/ssg/science';
import { getFieldsOfStudy } from '@/ssg/fieldofstudy';
import { numPages } from '@/ssg/numberOfPages';

const projectsPage = ({
    content,
    graduate,
    science,
    fos,
    whichPage,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <FlipBook science={science} graduate={graduate} pages={content} foStudy={fos} whichPage={whichPage}></FlipBook>
    );
};
export const getStaticProps = (contex: any) => {
    return {
        props: {
            content: getFlipBook(),
            graduate: Graduate(),
            science: getScienceContent(),
            fos: getFieldsOfStudy(),
            whichPage: parseInt(contex.params.number),
        },
    };
};
export const getStaticPaths = () => {
    return {
        paths: new Array(numPages()).fill(null).map((_, index) => ({ params: { number: `${index}` } })),
        fallback: false,
    };
};
export default projectsPage;
