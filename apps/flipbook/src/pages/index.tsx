import { getFlipBook } from '@/ssg/flipbookcontent';
import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { FlipBook } from '../components/organism/flipbook';
import { Graduate } from '@/ssg/graduate';
import { getScienceContent } from '@/ssg/science';
import { getFieldsOfStudy } from '@/ssg/fieldofstudy';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const projectsPage = ({ content, graduate, science, fos }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
            <FlipBook science={science} graduate={graduate} pages={content} foStudy={fos} />;
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
        },
    };
};

export default projectsPage;
