import styled from '@emotion/styled';
export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
`;
export const WrapperInput = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 20%;
    .hidden {
        display: none;
    }
`;
export const WrapperText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 40%;
    color: white;
`;
export const Input = styled.input`
    border: none;
    border-bottom: 2px solid #012404;
`;
export const Button = styled.button`
    color: white;
    background-color: #012404;
    height: 3rem;
    margin-top: 20px;
    margin-bottom: 40px;
    border-radius: 5rem;
    border: 2px solid;
    border-color: black;
    :hover {
        opacity: 0.5;
    }
`;
