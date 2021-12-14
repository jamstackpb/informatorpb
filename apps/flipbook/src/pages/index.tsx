import { getFlipBook } from '@/ssg/flipbookcontent';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { FlipBook } from './flipbook';

const projectsPage = ({ content }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <FlipBook pages={content}></FlipBook>
    );
};
export const getStaticProps = () => {
    return {
        props: {
            content: getFlipBook(),
        },
    };
};

export default projectsPage;