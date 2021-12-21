import styled from "@emotion/styled";

export const LogoPB: React.FC<{src: string}> = ({src}) => <img
    className = "object-contain" 
    src={src} />

export const Btn = styled.button`
    color: white;
    background-color: #012404;
    height: 2rem;
    width: 5rem;
    margin-top: 20px;
    margin-bottom: 40px;
    border-radius: 5rem;
    border: 2px solid;
    border-color: black;
    :hover {
        opacity: 0.5;
    }
`;

export const Wrapper = styled.div`

    .stop-scrolling {
        height: 100%;
        overflow: hidden;
    }
    #page-counter {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 4px;
    }
    .conatiner {
        width: 100%;
        height: 100%;
    }
    #flipbook-container {
        display: none;
        background-size: cover;
        margin-right: auto;
        margin-left: auto;
        margin-bottom: 25px;
}

    .page {
        background-color: white;
        border: solid 1px #012404;
        overflow: auto;
        .page-content {
            width: 95%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: stretch;
            padding-left: 1rem;
            .page-header {
                font-size: 100%;
                text-transform: uppercase;
                text-align: center;
            }

            .page-image {
                height: 100%;
                background-size: contain;
                background-position: center center;
                background-repeat: no-repeat;
            }

            .page-footer {
                height: 30px;
                border-top: solid 1px #012404;
                font-size: 80%;
                color: #012404;
                border-bottom: 20px;
            }
        }
        &.--left {
            // for left page (property will be added automatically)
            border-right: 0;
            box-shadow: inset -7px 0 30px -7px rgba(0, 0, 0, 0.4);
        }

        &.--right {
            // for right page (property will be added automatically)
            border-left: 0;
            box-shadow: inset 7px 0 30px -7px rgba(0, 0, 0, 0.4);

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
            background-color: #012404;
            color: white;
            border: solid 1px #012404;

            h1 {
                width: 50%;
                height: 50%;
                margin-left: auto;
                margin-right: auto;
                margin-top: 5rem;
                
            }

            &.page-cover-top {
                box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), -2px 0 5px 2px rgba(0, 0, 0, 0.4);
            }

            &.page-cover-bottom {
                box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), 10px 0 8px 0px rgba(0, 0, 0, 0.4);
            }
        }
    }
`;