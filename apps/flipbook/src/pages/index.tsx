import { getFlipBook } from '@/ssg/flipbookcontent';
import { LParser } from '@/ssg/parser';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { FlipBook } from '../components/organism/flipbook';
import styled from '@emotion/styled';
import { Graduate } from '@/ssg/graduate';
import { getScienceContent } from '@/ssg/science';

const projectsPage = ({ content, graduate, science }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <FlipBook science={science} graduate={graduate} pages={content}></FlipBook>
    );
};
export const getStaticProps = () => {
    return {
        props: {
            content: getFlipBook(),
            graduate: Graduate(),
            science: getScienceContent(),
        },
    };
};

export default projectsPage;
