import React from 'react';
import { Button, Badge } from 'react-bootstrap';

import Reviews from './Reviews';
import { history } from '../../util';

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleClick(bool) {
    this.setState({ open: bool });
  }

  render() {
    if (isNaN(this.props.course.overallQuality)) this.props.course.overallQuality = '0.00';
    const rating = Number(this.props.course.overallQuality);
    let color = 'dark';
    if (rating < 1) {
      color = 'dark';
    } else if (rating < 3) {
      color = 'danger';
    } else if (rating < 4) {
      color = 'warning';
    } else {
      color = 'success';
    }

    const collapseExpandButton = (
      <>
        {this.state.open && (
          <Button variant="link" style={{ padding: '0' }} onClick={() => this.handleClick(false)}>
            <p style={{ margin: '0', marginTop: '-2px' }}>[-]</p>
          </Button>
        )}
        {!this.state.open && (
          <Button variant="link" style={{ padding: '0' }} onClick={() => this.handleClick(true)}>
            <p style={{ margin: '0', marginTop: '-2px' }}>[+]</p>
          </Button>
        )}
      </>
    );

    const reviews = this.state.open && (
      <tr>
        <td colSpan="100%">
          <div>
            <Reviews
              history={history}
              course={this.props.course}
              page={this.props.active}
              isMobile={this.props.isMobile}
            />
          </div>
        </td>
      </tr>
    );

    if (this.props.isMobile) {
      return (
        <>
          <tr className="hover" onClick={() => this.handleClick(!this.state.open)}>
            <td>
              <div style={{ paddingLeft: '1px' }}>
                {`${this.props.course.n} `}
                {collapseExpandButton}
              </div>
            </td>
            <td style={{ paddingLeft: '15px' }}>
              <Badge
                variant={color}
                style={{ fontSize: '15px', padding: '5px', fontWeight: '400' }}
              >
                {rating > 0 ? rating.toPrecision(3) : 'N/A'}
              </Badge>
              <br />
            </td>
          </tr>
          {reviews}
        </>
      );
    }

    return (
      <>
        <tr className="hover" onClick={() => this.handleClick(!this.state.open)}>
          <td>{this.props.course.num}</td>
          <td>
            <div className="row" style={{ paddingLeft: '17px' }}>
              <div style={{ paddingRight: '5px' }}>{this.props.course.n}</div>
              {collapseExpandButton}
            </div>
          </td>
          <td style={{ paddingLeft: '14px' }}>{this.props.course.a}</td>
          <td style={{ paddingLeft: '15px' }}>{this.props.course.w}</td>
          <td style={{ paddingLeft: '15px' }}>{this.props.course.c}</td>
          <td style={{ paddingLeft: '15px' }}>
            <Badge variant={color} style={{ fontSize: '15px', padding: '5px', fontWeight: '400' }}>
              {rating > 0 ? rating.toPrecision(3) : 'N/A'}
            </Badge>
          </td>
        </tr>
        {reviews}
      </>
    );
  }
}

export default Course;
