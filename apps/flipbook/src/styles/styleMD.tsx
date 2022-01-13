import styled from '@emotion/styled';

const MDArticle = styled.article`
    width: 100%;
    height: 100%;
`;

export const MarkdownContentPages: React.FC = ({ children }) => {
    return <MDArticle>{children}</MDArticle>;
};

export default MarkdownContentPages;
