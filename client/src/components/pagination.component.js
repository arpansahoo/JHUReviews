import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

export default class PaginationComponent extends Component {
    render() {
        const props = this.props;
        let active = props.page;
        let length = props.length;
        
        var preLast = 49
        var last = 50

        return(<>
            <Pagination size="sm" style={{paddingTop: "5px"}}>
                <Pagination.Prev disabled={active === 1} onClick={() => props.changePage(active - 1)}/>
                <Pagination.Item active={active === 1} onClick={() => props.changePage(1)}>{1}</Pagination.Item>
                <Pagination.Item disabled={length <= 1*50} active={active === 2} onClick={() => props.changePage(2)}>{2}</Pagination.Item>
                <Pagination.Ellipsis disabled/>

                <Pagination.Item disabled={length <= 9*50} active={active === 10} onClick={() => props.changePage(10)}>{10}</Pagination.Item>
                <Pagination.Item disabled={length <= 10*50} active={active === 11} onClick={() => props.changePage(11)}>{11}</Pagination.Item>
                <Pagination.Item disabled={length <= 11*50} active={active === 12} onClick={() => props.changePage(12)}>{12}</Pagination.Item>

                <Pagination.Ellipsis disabled />
                <Pagination.Item disabled={length <= (preLast-1)*50} active={active === preLast} onClick={() => props.changePage(preLast)}>{preLast}</Pagination.Item>
                <Pagination.Item disabled={length <= (last-1)*50} active={active === last} onClick={() => props.changePage(last)}>{last}</Pagination.Item>
                <Pagination.Next disabled={active === last|| (active) * 50 > length} onClick={() => props.changePage(active + 1)}/>
            </Pagination>
        </>);
    }
}