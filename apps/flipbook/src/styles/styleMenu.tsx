import styled from '@emotion/styled';

export const StyleMenu = styled.div`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    body {
        font-family: sans-serif;
        margin: 0;
        padding: 10px;

    }

    .dropdown {
        margin: 0;
        padding: 0;
        list-style: none;
        width: 100%;
        background-color: #012404;
    }

    .dropdown li {
        position: relative;
    }

    .dropdown li a {
        color: #ffffff;
        text-align: center;
        text-decoration: none;
        display: block;
        padding: 10px;
    }

    .dropdown li ul {
        position: absolute;
        top: 100%;
        margin: 0;
        padding: 0;
        list-style: none;
        display: none;
        line-height: normal;
        background-color: #333;
    }

    .dropdown li ul li a {
        text-align: left;
        color: #cccccc;
        font-size: 14px;
        padding: 10px;
        display: block;
        white-space: nowrap;
    }

    .dropdown li ul li a:hover {
        background-color: #012404;
        color: #ffffff;
    }

    .dropdown li ul li ul {
        left: 100%;
        top: 0;
    }

    ul li:hover > a {
        background-color: #012404;
        color: #ffffff !important;
    }

    ul li:hover > ul {
        display: block;
    }
`;