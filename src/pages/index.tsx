import { getFlipBook } from '@/ssg/flipbookcontent';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { FlipBook } from '../components/organism/flipbook';
import { Graduate, getScienceContent, getFieldsOfStudy } from '@/ssg/';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { TableOfContents } from '../components/atoms/TableOfContents';

const projectsPage = ({
    content,
    graduate,
    science,
    fos,
}: // tableOfContents,
InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    useEffect(() => {
        router.push(`/?page=0`);
    }, []);
    useEffect(() => {
        router.query.page && router.push(`/?page=${router.query.page}`, undefined, { shallow: true });
    }, [router.query.page]);
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
