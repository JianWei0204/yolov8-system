import React from "react";
import { Card, Image, Typography, List, Tag } from "antd";

const { Title } = Typography;

export default function DetectionResult({ result }) {
  // 兼容旧结构
  const { result_image, boxes } = result;

  return (
    <div>
      <Card bordered={false} style={{ textAlign: "center" }}>
        <Image
          src={result_image}
          alt="检测结果"
          style={{ maxWidth: "100%", maxHeight: 400, marginBottom: 16 }}
        />
        <Title level={4}>识别框列表</Title>
        <List
          size="small"
          bordered
          dataSource={boxes}
          locale={{ emptyText: "未检测到目标" }}
          renderItem={box => (
            <List.Item>
              <Tag color="blue">{box.label}</Tag>
              <span>
                置信度: {(box.confidence * 100).toFixed(1)}% | 坐标: [{box.x1},{box.y1},{box.x2},{box.y2}]
              </span>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}