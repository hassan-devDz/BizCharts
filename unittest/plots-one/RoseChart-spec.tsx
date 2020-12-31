import React from 'react';
import RoseChart from '../../src/plots/RoseChart';
import { render, cleanup } from '@testing-library/react';


const MOCK_DATA = [{
  "Date": "2010-01",
  "scales": 1998
},
{
  "Date": "2010-02",
  "scales": 1250
},
{
  "Date": "2010-03",
  "scales": 1720
}];

const basicCfg = {
  padding: [90, 90, 90, 90],
  data: MOCK_DATA,
  xField: "Date",
  yField: "scales",
  seriesField: "Date",
  autoFit: true,
  width: 600,
  height: 500,
};

describe('Plots-RoseChart', () => {
  test('新版本玫瑰图xField*yField*DaseriesFieldte', () => {
    let chart = null;
    render(<RoseChart
      {...basicCfg}
      title="新版本玫瑰图xField*yField*DaseriesFieldte"
      onGetG2Instance={
        (c) => chart = c
      }
    />)

    expect(chart.options.xField).toBe('Date');
    expect(chart.options.yField).toBe('scales');
    expect(chart.options.seriesField).toBe('Date');
    // // expect(chart.options.autoFit).toBe(true); // autoFit被转成了forceFit,所以不测试autoFit
    // cleanup();
  });

  test('老版本玫瑰图categoryField*radiusField*Date', () => {
    let chart = null;
    // @ts-ignore
    render(<RoseChart
      padding={[90, 90, 90, 90]}
      data={MOCK_DATA}
      categoryField="Date"
      radiusField="scales"
      colorField="Date"
      autoFit
      width={600}
      height={500}
      title="老版本categoryField*radiusField*Date"
      onGetG2Instance={
        (c) => chart = c
      }
    />)
    expect(chart.options.xField).toBe('Date');
    expect(chart.options.yField).toBe('scales');
    expect(chart.options.seriesField).toBe('Date');

    // // expect(chart.options.autoFit).toBe(true); // autoFit被转成了forceFit,所以不测试autoFit
    // cleanup();
  });

  test('基础玫瑰图', () => {
    render(<RoseChart
      {...basicCfg}
      title="基础玫瑰图"
      pixelRatio={3}
      renderer="svg"
      meta={{
        date: {
          formatter: val => `${val}%`
        }
      }}
      radius={0.5}
      innerRadius={0.1}
      // color={['red', 'green', 'yellow']}
      color={({ Date }) => {
        if (Date === '2010-02') return 'red';
        return 'blue';
      }}
      sectorStyle={{
        stroke: 'black',
        lineDash: [5, 5],
      }}
    />);
    // cleanup();
  });


  test('legend-玫瑰图', () => {
    render(<RoseChart
      title={{
        visible: true,
        text: "legend-玫瑰图",
      }}
      {...basicCfg}
      legend={{
        position: "bottom",
        formatter: val => `${val}%`, //  text 的优先度大于formatter
        offsetX: 40,
        offsetY: 2,
        title: {
          text: '2',
          style: {
            fill: "red",
          },
        },
        marker: {
          symbol: "circle",
        },
        text: {
          style: {
            fill: "pink",
            stroke: "pink",
          },
          formatter: (val) => `${val}$`,
        },
      }}
    />);
  });


  test('tooltip-玫瑰图', () => {
    render(<RoseChart
      title="tooltip-玫瑰图"
      {...basicCfg}
      tooltip={{
        visible: true,
        offset: 10,
        shared: true,
        showCrosshairs: true,
        crosshairs: { type: 'y' },
        fields: ['scales'],
      }}
    />);
  });

  test('label-玫瑰图', () => {
    render(<RoseChart
      title="label-玫瑰图"
      {...basicCfg}
      label={{
        visible: true,
        autoRotate: true,
        formatter: ({ Date }) => `${Date}val`,
        offsetX: 6,
        offsetY: 6,
        style: {
          fill: 'red',
        }
      }}
    />);
  });


});