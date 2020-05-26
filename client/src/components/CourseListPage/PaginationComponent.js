import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = (props) => {
  const active = props.page;
  const { length } = props;
  const last = Math.ceil(props.length / 50);

  if (active < 8) {
    return (
      <>
        <Pagination size="sm">
          <Pagination.First disabled={active === 1} onClick={() => props.changePage(1)} />
          <Pagination.Prev disabled={active === 1} onClick={() => props.changePage(active - 1)} />

          <Pagination.Item active={active === 1} onClick={() => props.changePage(1)}>
            {1}
          </Pagination.Item>
          <Pagination.Item
            disabled={1 * 50 > length}
            active={active === 2}
            onClick={() => props.changePage(2)}
          >
            {2}
          </Pagination.Item>
          <Pagination.Item
            disabled={2 * 50 > length}
            active={active === 3}
            onClick={() => props.changePage(3)}
          >
            {3}
          </Pagination.Item>
          <Pagination.Item
            disabled={3 * 50 > length}
            active={active === 4}
            onClick={() => props.changePage(4)}
          >
            {4}
          </Pagination.Item>
          <Pagination.Item
            disabled={4 * 50 > length}
            active={active === 5}
            onClick={() => props.changePage(5)}
          >
            {5}
          </Pagination.Item>
          <Pagination.Item
            disabled={5 * 50 > length}
            active={active === 6}
            onClick={() => props.changePage(6)}
          >
            {6}
          </Pagination.Item>
          <Pagination.Item
            disabled={6 * 50 > length}
            active={active === 7}
            onClick={() => props.changePage(7)}
          >
            {7}
          </Pagination.Item>

          <Pagination.Next
            disabled={active === last || active * 50 > length}
            onClick={() => props.changePage(active + 1)}
          />
          <Pagination.Last
            disabled={active === last || active * 50 > length}
            onClick={() => props.changePage(last)}
          />
        </Pagination>
      </>
    );
  } if (active < last - 6) {
    return (
      <>
        <Pagination size="sm">
          <Pagination.First disabled={active === 1} onClick={() => props.changePage(1)} />
          <Pagination.Prev disabled={active === 1} onClick={() => props.changePage(active - 1)} />

          <Pagination.Item onClick={() => props.changePage(active - 3)}>
            {active - 3}
          </Pagination.Item>
          <Pagination.Item onClick={() => props.changePage(active - 2)}>
            {active - 2}
          </Pagination.Item>
          <Pagination.Item onClick={() => props.changePage(active - 1)}>
            {active - 1}
          </Pagination.Item>

          <Pagination.Item active onClick={() => props.changePage(active)}>
            {active}
          </Pagination.Item>

          <Pagination.Item
            disabled={active * 50 > length}
            onClick={() => props.changePage(active + 1)}
          >
            {active + 1}
          </Pagination.Item>
          <Pagination.Item
            disabled={(active + 1) * 50 > length}
            onClick={() => props.changePage(active + 2)}
          >
            {active + 2}
          </Pagination.Item>
          <Pagination.Item
            disabled={(active + 2) * 50 > length}
            onClick={() => props.changePage(active + 3)}
          >
            {active + 3}
          </Pagination.Item>

          <Pagination.Next
            disabled={active === last || active * 50 > length}
            onClick={() => props.changePage(active + 1)}
          />
          <Pagination.Last
            disabled={active === last || active * 50 > length}
            onClick={() => props.changePage(last)}
          />
        </Pagination>
      </>
    );
  }
  return (
    <>
      <Pagination size="sm">
        <Pagination.First disabled={active === 1} onClick={() => props.changePage(1)} />
        <Pagination.Prev disabled={active === 1} onClick={() => props.changePage(active - 1)} />

        <Pagination.Item active={active === last - 6} onClick={() => props.changePage(last - 6)}>
          {last - 6}
        </Pagination.Item>
        <Pagination.Item
          disabled={(last - 6) * 50 > length}
          active={active === last - 5}
          onClick={() => props.changePage(last - 5)}
        >
          {last - 5}
        </Pagination.Item>
        <Pagination.Item
          disabled={(last - 5) * 50 > length}
          active={active === last - 4}
          onClick={() => props.changePage(last - 4)}
        >
          {last - 4}
        </Pagination.Item>
        <Pagination.Item
          disabled={(last - 4) * 50 > length}
          active={active === last - 3}
          onClick={() => props.changePage(last - 3)}
        >
          {last - 3}
        </Pagination.Item>
        <Pagination.Item
          disabled={(last - 3) * 50 > length}
          active={active === last - 2}
          onClick={() => props.changePage(last - 2)}
        >
          {last - 2}
        </Pagination.Item>
        <Pagination.Item
          disabled={(last - 2) * 50 > length}
          active={active === last - 1}
          onClick={() => props.changePage(last - 1)}
        >
          {last - 1}
        </Pagination.Item>
        <Pagination.Item
          disabled={(last - 1) * 50 > length}
          active={active === last}
          onClick={() => props.changePage(last)}
        >
          {last}
        </Pagination.Item>

        <Pagination.Next
          disabled={active === last || active * 50 > length}
          onClick={() => props.changePage(active + 1)}
        />
        <Pagination.Last
          disabled={active === last || active * 50 > length}
          onClick={() => props.changePage(last)}
        />
      </Pagination>
    </>
  );
};

export default PaginationComponent;
