import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

export default class PaginationComponent extends Component {
    render() {
        const props = this.props;
        let active = props.page;
        let length = props.length;

        return(<>
            <Pagination size="sm" style={{paddingTop: "5px"}}>
                <Pagination.Prev disabled={active === 1} onClick={() => props.changePage(active - 1)}/>
                <Pagination.Item active={active === 1} onClick={() => props.changePage(1)}>{1}</Pagination.Item>
                <Pagination.Item disabled={length <= 52} active={active === 2} onClick={() => props.changePage(2)}>{2}</Pagination.Item>
                <Pagination.Ellipsis disabled/>

                <Pagination.Item disabled={length <= 468} active={active === 10} onClick={() => props.changePage(10)}>{10}</Pagination.Item>
                <Pagination.Item disabled={length <= 520} active={active === 11} onClick={() => props.changePage(11)}>{11}</Pagination.Item>
                <Pagination.Item disabled={length <= 572} active={active === 12} onClick={() => props.changePage(12)}>{12}</Pagination.Item>

                <Pagination.Ellipsis disabled />
                <Pagination.Item disabled={length <= 936} active={active === 19} onClick={() => props.changePage(19)}>{19}</Pagination.Item>
                <Pagination.Item disabled={length <= 988} active={active === 20} onClick={() => props.changePage(20)}>{20}</Pagination.Item>
                <Pagination.Next disabled={active === 20 || (active) * 52 > length} onClick={() => props.changePage(active + 1)}/>
            </Pagination>
        </>);
    }
}