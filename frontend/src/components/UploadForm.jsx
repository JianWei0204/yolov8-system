import React, { useState } from "react";
import { Upload, Button, message, Form, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

export default function UploadForm({ setResult }) {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const beforeUpload = file => {
    setFileList([file]);
    return false; // Prevent auto upload
  };

  const handleRemove = () => {
    setFileList([]);
  };

  const handleSubmit = async () => {
    if (fileList.length === 0) {
      message.warning("请先选择图片文件");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", fileList[0]);
    try {
      const res = await axios.post("http://localhost:8000/api/detect/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
      message.success("检测完成！");
      setFileList([]);
    } catch {
      message.error("检测失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form layout="inline" style={{ justifyContent: "center" }}>
        <Form.Item>
          <Upload
            beforeUpload={beforeUpload}
            fileList={fileList}
            onRemove={handleRemove}
            accept="image/*"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>选择图片</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={fileList.length === 0}
          >
            上传并检测
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}