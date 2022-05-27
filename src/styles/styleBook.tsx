import React from 'react';
import { Img } from '@/src/components/atoms/img';
import styled from '@emotion/styled';

export const LogoPB: React.FC<{ src: string }> = ({ src }) => <Img src={src} />;

export const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: url('images/background.webp');
    background-size: cover;
    background-position: center;
`;

export const Btn = styled.button`
    color: white;
    background-color: rgb(20 83 45);
    height: 30px;
    width: 30px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-around;
    :hover {
        opacity: 0.5;
    }
`;
export const Wrapper = styled.div`
    overflow: hidden;
    max-height: 100vh;
    margin: auto;
    #flipbook-container {
        width: 100%;
        height: 100%;
        margin: auto;
        display: flex;
        background-size: cover;
        box-shadow: 0px 5px 15px 15px rgba(0, 0, 0, 0.1);
    }

    .page {
        background-color: white;
        overflow: auto;
        @media (max-width: 640px) {
            padding-left: 0;
            padding-right: 0;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            margin-top: 0;
        }
        &.--left {
            // for left page (property will be added automatically)
            border-right: 2px solid rgba(0, 0, 0, 0.1);
            box-shadow: inset 5px 0px 0px 1px rgba(0, 0, 0, 0.1);
            left: 0;
        }

        &.--right {
            // for right page (property will be added automatically)
            border-left: 0;
            box-shadow: inset 5px 0px 0px 1px rgba(0, 0, 0, 0.1);
            right: 0;

            .page-footer {
                text-align: right;
            }
        }

        &.hard {
            // for hard page
            background-color: #012404;
            border: solid 1px #012404;
        }

        &.page-cover {
            background-color: rgb(20 83 45);
            padding: 0;
            color: white;
            width: 100%;
            h1 {
                width: 50%;
                height: 50%;
                margin-left: auto;
                margin-right: auto;
                margin-top: 5rem;
            }

            &.page-cover-top {
                box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.3), -2px 0 5px 2px rgba(0, 0, 0, 0.1);
            }

            &.page-cover-bottom {
                box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.3), 10px 0 8px 0px rgba(0, 0, 0, 0.1);
            }
        }
    }
`;
