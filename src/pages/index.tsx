import { getFlipBook } from '@/ssg/flipbookcontent';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { FlipBook } from '../components/organism/flipbook';
import { Graduate, getScienceContent, getFieldsOfStudy } from '@/ssg/';

import Head from 'next/head';

const projectsPage = ({
    content,
    graduate,
    science,
    fos,
}: // tableOfContents,
InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <Head>
                <title>InformatorPB</title>
            </Head>
            <FlipBook
                science={science}
                graduate={graduate}
                pages={content}
                foStudy={fos}
                // tableOfContents={tableOfContents}
            />
            ;
        </>
    );
};

export const getStaticProps = () => {
    return {
        props: {
            content: getFlipBook(),
            graduate: Graduate(),
            science: getScienceContent(),
            fos: getFieldsOfStudy(),
            // tableOfContents: getTableOfContents(),
        },
    };
};

export default projectsPage;
