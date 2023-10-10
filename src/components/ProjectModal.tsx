import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useDispatch } from "react-redux";
import * as actions from "../store/index";

export default function ProjectModal({
  visible = false,
  closeModal = () => {},
}) {
  const dispatch = useDispatch();
  const handleOk = () => {
    form.submit();
    const values = form.getFieldsValue();
    console.info("values", values);
    dispatch(actions.addProject(values));

    closeModal();
  };

  const handleCancel = () => {};

  const [form] = Form.useForm();

  return (
    <Modal
      title="Basic Modal"
      open={visible}
      onOk={handleOk}
      onCancel={() => closeModal()}
    >
      <Form
        form={form}
        initialValues={{
          name: "",
          owner: "",
        }}
      >
        <Form.Item name="name" label="project">
          <Input />
        </Form.Item>
        <Form.Item name="owner" label="owner">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
