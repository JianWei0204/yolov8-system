import React, { useState } from "react";
import { Layout, Typography, Card, Divider } from "antd";
import UploadForm from "./components/UploadForm";
import DetectionResult from "./components/DetectionResult";
import HistoryList from "./components/HistoryList";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const [result, setResult] = useState(null);

  return (
    <Layout style={{ minHeight: "100vh", background: "#f4f6fa" }}>
      <Header style={{ background: "#001529" }}>
        <Title style={{ color: "#fff", margin: 0 }} level={2}>YOLOv8 目标检测系统</Title>
      </Header>
      <Content style={{ padding: "40px 16px", maxWidth: 800, margin: "0 auto" }}>
        <Card style={{ marginBottom: 24 }}>
          <UploadForm setResult={setResult} />
        </Card>
        {result && (
          <Card title="检测结果" style={{ marginBottom: 24 }}>
            <DetectionResult result={result} />
          </Card>
        )}
        <Card title="检测历史">
          <HistoryList setResult={setResult} />
        </Card>
      </Content>
      <Footer style={{ textAlign: "center", color: "#888" }}>
        YOLOv8 System ©2025 Created by JianWei0204
      </Footer>
    </Layout>
  );
}

export default App;