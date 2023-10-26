import styled from 'styled-components';

const OuterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 95vh;
    font-size: 3.5rem;
    
`

export default function Main() {

    return (
        <OuterWrapper>
            <h1>URL Shortener</h1>
        </OuterWrapper>
    )
}