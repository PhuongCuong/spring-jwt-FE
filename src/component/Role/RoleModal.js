import { Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

const RoleModal = (props) => {

    const [url, seturl] = useState("");
    const [method, setmethod] = useState("");
    const [descriptions, setdescriptions] = useState("");

    const handleSave = () => {
        props.createNewRole({
            url: url,
            method: method,
            descriptions: descriptions
        })
        props.handleShowModal()

    }

    return (
        <>
            <Modal
                title="Add new Role"
                open={props.showmodal}
                onOk={() => handleSave()}
                onCancel={props.handleShowModal}
                okText="Save"
                cancelText="Cancel"
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="url"
                    >
                        <Input value={url} onChange={(e) => seturl(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="method"
                    >
                        <Input value={method} onChange={(e) => setmethod(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="descriptions"
                    >
                        <TextArea rows={4} value={descriptions} onChange={(e) => setdescriptions(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal >
        </>
    );
};

export default RoleModal;