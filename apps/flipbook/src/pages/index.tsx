import { getFlipBook } from '@/ssg/flipbookcontent';
import { LParser } from '@/ssg/parser';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { FlipBook } from '../components/organism/flipbook';
import { HParser } from '../components/organism/parser'
import styled from '@emotion/styled';
import { Header }  from '../components/atoms/header'
import { Footer } from '../components/atoms/footer'
import { Socialmedia } from '../components/atoms/socialmedia';
import { Graduate } from '@/ssg/graduate';
import { GraduateSlider } from '../components/organism/graduatesslider';
const Napis = styled.div`
    width:50%;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    background-color: #012404;
    color: white;
    font-family: sans-serif;
    font-size: 24px;
    text-align:center;
    padding: 10px;
`
const projectsPage = ({ content, test, graduate }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div>
            <Header></Header>
            <Napis>Informator</Napis>
            <FlipBook pages={content}></FlipBook>
            <Napis>Przelicz swoje punkty !</Napis>
            <HParser test={test} />
            <Napis>Nasi absolwenci!</Napis>
            <GraduateSlider graduate={graduate}></GraduateSlider>
            <Napis>Sprawdź nas!</Napis>
            <Socialmedia></Socialmedia>
            <Footer></Footer>
        </div>
        
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