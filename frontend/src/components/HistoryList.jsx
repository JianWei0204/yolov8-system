import React, { useEffect, useState } from "react";
import { List, Button, Empty, Skeleton, Typography } from "antd";
import axios from "axios";

const { Text } = Typography;

export default function HistoryList({ setResult }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/history/")
      .then(res => setHistory(res.data.history))
      .finally(() => setLoading(false));
  }, []);

  return (
    <List
      loading={loading}
      locale={{ emptyText: <Empty description="暂无检测历史" /> }}
      dataSource={history}
      renderItem={item => (
        <List.Item
          actions={[
            <Button
              key="view"
              size="small"
              type="link"
              onClick={() => setResult({ result_image: item.result_image, boxes: item.boxes })}
            >
              查看检测结果
            </Button>
          ]}
        >
          <Skeleton loading={loading} active title={false}>
            <Text strong>{item.filename}</Text>
            <Text type="secondary" style={{ marginLeft: 8 }}>
              ({item.created_at})
            </Text>
          </Skeleton>
        </List.Item>
      )}
    />
  );
}