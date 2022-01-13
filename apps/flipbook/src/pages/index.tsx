import { getFlipBook } from '@/ssg/flipbookcontent';
import { LParser } from '@/ssg/parser';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { FlipBook } from '../components/organism/flipbook';
import { HParser } from '../components/organism/parser';
import styled from '@emotion/styled';
import { Header } from '../components/atoms/header';
import { Footer } from '../components/atoms/footer';
import { Socialmedia } from '../components/atoms/socialmedia';
import { Graduate } from '@/ssg/graduate';
import { GraduateSlider } from '../components/organism/graduatesslider';
const Napis = styled.div`
    width: 50%;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    background-color: #012404;
    color: white;
    font-family: sans-serif;
    font-size: 24px;
    text-align: center;
    padding: 10px;
`;

const FullScreen = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
`;

const projectsPage = ({ content, test, graduate }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <FullScreen>
            <FlipBook pages={content}></FlipBook>
        </FullScreen>
    );
};
export const getStaticProps = () => {
    return {
        props: {
            content: getFlipBook(),
            test: LParser(),
            graduate: Graduate(),
        },
    };
};

export default projectsPage;
