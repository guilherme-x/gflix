import { Carousel as CarouselD } from "antd";
import styled from 'styled-components';

const Carousel = ({ children, ...props }) => {
    return (
        <CarouselD {...props} effect="scrollx" dotPosition="right" style={{ width: '100%' }} autoplaySpeed={5000}>
            {children}
        </CarouselD>
    );
};
export default Carousel;

const CarouselItem = styled.div`
    position: relative;
    height: 500px;
    padding: 1px;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(${props => props.imageUrl}) center/cover no-repeat;
        animation: zoom 10s infinite;
        z-index: -1;
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, rgba(0, 0, 0, 1.5), transparent),
                    linear-gradient(to left, rgba(233,121,128,0.8), transparent, transparent, transparent);
        z-index: 1;
    }
`;
export { CarouselItem };