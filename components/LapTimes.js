import React, { Component } from 'react';
import TimeElapsed from './TimeElapsed';

export default class LapTimes extends React.Component {
  render() {
    const rows = this.props.lapTimes.map((lapTime, index) => (
      <tr key={++index}>
        <td>{index}</td>
        <td>
          <TimeElapsed timeElapsed={lapTime} />
        </td>
      </tr>
    ));
    return (
      <table id="lap-times">
        <thead>
          <th>Lap</th>
          <th>Time</th>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
