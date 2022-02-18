import { Img } from '@/src/components/atoms/img';
import styled from '@emotion/styled';

export const LogoPB: React.FC<{ src: string }> = ({ src }) => <Img src={src} />;

export const Btn = styled.button`
    color: white;
    background-color: rgb(20 83 45);
    height: 2rem;
    width: 2rem;
    margin-top: 20px;
    margin-bottom: 40px;
    border-radius: 1rem;
    justify-content: space-around;
    :hover {
        opacity: 0.5;
    }
`;

export const WrapperMobile = styled.div`
    @media (min-width: 650px) {
        display: none;
    }
`;
export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    @media (max-width: 650px) {
        display: none;
    }
    .stop-scrolling {
        @media (max-width: 1280px) {
            overflow: hidden;
        }
    }
    #page-counter {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 4px;
    }
    #flipbook-container {
        display: flex;
        background-size: cover;
        margin: auto;
        height: 100%;
        width: 100%;
        box-shadow: 0px 5px 15px 15px rgba(0, 0, 0, 0.1);
    }

    .page {
        background-color: white;
        overflow: hidden;
        padding-left: 3ch;
        padding-right: 3ch;
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
            * {
                justify-content: start;
            }
        }

        &.--right {
            // for right page (property will be added automatically)
            border-left: 0;
            box-shadow: inset 5px 0px 0px 1px rgba(0, 0, 0, 0.1);
            * {
                justify-content: end;
            }
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
            color: white;
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
