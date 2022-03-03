import { getFlipBook } from '@/ssg/flipbookcontent';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { FlipBook } from '../components/organism/flipbook';
import { Graduate } from '@/ssg/graduate';
import { getScienceContent } from '@/ssg/science';
import { getFieldsOfStudy } from '@/ssg/fieldofstudy';

const projectsPage = ({ content, graduate, science, fos }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <FlipBook science={science} graduate={graduate} pages={content} foStudy={fos}></FlipBook>;
};
export const getStaticProps = () => {
    return {
        props: {
            content: getFlipBook(),
            graduate: Graduate(),
            science: getScienceContent(),
            fos: getFieldsOfStudy(),
        },
    };
};

export default projectsPage;
