import styled from "styled-components";
const HorizontalList = ({ dataSource, renderItem, title }) => {
    return <div style={{ maxWidth: "100%", paddingInline: 20 }}>
       {title && <h1> {title}</h1>}
        <ListContainer>
            <ScrollableList>
                {dataSource.map(renderItem)}
            </ScrollableList>
        </ListContainer>
    </div>
}

export default HorizontalList;


const ListContainer = styled.div`
position: relative;

&::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 10%;
    background: linear-gradient(to right, transparent, black);
    pointer-events: none;
}

&::before {
    left: 0;
    transform: scaleX(-1);
}

&::after {
    right: 0;
}
`;

const ScrollableList = styled.div`
display: flex;
overflow-x: auto;
overflow-y: hidden;
white-space: nowrap;

/* Hide scrollbar for Chrome, Safari and Opera */
&::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
-ms-overflow-style: none;  /* IE and Edge */
scrollbar-width: none;  /* Firefox */
`;
