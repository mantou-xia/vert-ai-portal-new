import React, { useEffect, useRef } from 'react';
import { Circle } from '@antv/g';
import { Graph, CubicHorizontal, ExtensionCategory, register, subStyleProps } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import {
  WeiboCircleOutlined,
  TaobaoCircleOutlined,
  WechatOutlined,
  AlipayCircleOutlined,
  DingtalkOutlined,
  QqOutlined,
  CodepenCircleOutlined,
  FacebookOutlined,
  AlipayOutlined,
} from '@ant-design/icons';

type ReactNodeProps = {
  // G6 会传入包含 id、data、style 等信息的数据对象
  // 这里用 any 简化类型约束，方便后续扩展
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

const iconMap: Record<string, React.ReactNode> = {
  weibo: <WeiboCircleOutlined />,
  taobao: <TaobaoCircleOutlined />,
  wechat: <WechatOutlined />,
  alipayCircle: <AlipayCircleOutlined />,
  dingtalk: <DingtalkOutlined />,
  qq: <QqOutlined />,
  codepen: <CodepenCircleOutlined />,
  facebook: <FacebookOutlined />,
  alipay: <AlipayOutlined />,
};

const CircleNode: React.FC<ReactNodeProps> = ({ data }) => {
  const label = data.data?.label ?? data.id;
  const iconKey = data.data?.icon as string | undefined;
  const iconEl = iconKey ? iconMap[iconKey] : null;
  const isCenter = data.id === 'C';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '999px',
        background: isCenter
          ? 'radial-gradient(circle at 30% 0, #bbf7d0, #4ade80 55%, #166534 100%)'
          : '#020617',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f9fafb',
        fontSize: isCenter ? 16 : 22,
        fontWeight: 600,
        boxShadow: isCenter
          ? '0 0 32px rgba(190, 242, 100, 0.95)'
          : '0 0 18px rgba(34, 197, 94, 0.8)',
      }}
    >
      {isCenter ? label : iconEl}
    </div>
  );
};

let flyEdgeRegistered = false;
let reactNodeRegistered = false;

class FlyMarkerCubic extends CubicHorizontal {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getMarkerStyle(attributes: any) {
    return {
      r: 5,
      fill: '#c3d5f9',
      offsetPath: (this as any).shapeMap.key,
      ...subStyleProps(attributes, 'marker'),
    };
  }

  onCreate() {
    const marker = this.upsert('marker', Circle as any, this.getMarkerStyle(this.attributes), this);
    marker?.animate(
      [
        { offsetDistance: 0 },
        { offsetDistance: 1 },
      ],
      {
        duration: 3000,
        iterations: Infinity,
      },
    );
  }
}

if (!flyEdgeRegistered) {
  register(ExtensionCategory.EDGE, 'fly-marker-cubic', FlyMarkerCubic);
  flyEdgeRegistered = true;
}

if (!reactNodeRegistered) {
  register(ExtensionCategory.NODE, 'react-circle', ReactNode);
  reactNodeRegistered = true;
}

const ProductFlowG6: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const graphRef = useRef<Graph | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 800;
    const height = containerRef.current.clientHeight || 220;

    const graph = new Graph({
      container: containerRef.current,
      width,
      height,
      autoFit: 'center',
      node: {
        type: 'react-circle',
        style: {
          size: 56,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          component: (data: any) => <CircleNode data={data} />,
        },
      },
      edge: {
        type: 'fly-marker-cubic',
        style: {
          stroke: '#a2ff5c',
          lineWidth: 1,
          halo: true,
          haloStroke: '#a2ff5c',
          haloStrokeOpacity: 0.45,
          haloLineWidth: 1,
        },
      },
    });

    const midY = height / 2;
    const gapY = 60;
    const leftX = width * 0.22;
    const centerX = width * 0.5;
    const rightX = width * 0.78;
    const outerOffsetX = 120;

    graph.setData({
      nodes: [
        // 左侧主节点
        { id: 'L1', data: { icon: 'weibo' }, style: { x: leftX, y: midY - gapY } },
        { id: 'L2', data: { icon: 'taobao' }, style: { x: leftX, y: midY } },
        { id: 'L3', data: { icon: 'wechat' }, style: { x: leftX, y: midY + gapY } },
        // 中心节点
        { id: 'C', data: { label: 'VERT' }, style: { x: centerX, y: midY } },
        // 右侧主节点
        { id: 'R1', data: { icon: 'alipayCircle' }, style: { x: rightX, y: midY - gapY } },
        { id: 'R2', data: { icon: 'dingtalk' }, style: { x: rightX, y: midY } },
        { id: 'R3', data: { icon: 'qq' }, style: { x: rightX, y: midY + gapY } },
        // 左侧外圈 3 个节点（上 / 中 / 下）
        {
          id: 'LT1',
          data: { icon: 'codepen' },
          style: { x: leftX - outerOffsetX, y: midY - gapY },
        },
        {
          id: 'LC',
          data: { icon: 'facebook' },
          style: { x: leftX - outerOffsetX, y: midY },
        },
        {
          id: 'LB1',
          data: { icon: 'alipay' },
          style: { x: leftX - outerOffsetX, y: midY + gapY },
        },
        // 右侧外圈 3 个节点（上 / 中 / 下）
        {
          id: 'RT1',
          data: { icon: 'facebook' },
          style: { x: rightX + outerOffsetX, y: midY - gapY },
        },
        {
          id: 'RC',
          data: { icon: 'codepen' },
          style: { x: rightX + outerOffsetX, y: midY },
        },
        {
          id: 'RB1',
          data: { icon: 'alipay' },
          style: { x: rightX + outerOffsetX, y: midY + gapY },
        },
      ],
      edges: [
        // 左右主节点与中心的连接
        { source: 'L1', target: 'C' },
        { source: 'L2', target: 'C' },
        { source: 'L3', target: 'C' },
        { source: 'R1', target: 'C' },
        { source: 'R2', target: 'C' },
        { source: 'R3', target: 'C' },
        // 左侧外圈到主节点
        { source: 'LT1', target: 'L1' },
        { source: 'LC', target: 'L2' },
        { source: 'LB1', target: 'L3' },
        // 右侧主节点到外圈
        { source: 'RT1', target: 'R1' },
        { source: 'RC', target: 'R2' },
        { source: 'RB1', target: 'R3' },
      ],
    });

    graph.render();
    graphRef.current = graph;

    const handleResize = () => {
      if (!containerRef.current || !graphRef.current) return;
      const w = containerRef.current.clientWidth || width;
      const h = containerRef.current.clientHeight || height;
      (graphRef.current as any).setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      graph.destroy();
    };
  }, []);

  return <div ref={containerRef} className="product-main-img__flow-g6" />;
};

export default ProductFlowG6;

